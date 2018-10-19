import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatNativeDateModule
} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import {appRoutes} from './router';
import { DateNTimeCollapsedComponent } from './date-time/datentime-collapsed.component';
import { DateNTimeExpandedComponent } from './date-time/datentime-expanded.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormsModule } from '@angular/forms';
import { TimeComponent } from './date-time/time-component/time-component';
import { DateNTimeServiceProvider } from './date-time/datentime.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MessagesComponent } from './shared/messages-service/messages.component';
@NgModule({
  declarations: [
    AppComponent,
    DateNTimeCollapsedComponent,
    DateNTimeExpandedComponent,
    InputComponent,
    ButtonComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    TimeComponent,
    DialogComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [DateNTimeServiceProvider],
  bootstrap: [AppComponent],
  entryComponents: [InputComponent,
    ButtonComponent,
    DateNTimeCollapsedComponent,
    DateNTimeExpandedComponent, TimeComponent,DialogComponent, MessagesComponent]
})
export class AppModule { }
 