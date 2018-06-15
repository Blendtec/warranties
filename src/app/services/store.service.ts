import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StoreService {
  storeForm: any;
  storeFormData: any;
  retrieveLanguage$: Observable<any>;
  retrieveState$: Observable<any>;
  displayState$: Observable<any>;
  retrieveNumState$: Observable;

  private language = new Subject<string>();
  private state = new Subject<string>();
  private displayState = new Subject<number>();
  private numState = new Subject<number>();

  constructor() {
    this.language.next('en');
    this.retrieveLanguage$ = this.language.asObservable();
    this.retrieveState$ = this.state.asObservable();
    this.displayState$ = this.displayState.asObservable();
    this.retrieveNumState$ = this.numState.asObservable();
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

  passDisplayState(data: number) {
    this.displayState.next(data);
  }

  passNumState(data: number) {
    this.numState.next(data);
  }

  getState() {
    return this.state.asObservable();
  }

}
