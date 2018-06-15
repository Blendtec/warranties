import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { APP_CONFIG, AppConfig } from '../config';

@Injectable()
export class WarrantiesService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { }

 post(command: any): Promise<any> {
    return this.http.post(`${this.config.apiHost}${this.config.warrantiesEndPoint}`, command, {responseType: 'text'}).toPromise();
  }
}
