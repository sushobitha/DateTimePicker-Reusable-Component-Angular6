import {DateNTimeExpandedComponent} from "./datentime-expanded.component";
import {Component,Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import { FormGroup } from '@angular/forms';
import {DateNTimeData} from "./datentime.model";
import {isUndefined} from "util";
import { FieldConfig } from "../field.interface";
import { DateNTimeServiceProvider } from "./datentime.service";

@Component({
  selector: 'datentime-collapsed',
  templateUrl: 'datentime-collapsed.html'
})

export class DateNTimeCollapsedComponent{

  dateCombination: string;
  timeCombination: string;
  dateNTimeCombinedValue: string;
  dateNTimeData: DateNTimeData;
  datePickerModel:string;
  @Input() field:FieldConfig;
  @Input() group:FormGroup;
  @Input() columnCount:number;
  private _fieldvalue:string;
  @Input()
  set fieldValue(value:string){
    this._fieldvalue = value;
    if(value){
      let time='';
      let inputValue =value;
      this.dateNTimeCombinedValue = inputValue;
      let dateTime= inputValue.split(' ');
      let date= this.formatDate(dateTime[0]);
      if(dateTime[1] == '00:00' || isUndefined(dateTime[1]))
        time = '16:00'; //some default time
      else
        time = dateTime[1];
      this.dateNTimeCombinedValue = date+' '+ time;
      this.dateService.setDatenTime(this.dateNTimeCombinedValue);
    }
    else{
      this.dateNTimeCombinedValue = this.getDefaultValue();
    }

  }
  get fieldValue(){
    return this._fieldvalue;
  }

  constructor(public dialog: MatDialog, private dateService: DateNTimeServiceProvider) {

  }

  openDialog($event): void {
    const dialogPosition: any = {
      top: '100px',
      left: '100px'
    };
    this.dateService.setDatenTime(this.dateNTimeCombinedValue);
  const dialogRef = this.dialog.open(DateNTimeExpandedComponent,{
      width: '350px',
      height: '450px',
      position: dialogPosition
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dateNTimeData = result;
        this.dateCombination = this.dateNTimeData.dateValue;
        this.timeCombination = this.dateNTimeData.timeValue;
        this.dateNTimeCombinedValue = this.getDateNTimeCombinedValue();

        this.dateService.setDatenTime(this.dateNTimeCombinedValue);
      }
    });
  }
  
  today():string {
    const d = new Date().toISOString(),
       date = d.substr(0,10);
      return date;
  }

  getDefaultValue():string{
    this.dateCombination = this.today();
    this.timeCombination= "16:00";

    return  this.formatDate(this.dateCombination) +" "+ this.timeCombination;
  }

  getDateNTimeCombinedValue():string{
    if(this.dateCombination == null || this.dateCombination == undefined)
      this.dateCombination = this.today();
    if( this.timeCombination == null || this.timeCombination == undefined)
      this.timeCombination= "16:00";

    return  this.formatDate(this.dateCombination) +" "+ this.timeCombination;
  }
  handleClick($event, input):void{
    this.openDialog($event);
  }


  formatDate(date):string {
    var d = new Date(date),
    value= d.toDateString().split(' '),
    mon = ''+ value[1],
      dd= ' '+ value[2],
      yyyy = ', '+value[3];
    if (dd.length < 2) dd = '0' + dd;

    return mon+ dd + yyyy; //Mon dd, YYYY

  }


}
