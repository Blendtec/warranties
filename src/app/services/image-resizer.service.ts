import { Injectable } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Injectable()
export class ImageResizerService {

  constructor(private ng2ImgMax: Ng2ImgMaxService) { }

  resizeImage(image, callback) {
       this.ng2ImgMax.resizeImage(image, 800, 800).subscribe(
         result => {
         callback(result);
        },
        error => {
         callback(false);
        }
       );
  }

  disabledButtonColor(resizing: boolean): string {
    if (resizing) {
      return 'grey';
    }
    return null;
  }

}
