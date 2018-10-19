import { Injectable } from "@angular/core";

@Injectable()
export class DateNTimeServiceProvider {

    date: string;
    constructor() { };

    getDatenTime() {
        return this.date;
    }

    setDatenTime(date: string) {
        this.date = date;
    }
}