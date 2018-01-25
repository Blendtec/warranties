import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'form-radio',
  styleUrls: ['form-radio.component.scss'],
  template: `
  	<div [formGroup]="group" class="input-full {{config.addedClasses}}">
  		<div>
      		<label>{{config.label}}</label>
      	</div>
      	<label *ngFor="let radioOption of config.radioOptions;" for="{{radioOption.label}}" class="radio-seperator">
        	<input class="" placeholder="{{radioOption.label}}" type="radio" formControlName="{{config.name}}" value="{{radioOption.value}}"
               [ngClass]="{error: group.controls[config.name].invalid && group.controls[config.name].touched}">
               {{radioOption.label}}
        </label>
	</div>

  `
})
export class FormRadioComponent implements Field, OnInit, OnDestroy  {
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
