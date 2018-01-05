import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StoreService {
  private language = new Subject<string>();
  private tester = true;
  private state = new Subject<number>();

  retrieveLanguage$ = this.language.asObservable();
  retrieveState$ = this.state.asObservable();

  constructor() {
    this.language.next('en');
  }


  passLanguage(data: string) {
    this.language.next(data);
  }

  getLanguage() {
    return this.language.asObservable();
  }

  passState(data: number) {
    this.state.next(data);
  }

  getState() {
    return this.state.asObservable();
  }

}
