import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup } from '@angular/forms';


@Injectable()
export class StoreService {
  public formValues: object;
  public formStorage: object;

  public isTotalFormValid: boolean;
  public formErrorsByForm: string[];

  private requestValues = new Subject<string>();
  retrieveRequestValues$ = this.requestValues.asObservable();

  private requestValues2 = new Subject<string>();
  retrieveRequestValues2$ = this.requestValues2.asObservable();

  constructor() {
  	this.formValues = {};
  	this.formStorage = {}
  }

  startTotalFormValidation() {
    this.isTotalFormValid = true;
    this.formErrorsByForm = [];
  }

  isFormControlValid(valid: boolean, formName: string, errorMessage: string, touched: boolean) {
    if (!valid) {
      this.isTotalFormValid = false;
    }
    if (!valid && errorMessage && touched) {
      this.formErrorsByForm.push(errorMessage);
    }
  }

  passFormValues(data: object, name: string) {
    this.formValues[name] = data;
  }

  getFormValues(name: string) {
  	return this.formValues[name];
  }

  getFormStorage(name = null) {
  	if (!name) {
  		return this.formStorage;
  	} else if (!this.formStorage[name]) {
      return false;
    } else {
  		return this.formStorage[name];
  	}
  }

  passFormStorage(data: FormGroup, name: string) {
  	this.formStorage[name] = data;
  }

  passRequestValues(data: string) {
  	this.requestValues.next(data);
  }

  passRequestValues2(data: string) {
    this.requestValues2.next(data);
  }
}
