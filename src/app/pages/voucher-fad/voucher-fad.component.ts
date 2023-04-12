import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-voucher-fad',
  templateUrl: './voucher-fad.component.html',
  styleUrls: ['./voucher-fad.component.scss']
})
export class VoucherFadComponent implements OnInit {

  public pathRepeat: Array<number>;
  public numberSawtooth:number[] = [];
  public showMore = false;
  public voucherExitMove = '';
  public reference = {};
  public creationDate: string | null;
  public availableData: string | null;
  public codeAbaSwift: string;
  public country: string;
  public date: String = new Date().toLocaleString();

   constructor(private router: Router, private datePipe: DatePipe, private route:ActivatedRoute) {
    this.resizeWindow();
}

ngOnInit() {
  this.route.params.subscribe((response:any) => {
    response = null;
      if (response && response!== null) {
          this.registerData = response;
          this.reference = this.registerData.references[0];
          this.creationDate = this.datePipe.transform(this.registerData.creation_date, 'dd/MMM/yy - HH:mm:ss');
          this.availableData = this.datePipe.transform(this.registerData.available_date, 'HH:mm');
          this.codeAbaSwift = response.codeAbaSwift;
      }
  });
}



/**
 * Input to pass the Beneficiary's Discharge response to the view.
 *
 * @type {*}
 * @memberof VoucherBeneficiariesComponent
 */
@Input() registerData: any;
/**
 * Function that paints the triangles of the proof design.
 *
 * @memberof VoucherBeneficiariesComponent
 */
public resizeWindow() {
    for (let x = Math.trunc(window.innerWidth / 28) + 5; x--;){
      this.numberSawtooth.push(x);
    }
}

/**
 *
 * Function that is triggered when the animation is over and the receipt is closed, navigate to the next view.
 * @param {*} event
 * @memberof VoucherBeneficiariesComponent
 */
public close(event: any) {
    if (event.totalTime) {
        this.router.navigate(['my-life/my-life-view']);
    }
}
/**
 * Initialisation of the OnInit life cycle.
 *
 * @memberof VoucherBeneficiariesComponent
 */


}

