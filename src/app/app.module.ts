import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonalComponent } from './personal/personal.component';
import { ProductComponent } from './product/product.component';
import { AdditionalComponent } from './additional/additional.component';
import { StoreService } from './services/store.service';
import { StateTrackerComponent } from './state-tracker/state-tracker.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    ProductComponent,
    AdditionalComponent,
    StateTrackerComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [StoreService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
