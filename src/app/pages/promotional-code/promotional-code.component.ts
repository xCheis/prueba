import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DecodeIDService } from 'src/app/services/decode/decode-id.service';
import { BuroService } from 'src/app/services/buro/buro.service';
import { LoaderOverlayService } from 'src/app/services/loader-service/loader-overlay.service';
import { PromoCodeService } from 'src/app/services/promo-code/promo-code.service';
import { RSA } from 'src/app/services/rsa/rsa.service';
import { LocalStorageHelperService } from 'src/app/services/transmit/local-storage-helper.service';
import { TransmitService } from 'src/app/services/transmit/transmit.service';


@Component({
  selector: 'app-promotional-code',
  templateUrl: './promotional-code.component.html',
  styleUrls: ['./promotional-code.component.scss']
})
export class PromotionalCodeComponent {

  public data: any;
  public templateText: any;
  public code = '';
  public isError = false;
  private overlayRef;
  private permisoGeolocation;

  constructor(
    private router: Router,
    private promoCodeService: PromoCodeService,
    private overlayService: LoaderOverlayService,
    private countService: BuroService,
    private _transmitService: TransmitService,
    private _sessionService: LocalStorageHelperService,
    private _rsaService: RSA,
    private _decryptService: DecodeIDService
  ) {
    
    _transmitService.cancelFlow();
    this.getPermissions();
    _sessionService.deleteValue('csm');
    _sessionService.deleteValue('code');
    _sessionService.deleteValue('crm_id');
    _sessionService.deleteValue('crm_result');
    _rsaService.getGeolocation();
  }


  public goTo(e: boolean) {


    this.overlayRef = this.overlayService.open('Espera un poco', 'Estamos trabajando en tu solicitud.');

    if (this.permisoGeolocation === 'granted') {
      this.getCodeFlow();
    } else {
      this.router.navigate(['/errors'], { queryParams: { icon: 'permissions' }, skipLocationChange: true });
      this.overlayRef.close();
    }

  }

  private getCodeFlow() {
    this.promoCodeService.getUser({ code: this.code, additional_data: { code: this.code } }).subscribe(data => {

      this._sessionService.setStorageValue('csm', data.csm_id);
      this._sessionService.setStorageValue('code', data.csm_id);
      this._sessionService.setStorageValue('crm_id', data.crm_id);

      this._transmitService.initTransmit(data.csm_id, this._decryptService.decryptCrmId(data.crm_id));

      this.overlayRef.close();

    }, (error) => {

      this.getError(error);

    });

  }

  private getError(error) {

    if (error.status === 400) {

      this.overlayRef.close();

      if (this.countService.countTryCodePromo < 2) {
        this.countService.countTryCodePromo += 1;
        this.router.navigate(['/errors'], { queryParams: { icon: 'invalid-code' }, skipLocationChange: true });
      } else {
        this.router.navigate(['/errors'], { queryParams: { icon: 'exceeded' }, skipLocationChange: true });
      }

      return null;
    }

    this.router.navigate(['/errors'], { queryParams: { icon: 'wrongFlow' }, skipLocationChange: true });
    this.overlayRef.close();

  }

  private getPermissions() {
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      this.permisoGeolocation = result.state;

      result.onchange = () => {
        this.permisoGeolocation = result.state;
        if (result.state === 'granted') {
          this._rsaService.getGeolocation();
        }
      }

    });
  }

}
