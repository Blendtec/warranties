import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { StoreService, GetAssetService, CountryService, RetailerService } from '../services/';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/throw';
import { Subscription } from 'rxjs/Subscription';
import { OtherPurchasePlaceValidator, StatesValidator } from '../validators/';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../config';
import { ICountry, IPersonal, IState } from '../models';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {

  public personal: FormGroup;
  public retailers$: Observable<any[]>;
  public countries$: Observable<ICountry[]>;
  public states$: Observable<IState[]>;
  public statesByCountry: string[];
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
  public formValue = {};
/*
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
*/
    formConfig = [
    {
      type: 'input',
      label: 'First Name',
      name: 'firstName',
      placeholder: 'Enter your First Name',
      validation: [Validators.required],
      errorMessage: "Please Enter your first name",
      addedClasses: "grid__item small--one-half medium--one-half large--one-half"
    },
    {
      type: 'input',
      label: 'Last Name',
      name: 'lastName',
      placeholder: 'Enter your Last Name',
      validation: [Validators.required],
      errorMessage: "Please Enter your last name",
      addedClasses: "grid__item small--one-half medium--one-half large--one-half"
    },
    {
      type: 'repeat',
      label: 'Address',
      name: 'address',
      form: [
        {
          type: 'input',
          label: 'Street Address',
          name: 'one',
          placeholder: 'Street Address',
          addedClasses: "grid__item",
          validation: [Validators.required],
          errorMessage: "Address is required",
        },
        {
          type: 'input',
          label: 'Apt/Suite',
          name: 'two',
          placeholder: 'Apt/Suite',
          addedClasses: "grid__item small--one-half medium--one-half large--one-half"
        },
        {
          type: 'input',
          label: 'City',
          name: 'city',
          placeholder: 'City',
          addedClasses: "grid__item small--one-half medium--one-half large--one-half",
          validation: [Validators.required],
          errorMessage: "City is required",
        },
        {
          type: 'select',
          label: 'Select State',
          name: 'state',
          options: this.statesByCountry,
          placeholder: 'Select State',
          addedClasses: "grid__item small--one-half medium--one-half large--one-half",
          validation: [Validators.required],
          errorMessage: "Your State is Required",
        },
      ]
    },
    {
      type: 'select',
      label: 'Favourite food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      addedClasses: "grid__item"
    },
    {
      type: 'radio',
      label: 'What Is The Best Way To Contact You?',
      name: 'contactMethod',
      validation: [Validators.required],
      errorMessage: "Please Enter your preferred contact method",
      addedClasses: "grid__item",
      radioOptions: [
      {
        label: 'Email',
        value: 'email'
      },
      {
        label: 'Phone',
        value: 'phone'
      }
      ]
    },
    {
      type: 'radio',
      label: 'What Is The Best Time Of Day To Reach You?',
      name: 'contactTime',
      validation: [Validators.required],
      errorMessage: "Please Enter the best time to reach you",
      addedClasses: "grid__item",
      radioOptions: [
      {
        label: 'Morning',
        value: 'morning'
      },
      {
        label: 'Afternoon',
        value: 'afternoon'
      },
      {
        label: 'Evening',
        value: 'evening'
      }
      ]
    },
    {
      name: 'purchase',
      form: [
        {
          type: 'date',
          label: 'Date of Purchase',
          name: 'purchaseDate',
          dateOptions: this.dateOptions,
          addedClasses: "grid__item"
        },
      ],
      type: 'repeat',
    },
    {
      type: 'file',
      name: 'receiptPhoto',
      addedClasses: "grid__item",
      label: 'If you have a photo of the receipt please upload it here.'

    }
  ];


  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private getState: GetAssetService<IState>,
    private retailerService: RetailerService,
     @Inject(APP_CONFIG) private config: AppConfig) {
      this.retailers$ = retailerService.getAll$();
      this.countries$ = countryService.getAll$()
      .takeUntil(this.unsubscribe)
      .subscribe((data) => {
        console.log(data);
      });
      this.states$ = getState.getAll$('states.json')
      .takeUntil(this.unsubscribe)
      .subscribe((data) => console.log(data));
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

    this.personal.get('address.stateProvince').setAsyncValidators(StatesValidator.createValidator(this.getState));

    this.personal
      .get('address.country')
      .valueChanges
      .takeUntil(this.unsubscribe)
      .subscribe(() => this.personal.get('address.stateProvince').updateValueAndValidity());
  }

   formValidityCapture(value) {
    this.isFormValid = value;
    console.log(value);
  }

  formValueCapture(value) {
    this.formValue = value;
  }

  public onSubmit(): void {
    this.storeService.storeForm['personal'] = this.formValue;
    if (this.isFormValid) {
      this.storeService.passDisplayState(1);
    }
  }

}
