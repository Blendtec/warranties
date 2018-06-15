import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { GetAssetService } from '../services';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IState } from '../models';

@Injectable()
export class StatesValidator {

  static createValidator(stateService: GetAssetService<IState>): (control: AbstractControl) => Observable<{[key: string]: boolean}> {

    return (control: AbstractControl): Observable<{[key: string]: boolean}> => {
      const country = control.parent.get('country').value;

      return stateService
        .getAll$('states.json')
        .map(states => states.some(state => state.country === country) && !control.value ? {required: true} : null);
    }
      ;
  }
}
