import { ValidatorFn } from '@angular/forms';

export interface radioOption {
  label: string,
  value: string
}

export interface selectOptions {
  name: string,
  code: string
}

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  name: string,
  options?: selectOptions[],
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  addedClasses?: string,
  errorMessage?: string,
  radioOptions?: radioOption[],
  value?: any,
  form?: FieldConfig,
  dateOptions?: any
}
