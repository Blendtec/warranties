import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { StoreService, StateService, CountryService, RetailerService } from '../services/';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/throw';
import { Subscription } from 'rxjs/Subscription';
import { OtherPurchasePlaceValidator, StatesValidator } from '../validators/';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../config';
import { ICountry, IPersonal } from '../models';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {

  public personal: FormGroup;
  public retailers$: Observable<any[]>;
  public countries$: Observable<ICountry[]>;
  public states$: Observable<any[]>;
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

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private stateService: StateService,
    private retailerService: RetailerService,
     @Inject(APP_CONFIG) private config: AppConfig) {
      this.retailers$ = retailerService.getAll$();
      this.countries$ = countryService.getAll$();
      this.states$ = stateService.getAll$();
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


  fileUpload(event): void {
    if (event.target.files &&
      event.target.files[0] &&
      event.target.files[0].name &&
      event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      this.wrongFileType = false;
      this.personal.get('receiptPhoto').setValue(event.target.files);
    } else {
       this.wrongFileType = true;
       this.personal.get('receiptPhoto').setValue({});
    }
  }

  private createForm(): void {
    if (this.storeService.storeForm['personal']) {
      this.personal = this.storeService.storeForm['personal'];
    } else {
      this.personal = this.formBuilder.group({
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
          contactTime: ['', [Validators.required]]
        }),
        purchase: this.formBuilder.group({
          place: ['', []],
          other: ['', []],
          date: ['', [Validators.required]]
        }, {validator: OtherPurchasePlaceValidator}),
        receiptPhoto: [{}, []]
      });
    }

    this.personal.get('address.stateProvince').setAsyncValidators(StatesValidator.createValidator(this.stateService));

    this.personal
      .get('address.country')
      .valueChanges
      .takeUntil(this.unsubscribe)
      .subscribe(() => this.personal.get('address.stateProvince').updateValueAndValidity());
  }


  public onSubmit(formData: IPersonal): void {
    this.storeService.storeForm['personal'] = this.personal;
    this.storeService.storeFormData['personal'] = formData;
    if (!this.personal.invalid) {
      this.storeService.passNumState(2);
    }
    console.log(this.storeService.storeFormData['personal']);
  }

}
