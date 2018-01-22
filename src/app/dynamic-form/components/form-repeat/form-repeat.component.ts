import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-repeat',
  styleUrls: ['form-repeat.component.scss'],
  template: `
  <div [formGroup]="group.controls[config.name]">
      <dynamic-form
        [config]="config.form"
        [dynamicValue]="dynamicValue">
      </dynamic-form>
      <button (click)="checkcode()">asdf</button>
      </div>
  `
})
export class FormRepeatComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  dynamicValue: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.group.controls[this.config.name] = this.fb.group({
      dynamicValue: this.dynamicValue;
    });
  }

  checkcode() {
    console.log(this.group.controls[this.config.name]);
  }
}
