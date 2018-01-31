import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { StoreService, GetAssetService, CountryService, RetailerService } from '../services/';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/throw';
import { Subscription } from 'rxjs/Subscription';
import { OtherPurchasePlaceValidator, StatesValidator } from '../validators/';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../config';
import { ICountry, IState } from '../models';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.css']
})
export class AdditionalComponent implements OnInit, OnDestroy {

  public additional: FormGroup;
  public formValue: object;

  public captchaKey: string;
  private unsubscribe: Subject<void> = new Subject();
  public contactMethod = '';
  private acceptableFileFormats = ['image/jpeg', 'image/jpg', 'image/png'];
  public wrongFileType = false;
  public dynamicRepeatValue: any;
  public jars$:  Observable<object[]>;
  public isFormValid = false;
  public attemptedToSubmit = false;
  public textAreaLength = 500;

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    private jarInfo: GetAssetService<object[]>,
     @Inject(APP_CONFIG) private config: AppConfig) {

      this.jars$ = jarInfo.getAll$('jars.json');
    }

  formSubmitted(value) {
    console.log(value);
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

  diffState(state: number): void {
    this.storeService.passNumState(state);
  }

  checkIfErrored(): boolean {
    return true;
  }

  checkIfErrorsShow(form: any): boolean {
    for (let i in form['controls']) {
      if (typeof form['controls'][i]['controls'] === 'object') {
        if (this.checkIfErrorsShow(form['controls'][i])) {
          return true;
        }
      } else {
          if (this.checkIfElementIsErrored(form.controls[i])) {
            return true;
          }
      }
    }
    return false;
  }

  checkIfElementIsErrored(input: object): boolean {
    if ((input['touched'] || this.attemptedToSubmit) && input['invalid']) {
      return true;
    } else {
      return false;
    }
  }

  fileUpload(event, photoKey: string): void {
    if (event.target.files &&
      event.target.files[0] &&
      event.target.files[0].name &&
      event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      this.additional.get(photoKey).setValue(event.target.files);
    } else {
       this.additional.get(photoKey).setValue(null);
    }
  }

  private createForm(): void {
    console.log(Validators);
    if (this.storeService.storeForm['additional']) {
      this.additional = this.storeService.storeForm['additional'];
    } else {
      this.additional = this.formBuilder.group({
        problemType: ['', [Validators.required]],
        motorSerial: this.formBuilder.group({
          serialPrefix: ['', [Validators.required]],
          serialSuffix: ['', [Validators.required]],
          serialPhoto: [null, [Validators.required]]
        }),
        jar: this.formBuilder.group({
          jarSize: ['', []],
          jarNumber: ['', []],
          jarPhoto: [null, []]
        }),
        problemDescription: ['', [Validators.required]]
      });
    }
  }

  requireJars(): void {
    //    this.registration.get('address.stateProvince').setAsyncValidators(StatesValidator.createValidator(this.stateService));
    if ((this.additional.get('problemType').value === 'jar' || this.additional.get('problemType').value === 'both') &&
      this.additional['controls'] &&
      this.additional['controls']['jar'] &&
      this.additional['controls']['jar']['controls']) {
      this.additional['controls']['jar']['controls']['jarNumber'].setValidators(Validators.compose([Validators.required]));
      this.additional['controls']['jar']['controls']['jarNumber'].updateValueAndValidity();
      this.additional['controls']['jar']['controls']['jarSize'].setValidators(Validators.compose([Validators.required]));
      this.additional['controls']['jar']['controls']['jarSize'].updateValueAndValidity();
      this.additional['controls']['jar']['controls']['jarPhoto'].setValidators(Validators.compose([Validators.required]));
      this.additional['controls']['jar']['controls']['jarPhoto'].updateValueAndValidity();
    } else if (!(this.additional.get('problemType').value === 'jar' || this.additional.get('problemType').value === 'both') &&
      this.additional['controls'] &&
      this.additional['controls']['jar'] &&
      this.additional['controls']['jar']['controls']) {
      this.additional['controls']['jar']['controls']['jarNumber'].setValidators(Validators.compose([]));
      this.additional['controls']['jar']['controls']['jarNumber'].updateValueAndValidity();
      this.additional['controls']['jar']['controls']['jarSize'].setValidators(Validators.compose([]));
      this.additional['controls']['jar']['controls']['jarSize'].updateValueAndValidity();
      this.additional['controls']['jar']['controls']['jarPhoto'].setValidators(Validators.compose([]));
      this.additional['controls']['jar']['controls']['jarPhoto'].updateValueAndValidity();
    }
  }

  previousStep(): void {
     this.storeService.passDisplayState(1);
  }

  public onSubmit(): void {
    this.storeService.storeForm['additional'] = this.additional;
    this.attemptedToSubmit = true;
    console.log(this.additional);
    if (this.additional.valid) {
      this.storeService.passDisplayState(3);
    }
  }

}
