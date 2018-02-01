import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreService } from './services/store.service';
import { Subscription } from 'rxjs/Subscription';
import { MyDatePickerModule } from 'mydatepicker';
import { NgPipesModule } from 'ngx-pipes';
import { PersonalComponent } from './personal/personal.component';
import { ProductComponent } from './product/product.component';
import { AdditionalComponent } from './additional/additional.component';
import { StateTrackerComponent } from './state-tracker/state-tracker.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountrySelectComponent } from './directives/country-select/country-select.component';
import { TranslateLoader, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { WindowService } from './services/window.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from './config/app-config.module';

export function HttpLoaderFactory() {
  return null;
}

xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PersonalComponent,
        ProductComponent,
        AdditionalComponent,
        StateTrackerComponent,
        CountrySelectComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgPipesModule,
        MyDatePickerModule,
        TranslateModule
      ],
      providers: [
      StoreService,
      TranslatePipe,
      { provide: TranslateService, useValue: {} },
      WindowService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
