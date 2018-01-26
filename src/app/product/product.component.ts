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
  public retailers$: Observable<any[]>;
  public countries$: Observable<ICountry[]>;
  public states$: Observable<IState[]>;
  public timeZones$: Observable<object[]>;
  public formValue: object;
  public dateOptions: any = {
    dateFormat: 'mm-dd-yyyy',
    indicateInvalidDate: true,
    showClearDateBtn: false
  };
  public captchaKey: string;
  private unsubscribe: Subject<void> = new Subject();
  public contactMethod = '';
  private acceptableFileFormats = ['image/jpeg', 'image/jpg', 'image/png'];
  public wrongFileType = false;
  public dynamicRepeatValue: any;

  public isFormValid = false;
  public attemptedToSubmit = false;

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private getState: GetAssetService<IState>,
    private retailerService: RetailerService,
    private getTimeZones: GetAssetService<object[]>,
     @Inject(APP_CONFIG) private config: AppConfig) {

      this.retailers$ = retailerService.getAll$();
      this.countries$ = countryService.getAll$();
      this.states$ = getState.getAll$('states.json');
      this.timeZones$ = getTimeZones.getAll$('time-zones.json');
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
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: this.formBuilder.group({
          one: ['', [Validators.required]],
          two: ['', []],
          city: ['', [Validators.required]],
          zip: ['', [Validators.required]],
          country: ['US', [Validators.required]],
          stateProvince: ['', []],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required]]
        }),
        contact: this.formBuilder.group({
          contactMethod: ['', [Validators.required]],
          contactTime: ['', [Validators.required]],
          timeZone: ['', [Validators.required]]
        }),
        purchase: this.formBuilder.group({
          place: ['', [Validators.required]],
          other: ['', []],
          date: ['', [Validators.required]]
        }, {validator: OtherPurchasePlaceValidator}),
        receiptPhoto: [{}, []]
      });
    }

    this.product.get('address.stateProvince').setAsyncValidators(StatesValidator.createValidator(this.getState));

    this.product
      .get('address.country')
      .valueChanges
      .takeUntil(this.unsubscribe)
      .subscribe(() => this.product.get('address.stateProvince').updateValueAndValidity());
  }

  previousStep(): void {
     this.storeService.passDisplayState(-1);
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
