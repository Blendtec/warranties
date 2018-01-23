import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup } from '@angular/forms';

@Injectable()
export class StoreService {
  private formValues: object;
  private formStorage: object;

  private requestValues = new Subject<string>();
  retrieveRequestValues$ = this.requestValues.asObservable();

  constructor() {
  	this.formValues = {};
  	this.formStorage = {}
  }

  passFormValues(data: object, name: string) {
    this.formValues[name] = data;
  }

  getFormValues(name: string) {
  	return this.formValues[name];
  }

  getFormStorage(name = null) {
  	if (!name || !this.formStorage[name]) {
  		return this.formStorage;
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

}
