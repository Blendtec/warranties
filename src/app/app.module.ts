import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonalComponent } from './personal/personal.component';
import { ProductComponent } from './product/product.component';
import { AdditionalComponent } from './additional/additional.component';
import { StoreService, GetAssetService, CountryService, RetailerService, WarrantiesService } from './services/';
import { StateTrackerComponent } from './state-tracker/state-tracker.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppConfigModule } from './config';
import { NgPipesModule } from 'ngx-pipes';
import { AppConfig } from './config/models/app-config.interface';
import { APP_CONFIG } from './config/app-config.module';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CountrySelectComponent } from './directives/country-select/country-select.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WindowService } from './services/window.service';
import { ImageResizerService } from './services/image-resizer.service';
import { SerialModalComponent } from './directives/serial-modal.component/serial-modal.component';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2ImgMaxModule } from 'ng2-img-max';

export function HttpLoaderFactory(http: HttpClient, config: AppConfig) {
  return new TranslateHttpLoader(http, `${config.assets}/i18n/`, '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    ProductComponent,
    AdditionalComponent,
    StateTrackerComponent,
    CountrySelectComponent,
    SerialModalComponent
  ],
  imports: [
    AppConfigModule,
    MyDatePickerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    Ng2ImgMaxModule,
    NgPipesModule,
    RecaptchaModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, APP_CONFIG]
      }
    })

  ],
  providers: [StoreService,
  FormBuilder,
  GetAssetService,
  TranslatePipe,
  WindowService,
  CountryService,
  RetailerService,
  WarrantiesService,
  ImageResizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
