import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WarrantiesService } from './warranties.service';
import { AppConfigModule } from '../config';

describe('WarrantiesService', () => {

  let requestService: WarrantiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppConfigModule
      ],
      providers: [
        WarrantiesService
      ]
    });

    requestService = TestBed.get(WarrantiesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {

    expect(requestService).toBeTruthy();
  });
});
