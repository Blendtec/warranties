import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <div
      class="dynamic-field form-input {{config.addedClasses}}"
      [formGroup]="group">
      <label class="hidden-label">{{config.label}}</label>
      <input (focus)="focusDetection()" placeholder="{{config.label}}"
        type="text" [ngClass]="{error: group.controls[config.name].invalid && group.controls[config.name].touched}"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name">
    </div>
  `
})
export class FormInputComponent implements Field, OnInit, OnDestroy  {
  config: FieldConfig;
  group: FormGroup;
  groupName: string;
  invalidForm: boolean;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private storeService: StoreService) {}

  focusDetection() {
    this.storeService.startTotalFormValidation();
    this.storeService.passRequestValues(this.groupName);
  }

  ngOnInit() {
    this.invalidForm = false;

    let self = this;
    this.storeService.retrieveRequestValues$
      .takeUntil(this.destroy$)
      .subscribe(data => {

        if (typeof self.group.controls[self.config.name] !== 'undefined' && 
          typeof self.group.controls[self.config.name] !== 'undefined' && 
          typeof self.group.controls[self.config.name].invalid !== 'undefined' && 
          self.group.controls[self.config.name].invalid) {

          let errorMessage = (self.config.errorMessage)?self.config.errorMessage:null;
          self.storeService.isFormControlValid(!self.group.controls[self.config.name].invalid, 
            self.config.name, errorMessage, self.group.controls[self.config.name].touched);

          if (self.group.controls[self.config.name].touched) {
            self.invalidForm = true;
          }
        } else {
            self.invalidForm = false;
          }

      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
