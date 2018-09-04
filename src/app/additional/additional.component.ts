import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { StoreService, GetAssetService, CountryService, RetailerService } from '../services/';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/throw';
import { Subscription } from 'rxjs/Subscription';
import { RecaptchaValidator } from '../validators/';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../config';
import { ICountry, IState } from '../models';
import { WarrantiesService } from '../services/warranties.service';
import { WarrantiesCommand } from '../models/warranties.command';
import { ImageResizerService } from '../services/image-resizer.service';

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
  public attemptedToSubmit = false;

  public showshaftSecure = false;
  public showjarleaking = false;
  public showspinsmooth = false;
  public currentlySubmitting = false;
  public imageResizing = false;

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
     @Inject(APP_CONFIG) private config: AppConfig,
    private imageResizerService: ImageResizerService,
    private warrantiesService: WarrantiesService) {
    this.captchaKey = config.captchaKey;
    }

  formSubmitted(formData) {
    this.currentlySubmitting = true;
    return this.warrantiesService.post(new WarrantiesCommand(formData).toJSON())
      .then(() => {
         this.currentlySubmitting = false;
         this.storeService.passDisplayState(4);
      })
      .catch(() => {
         this.currentlySubmitting = false;
        this.storeService.passDisplayState(1);
        alert('Something went wrong with your application, please try again.');
      });
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
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
        self.imageResizing = true;
      this.imageResizerService.resizeImage(event.target.files[0], function(out) {
        self.imageResizing = false;
        if (out) {
          const reader = new FileReader();
          reader.onload = function() {
            self.additional.get(photoKey).setValue(reader.result);
          };
          reader.readAsDataURL(out);
        } else {
          this.additional.get(photoKey).setValue('');
        }
      });
    } else {
       this.wrongFileType = true;
       this.additional.get(photoKey).setValue('');
    }
  }

  private createForm(): void {
    if (this.storeService.storeForm['additional']) {
      this.additional = this.storeService.storeForm['additional'];
    } else {
      this.additional = this.formBuilder.group({
        unusualSounds: ['', [Validators.required]],
        shaftSecure: ['', []],
        jarLeaking: ['', []],
        spinSmooth: ['', []],
        problemPhoto: [null, [Validators.required]]
      });
    }
  }

  changeRequire(): void {
    if (this.additional.get('unusualSounds').value === 'yes') {
      this.additional['controls']['spinSmooth'].setValidators(Validators.compose([Validators.required]));
      this.additional['controls']['spinSmooth'].updateValueAndValidity();
      this.showspinsmooth = true;

      this.additional['controls']['shaftSecure'].setValidators(Validators.compose([]));
      this.additional['controls']['shaftSecure'].updateValueAndValidity();
      this.showshaftSecure = false;
    }

    if (this.additional.get('unusualSounds').value === 'no') {
      this.additional['controls']['spinSmooth'].setValidators(Validators.compose([]));
      this.additional['controls']['spinSmooth'].updateValueAndValidity();
      this.showspinsmooth = false;
      this.additional['controls']['shaftSecure'].setValidators(Validators.compose([Validators.required]));
      this.additional['controls']['shaftSecure'].updateValueAndValidity();
      this.showshaftSecure = true;
    }

    if (this.additional.get('spinSmooth').value || this.additional.get('shaftSecure').value) {
      this.additional['controls']['jarLeaking'].setValidators(Validators.compose([Validators.required]));
      this.additional['controls']['jarLeaking'].updateValueAndValidity();
      this.showjarleaking = true;
    }
  }

  previousStep(): void {
     this.storeService.passDisplayState(2);
  }

  public onSubmit(): void {
    if (!this.currentlySubmitting) {
      this.storeService.storeForm['additional'] = this.additional;
      this.attemptedToSubmit = true;
      if (this.additional.valid) {
        this.formSubmitted(this.storeService.storeForm);
      }
    }

  }

}
