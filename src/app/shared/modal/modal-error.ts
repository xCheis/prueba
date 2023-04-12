import {Component, inject, Inject} from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ModalTransmit} from 'src/app/interfaces/modal-transmit.interface';

@Component({
  selector: 'modal-error',
  templateUrl: 'modal-error.html',
  styleUrls: ['modal-error.scss']
})
export class ModalError {
    
  constructor(private bottomSheetRef: MatBottomSheetRef<ModalError>,
     @Inject(MAT_BOTTOM_SHEET_DATA) public data: ModalTransmit) {
      bottomSheetRef.disableClose = true;
  }

  goTo(value: string){
    this.bottomSheetRef.dismiss();
    this.data.transmitContinue(value);
  }

  cancelEvent(value: string){
    this.bottomSheetRef.dismiss();
    this.data.transmitCancel(value);
  }
  

}