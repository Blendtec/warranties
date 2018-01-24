import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-repeat',
  styleUrls: ['form-repeat.component.scss'],
  template: `
  <div [formGroup]="group.controls[config.name]">
      <dynamic-form
        [config]="config.form"
        [formName]="config.name"
        (formToParent)="getChildForm($event)">
      </dynamic-form>
  </div>
  `
})
export class FormRepeatComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
  groupName: string;

  getChildForm(formValue) {
    this.group.controls[this.config.name] = formValue;
    this.group.value[this.config.name] = formValue.value;
  }

}
