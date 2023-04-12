import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ModalTransmitInfo } from 'src/app/interfaces/modal-transmit.interface';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})

export class ModalInfoComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<ModalInfoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ModalTransmitInfo) {
     bottomSheetRef.disableClose = true;
  }

  close(){
    this.bottomSheetRef.dismiss();
    this.data.submitBlock(-1);
  }
 
}
