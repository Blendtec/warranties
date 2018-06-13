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
      'firstName': this.formData.personal.value.firstName,
      'lastName': this.formData.personal.value.lastName,
      'street': this.formData.personal.value.address.one + ' ' + this.formData.personal.value.address.two,
      'city': this.formData.personal.value.address.city,
      'state': this.formData.personal.value.address.stateProvince,
      'zipCode': this.formData.personal.value.address.zip,
      'country': this.formData.personal.value.address.country,
      'phoneNumber': this.formData.personal.value.address.phone,
      'emailAddress': this.formData.personal.value.address.email,
      'contactMethod': this.formData.personal.value.contact.contactMethod,
      'contactTime': this.formData.personal.value.contact.contactTime,
      'timeZone': this.formData.personal.value.contact.timeZone,
      'serialNumber': this.formData.product.value.motorSerial.serialPrefix +
        '-' +
        this.formData.product.value.motorSerial.serialSuffix,
      'jarSize': this.formData.product.value.jar.jarSize,
      'jarNumber': this.formData.product.value.jar.jarNumber,
      'jarNumberImage': this.formData.product.value.jar.jarPhoto,
      'description': this.formData.product.value.problemDescription,
      'whichProblem': this.formData.product.value.problemType,
      'hasUnusualSounds': this.formData.additional.value.unusualSounds,
      'isSmoothSpinning': this.formData.additional.value.spinSmooth,
      'isShaftSecure': this.formData.additional.value.shaftSecure,
      'isLeakingJar': this.formData.additional.value.jarLeaking,
      'purchasePlace': this.formData.personal.value.purchase.place,
      'howToOwn': '',
      'purchaseOther': this.formData.personal.value.purchase.other,
      'purchaseDate': new Date(this.formData.personal.value.purchase.date.formatted)
        .toISOString(),
      'serialImage': this.formData.product.value.motorSerial.serialPhoto,
      'problemImage': this.formData.additional.value.problemPhoto,
      'receiptImage': this.formData.personal.value.receiptPhoto,
      'recaptcha': this.formData.additional.value.recaptcha
    };
  }
}

