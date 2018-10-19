import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, Input, OnDestroy,EventEmitter,Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs';
import * as _ from 'lodash';
import { FieldConfig } from '../../field.interface';


/** Data structure for holding time. */

export class Time {
  constructor(public hh:string, public mm:string) {
  }
}


/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'app-time',
  templateUrl: 'time-component.html',
  styleUrls: ['time-component.css'],
  providers: [{provide: MatFormFieldControl, useExisting: TimeComponent}],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class TimeComponent implements MatFormFieldControl<any>, OnDestroy {
  static nextId = 0;

  parts:FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  ngControl = null;
  errorState = false;
  controlType = 'app-time';
  id = `app-time-${TimeComponent.nextId++}`;
  describedBy = '';
  hourInvalid:boolean = false;
  minsInvalid:boolean = false;
  hour:string;
  mins:string;

  @Input() config:FieldConfig;
  private _time: string;
  @Input()
  get time():string{
    return this._time;
  }
  set time(value:string) {
    this._time =  value;
    let time = this._time.split(':');
    this.hour = time[0];
    this.mins = time[1];
  }

  get empty() {
    const {value: {hh, mm}} = this.parts;
    return !hh && !mm;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder():string {
    return this._placeholder;
  }

  set placeholder(value:string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _placeholder:string;

  @Input()
  get required():boolean {
    return this._required;
  }

  set required(value:boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _required = false;

  @Input()
  get disabled():boolean {
    return this._disabled;
  }

  set disabled(value:boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get value():Time | null {
    const {value: {hh, mm}} = this.parts;
    if (hh.length === 2 && mm.length === 2) {
      return new Time(hh, mm);
    }
    return null;
  }

  set value(tel:Time | null) {
    const {hh, mm} = tel || new Time('', '');
    this.parts.setValue({hh, mm});
    this.stateChanges.next();
  }

  //When user changes the time, it should be emitted
  @Output() timeEvent = new EventEmitter<any>();
  //When user doesnt enter 24-hour format, should be emitted
  @Output() invalidFormat = new EventEmitter<boolean>();

  private _timeInput: string;

  @Input()
  get timeInput():string{
    return this._timeInput;
  }
  set timeInput(value:string) {
    this._timeInput =  value;
    let time = this._timeInput.split(':');
    this.hour = time[0];
    this.mins = time[1];
  }

  constructor(fb:FormBuilder, private fm:FocusMonitor, private elRef:ElementRef) {

    this.parts = fb.group({
      hh: '',
      mm: ''
    });

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  //On key press
  validateKey(event) {
    //To allow only Numeric input
    let key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8];
    if (!_.includes(key_codes, event.keyCode)) {
      event.preventDefault();
    }
  }

  //on key up - get Hour
  validateHour(hour,event){
    //min-max  00-23
    if (!(hour>=0 && hour<24)) {
      this.hour = '';
      this.hourInvalid = true;
      this.emitFormatError(this.hourInvalid);
    }
    else{
      this.hourInvalid = false;
      this.emitFormatError(this.hourInvalid);
    }

    this.emitTime();
  }

  //on key up - get Mins
  validateMins(mins,event){

    //min-max  00-59
    if (!(mins>=0 && mins<60)) {
      this.mins = '';
      this.minsInvalid = true;
      this.emitFormatError(this.minsInvalid);
    }
    else{
      this.minsInvalid = false;
      this.emitFormatError(this.minsInvalid);
    }
    this.emitTime();
  }
  emitFormatError(invalidFlag){
    this.invalidFormat.emit(invalidFlag);
  }
  emitTime(){
    if(this.hour.length == 0) {
      this.hour = '00';
    }
    if(this.mins.length == 0) {
      this.mins = '00';
    }
      this.formatTime(this.hour, this.mins);
      this.timeEvent.emit([this.hour, this.mins]);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  setDescribedByIds(ids:string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event:MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }


  formatTime(hour,mins){
    if(hour.length == 1){
      this.hour = (hour<10?'0':'')+hour;
    }
    if(mins.length == 1) {
      this.mins = (mins < 10 ? '0' : '') + mins;
    }
  }
}
