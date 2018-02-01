import { IAddress } from './address.interface';
import { ISerial } from './serial.interface';
import { IPurchase } from './purchase.interface';
import { IContact } from './contact.interface';

export interface IPersonal {
  firstName: string;
  lastName: string;
  address: IAddress;
  serial: ISerial;
  contact: IContact;
  purchase: IPurchase;
  receiptPhoto: object;
}
