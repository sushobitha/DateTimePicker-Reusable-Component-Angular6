import {MAT_DIALOG_DATA, MatDatepickerIntl} from '@angular/material';
import {DateNTimeData} from "./datentime.model";
import {Directionality} from '@angular/cdk/bidi';
import {
  Overlay,

} from '@angular/cdk/overlay';

import {DOCUMENT} from '@angular/common';
import {MatCalendar, matDatepickerAnimations, MatDatepickerInput} from '@angular/material';

import {
  Component,
  EventEmitter,
  Inject,
  NgZone,
  Optional,
  Output,
  ViewContainerRef, OnInit, AfterViewInit
} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {ChangeDetectorRef} from "@angular/core";
import { DateNTimeServiceProvider } from './datentime.service';

@Component({
  selector: 'datentime-expanded',
  templateUrl: 'datentime-expanded.html',
  styles: ['datetime-component.css']
})
// @ts-ignore
export class DateNTimeExpandedComponent extends MatCalendar<Date> implements OnInit,AfterViewInit {

  readonly id:string = "001";
  time:string = "16:00";
  showFormatErrorMsg:boolean = false;
  private _validSelected:any | null = null;
  /** Emits new selected date when selected date changes. */
  readonly _selectedChanged = new Subject<Date>();
  /** The currently selected date. */
  defaultDate = this._selected;
  startDate: Date;
  get _selected():any | null {
    return this._validSelected;
  }

  set _selected(value:any | null) {
    this._validSelected = value;
  }

  /**
   * Emits selected month in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected:EventEmitter<any> = new EventEmitter<any>();
// @ts-ignore

  constructor(private _dialog:MatDialog,
              private _overlay:Overlay,
              @Inject(MAT_DATE_FORMATS) private _dateFormats:MatDateFormats,
              private _ngZone:NgZone,
              public dialogRef:MatDialogRef<DateNTimeExpandedComponent>,
              @Inject(MAT_DIALOG_DATA) public dateNTimeData:DateNTimeData,
              private _viewContainerRef:ViewContainerRef,
              /*@Inject(MAT_DATEPICKER_SCROLL_STRATEGY) private _scrollStrategy,*/
              // @ts-ignore
              _dateAdapter:DateAdapter<Date>,
              // @ts-ignore
              private _intl:MatDatepickerIntl,
              private changeDetectorRef:ChangeDetectorRef,
              @Optional() private _dir:Directionality,
              @Optional() @Inject(DOCUMENT) private _document:any,
              private dateService: DateNTimeServiceProvider) {
    super(_intl, _dateAdapter, _dateFormats, changeDetectorRef);
    // super._calendarHeaderPortal
    // @ts-ignore
    if (!this._dateAdapter) {
      ///throw createMissingDateImplError('DateAdapter');
    }
  }

  ngAfterContentInit() {
    let combinedValue = this.dateService.getDatenTime();
      let value = combinedValue;
      let formattedDate = new Date(this.formatDate(value));
      this._selected = formattedDate;
      this.startDate = this.selected;
  }

  ngOnInit() {
    let combinedValue = this.dateService.getDatenTime();
    let value = combinedValue;
    this.time = this.formatTime(value);
  }
 
  formatDate(date):string {
    var mnths = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
      },
      date = date.split(" "); //["Aug", "08,", "2018", "22:30"]

    return [date[2], mnths[date[0]], (date[1]).substr(0, 2)].join("-"); //2018-07-06
  }

  formatTime(time):string {
    time = time.split(" ");
    return time[3];
  }

  getInvalidError(invalidFlag) {
    if (invalidFlag == true)
      this.showFormatErrorMsg = true;
    else
      this.showFormatErrorMsg = false;
  }

  onCancelClick():void {
    this.dialogRef.close();
  }

  onSetClick():void {
    this.dateNTimeData = {'timeValue': this.time, 'dateValue': this.selected + "", 'is24Hour': true};
    this.dialogRef.close(this.dateNTimeData);
  }

  select(date:Date):void {
    let oldValue = this._selected;
    console.log(this._selected);
    // @ts-ignore
    this._selected = date;
    // @ts-ignore
    if (!this._dateAdapter.sameDate(oldValue, this._selected)) {
      this._selectedChanged.next(date);
    }
  }

  /*get the current date and time*/
  timeNow() {
    const d = new Date(),
      date = (d.getFullYear() + '-' + (((d.getMonth() + 1) < 10 ? '0' : '') + d.getMonth()) + '-' + ((d.getDate() < 10 ? '0' : '') + d.getDate())), //2018-07-06
      h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
      m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    let value = h + ':' + m;
    this.time = value;
  }


  getTime(timeInput) {
    this.time = timeInput[0] + ':' + timeInput[1];
  }
}
