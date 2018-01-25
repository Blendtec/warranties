import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'form-file',
  styleUrls: ['form-file.component.scss'],
  template: `
    <div
      class="dynamic-field form-input {{config.addedClasses}}"
      [formGroup]="group">
      <label>{{config.label}}</label>
		<input class="" placeholder="{{config.label}}" id="{{config.name}}" type="file"
		(change)="fileUpload($event)"
	       [ngClass]="{error: group.controls[config.name].invalid && group.controls[config.name].touched}" [formControlName]="config.name">
    </div>
  `
})
export class FormFileComponent implements Field, OnInit, OnDestroy  {
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

  fileUpload(event): void {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        try{
        this.group.get(this.config.name).setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })

        }catch(e) {
          console.log(e);
        }

        this.storeService.passRequestValues2('');
      };
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
