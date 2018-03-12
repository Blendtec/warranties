import { IAddress } from './address.interface';
import { ISerial } from './serial.interface';
import { IPurchase } from './purchase.interface';

export class WarrantiesCommand {

  formData: any;

  constructor(formData: any) {
    this.formData = formData;
  }

  public toJSON() {
        return {
          'Warranty': {
            'first_name': this.formData.personal.value.firstName,
            'last_name': this.formData.personal.value.lastName,
            'street': this.formData.personal.value.address.one + ' ' + this.formData.personal.value.address.two,
            'zip_code': this.formData.personal.value.address.zip,
            'country': this.formData.personal.value.address.country,
            'phone_number': this.formData.personal.value.address.phone,
            'email_address': this.formData.personal.value.address.email,
            'preferred_contact_method': this.formData.personal.value.contact.contactMethod,
            'preferred_contact_time': this.formData.personal.value.contact.contactTime,
            'time_zone': this.formData.personal.value.contact.timeZone,
            'serial_number': this.formData.product.value.motorSerial.serialPrefix +
            '-' +
            this.formData.product.value.motorSerial.serialSuffix,
            'jar_size': this.formData.product.value.jar.jarSize,
            'jar_number': this.formData.product.value.jar.jarNumber,
            'description': this.formData.product.value.problemDescription,
            'jar_sounds': this.formData.additional.value.unusualSounds,
            'smooth_spinning': this.formData.additional.value.spinSmooth,
            'wiggle_shaft': this.formData.additional.value.shaftSecure,
            'leaky_jar': this.formData.additional.value.jarLeaking,
            'city': this.formData.personal.value.address.city,
            'state': this.formData.personal.value.address.stateProvince
          },
          'info': {
            'recaptcha': this.formData.additional.value.recaptcha,
            'blenderPurchaseLocationExplanation': this.formData.personal.value.purchase.place,
            'howToOwn': '',
            'whichProblem': this.formData.product.value.problemType,
            'purchaseLocationOtherExplanation': this.formData.personal.value.purchase.other,
            'startUsingBlender': this.formData.personal.value.purchase.date.formatted
          },
          'photos': {
            'serialnumber': this.formData.product.value.motorSerial.serialPhoto,
            'jarnumber': this.formData.product.value.jar.jarPhoto,
            'problem': this.formData.additional.value.problemPhoto,
            'receiptPhoto': this.formData.personal.value.receiptPhoto
          }
        };
      }
}

