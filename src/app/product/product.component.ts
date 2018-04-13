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
import { ImageResizerService } from '../services/image-resizer.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

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
  public textAreaLength = 500;
  public explainSerialMotor = false;
  public explainSerialJar = false;

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    private jarInfo: GetAssetService<object[]>,
    private imageResizerService: ImageResizerService,
     @Inject(APP_CONFIG) private config: AppConfig) {

      this.jars$ = jarInfo.getAll$('jars.json');
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
    for (const i in form['controls']) {
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

  fileUpload(event, photoKey): void {
    if (event.target.files &&
      event.target.files[0] &&
      event.target.files[0].name &&
      event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      this.wrongFileType = false;
      const self = this;
      this.imageResizerService.resizeImage(event.target.files[0], function(out) {
        if (out) {
          const reader = new FileReader();
          reader.onload = function() {
            self.product.get(photoKey).setValue(reader.result);
          };
          reader.readAsDataURL(out);
        } else {
          this.product.get(photoKey).setValue({});
        }
      });
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
    if ((this.product.get('problemType').value === 'jar' || this.product.get('problemType').value === 'both') &&
      this.product['controls'] &&
      this.product['controls']['jar'] &&
      this.product['controls']['jar']['controls']) {
      this.product['controls']['jar']['controls']['jarNumber'].setValidators(Validators.compose([Validators.required]));
      this.product['controls']['jar']['controls']['jarNumber'].updateValueAndValidity();
      this.product['controls']['jar']['controls']['jarSize'].setValidators(Validators.compose([Validators.required]));
      this.product['controls']['jar']['controls']['jarSize'].updateValueAndValidity();
      this.product['controls']['jar']['controls']['jarPhoto'].setValidators(Validators.compose([Validators.required]));
      this.product['controls']['jar']['controls']['jarPhoto'].updateValueAndValidity();
    } else if (!(this.product.get('problemType').value === 'jar' || this.product.get('problemType').value === 'both') &&
      this.product['controls'] &&
      this.product['controls']['jar'] &&
      this.product['controls']['jar']['controls']) {
      this.product['controls']['jar']['controls']['jarNumber'].setValidators(Validators.compose([]));
      this.product['controls']['jar']['controls']['jarNumber'].updateValueAndValidity();
      this.product['controls']['jar']['controls']['jarSize'].setValidators(Validators.compose([]));
      this.product['controls']['jar']['controls']['jarSize'].updateValueAndValidity();
      this.product['controls']['jar']['controls']['jarPhoto'].setValidators(Validators.compose([]));
      this.product['controls']['jar']['controls']['jarPhoto'].updateValueAndValidity();
    }
  }

  previousStep(): void {
     this.storeService.passDisplayState(1);
  }

  public onSubmit(): void {
    this.storeService.storeForm['product'] = this.product;
    this.attemptedToSubmit = true;
    if (this.product.valid) {
      this.storeService.passDisplayState(3);
    }
  }

}
