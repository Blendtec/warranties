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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product: FormGroup;
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

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    private jarInfo: GetAssetService<object[]>
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

  checkIfErrorsShow(form: FormGroup): boolean {
    if ((form.touched || this.attemptedToSubmit) && form.invalid) {
      return true;
    }
    for (let i in form['controls']) {
      if (typeof form['controls'][i]['controls'] === 'object') {
        if (this.checkIfErrorsShow(form['controls'][i]['controls'])) {
          return true;
        } else {
          if ((form.controls[i].touched || this.attemptedToSubmit) && form.controls[i].invalid) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkIfElementIsErrored(input: FormControl): boolean {
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
      this.wrongFileType = false;
      this.product.get(photoKey).setValue(event.target.files);
    } else {
       this.wrongFileType = true;
       this.product.get(photoKey).setValue({});
    }
  }

  private createForm(): void {
    if (this.storeService.storeForm['product']) {
      this.product = this.storeService.storeForm['product'];
    } else {
      this.product = this.formBuilder.group({
        problemType: ['', [Validators.required]],
        motorSerial: this.formBuilder.group({
          serialPrefix: ['', [Validators.required]],
          serialSuffix: ['', [Validators.required]],
          serialPhoto: ['', [Validators.required]]
        }),
        jar: this.formBuilder.group({
          jarSize: ['', []],
          jarNumber: ['', []],
          jarPhoto: ['', []]
        }),
        problemDescription: ['', [Validators.required]]
      });
    }

  }

  previousStep(): void {
     this.storeService.passDisplayState(1);
  }

  public onSubmit(): void {
    this.storeService.storeForm['product'] = this.product;
    this.attemptedToSubmit = true;
    console.log(this.product);
    console.log(this.product.get('address.zip'));
    if (this.product.valid) {
      this.storeService.passDisplayState(1);
    }
  }

}
