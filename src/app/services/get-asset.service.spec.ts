import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GetAssetService } from './get-asset.service';
import { AppConfigModule } from '../config';
import { IState } from '../models';


describe('GetAssetService', () => {

  let getAssetService: GetAssetService<IState>;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppConfigModule
      ],
      providers: [
        GetAssetService
      ]
    });

    getAssetService = TestBed.get(GetAssetService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {

    expect(getAssetService).toBeTruthy();
  });

});


