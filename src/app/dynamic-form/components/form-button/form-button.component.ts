import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'form-button',
  styleUrls: ['form-button.component.scss'],
  template: `
    <div
      class="dynamic-field form-button"
      [formGroup]="group">
      <button
        [disabled]="config.disabled || !storeService.isTotalFormValid"
        type="submit">
        {{ config.label }}
      </button>
    </div>
  `
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
  formGroupName: string;

  constructor(private storeService: StoreService) {}

}
