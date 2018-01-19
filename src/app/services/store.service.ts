import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IPersonal } from '../models/';

@Injectable()
export class StoreService {
  private language = new Subject<string>();
  private tester = true;
  private state = new Subject<string>();
  private numState = new Subject<number>();
  public storeForm: any;
  public storeFormData: any;

  retrieveLanguage$ = this.language.asObservable();
  retrieveState$ = this.state.asObservable();
  retrieveNumState$ = this.numState.asObservable();

  constructor() {
    this.language.next('en');
    this.storeForm = {};
    this.storeFormData = {};
  }


  passLanguage(data: string) {
    this.language.next(data);
  }

  getLanguage() {
    return this.language.asObservable();
  }

  passState(data: string) {
    this.state.next(data);
  }

  passNumState(data: number) {
    this.numState.next(data);
  }

  getState() {
    return this.state.asObservable();
  }

}

/*
export interace AggregateData {
  'personal': IPersonal
  'product': IProduce,
  'additional': {}
}

submit ///
 if valid
    storeForm.personal = form.value;

    */
