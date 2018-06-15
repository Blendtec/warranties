import { AbstractControl } from '@angular/forms';

export function RecaptchaValidator(control: AbstractControl): object | null {
  if (!control.value) {
    return { resolved: true };
  }

  return null;
}
