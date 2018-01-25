import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormRepeatComponent } from './components/form-repeat/form-repeat.component';
import { StoreService } from './services/store.service';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { MyDatePickerModule } from 'mydatepicker';
import { FormFileComponent } from './components/form-file/form-file.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyDatePickerModule,
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRepeatComponent,
    FormRadioComponent,
    FormDateComponent,
    FormFileComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRepeatComponent,
    FormRadioComponent,
    FormDateComponent,
    FormFileComponent
  ],
  providers: [StoreService]
})
export class DynamicFormModule {}
