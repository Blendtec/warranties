import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService, GetAssetService, RetailerService } from '../services/';
import { TranslateLoader, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgPipesModule } from 'ngx-pipes';
import { CountryService } from '../services/';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, AppConfigModule } from '../config/app-config.module';
import { CountrySelectComponent } from '../directives/country-select/country-select.component';
import { SerialModalComponent } from '../directives/serial-modal.component/serial-modal.component';
import { APP_BASE_HREF } from '@angular/common';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { PersonalComponent } from './personal.component';

describe('PersonalComponent', () => {

  const assetSvcMock = jasmine.createSpyObj('GetAssetService', ['getAll$']);
  assetSvcMock.getAll$.and.returnValue(Observable.of([]));

  const countrySvcMock = jasmine.createSpyObj('CountryService', ['getAll$']);
  countrySvcMock.getAll$.and.returnValue(Observable.of([]));

  const retailerSvcMock = jasmine.createSpyObj('RetailerService', ['getAll$']);
  retailerSvcMock.getAll$.and.returnValue(Observable.of([]));

  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalComponent, CountrySelectComponent],
      imports: [
        AppConfigModule,
        FormsModule,
        HttpClientModule,
        MyDatePickerModule,
        NgPipesModule,
        ReactiveFormsModule,
        TranslateModule
      ],
      providers: [
        FormBuilder,
        StoreService,
        {provide: RetailerService, useValue: retailerSvcMock},
        {provide: CountryService, useValue: countrySvcMock},
        {provide: GetAssetService, useValue: assetSvcMock},
        {provide: TranslateService, useValue: {} },
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: APP_CONFIG, useValue: {s3: 's3Url', captchaKey: 'testKey'}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
