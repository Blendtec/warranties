import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IState } from '../models/state.interface';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config';

@Injectable()
export class GetAssetService<T> {


  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  public getAll$(resource: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.config.s3}/${resource}`);
  }
}
