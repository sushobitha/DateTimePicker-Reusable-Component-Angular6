import { Component, ViewChild} from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : []
})
export class AppComponent {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  title = 'TestProj';

  config: FieldConfig[] = [
    {
    type: "date",
    label: "DOB",
    name: "dob",
    value: "2018-09-08 00:00",
    validations: [
    {
    name: "required",
    validator: Validators.required,
    message: "Date of Birth Required"
    }
    ]}
  ]
  // },
  //   {
  //   type: "button",
  //   label: "Save"
  //   }
  //   ];
}
