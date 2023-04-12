import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { LoaderOverlayService } from 'src/app/services/loader-service/loader-overlay.service';
import { ValidateCsmService } from 'src/app/services/validate-csm/validate-csm.service';
import { LocalStorageHelperService } from 'src/app/services/transmit/local-storage-helper.service';
import { BuroService } from 'src/app/services/buro/buro.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  checkTerms: boolean = false;
  termsText: string = 'AUTORIZACIÓN DE CONSULTA A LAS SOCIEDADES DE INFORMACIÓN CREDITICIA. Autorizo a Banco Santander México, S.A., Institución de Banca Múltiple, Grupo Financiero Santander México, y/o las entidades que formen parte del Grupo Financiero al que pertenece, a realizar investigaciones y consultas periódicas sobre mi comportamiento crediticio a través de Sociedades de Información Crediticia así como a compartir dicha información entre las entidades mencionadas. Manifiesto libremente que conozco la naturaleza y alcance de la información que se solicitará o proporcionará en su caso, consintiendo que esta autorización se encuentre vigente por un periodo de tres años, contados a partir de la fecha de esta solicitud y en todo caso durante el tiempo que mantenga relación jurídica con el Banco y/o las entidades indicadas. ';

  constructor(
    private router: Router,
    private _validateService: ValidateCsmService,
    private overlayService: LoaderOverlayService,
    private _sessionService: LocalStorageHelperService,
    private _buroSerice: BuroService) {}

  ngOnInit(): void {
    const overlayRef = this.overlayService.open('Espera un poco', 'Estamos trabajando en tu solicitud.');
    this._validateService.validateCSM(
      {
        csm_id: this._sessionService.getStorageValue('csm_result'),
        crm_id: this._sessionService.getStorageValue('crm_id')
      }
    ).subscribe(response => {
      if (response.signatureId) {
        this._sessionService.setStorageValue('signature_id', response.signatureId)
      } else {
        this.router.navigate(['/errors'], { queryParams: { icon: 'wrongFlow' }, skipLocationChange: true });
      }
      this._sessionService.deleteValue('csm');
      this._sessionService.deleteValue('csm_result');
      overlayRef.close();
    }, error => {
      this._sessionService.clearStorage();
      this.router.navigate(['/errors'], { queryParams: { icon: 'wrongFlow' }, skipLocationChange: true });
      overlayRef.close();
    });

  }

  public goTo(e: boolean) {
    this.router.navigate(['/FAD'], { skipLocationChange: true });

  }

  public backTo() {
    this._sessionService.clearStorage();
    this.router.navigate(['/']);
  }

  public downloadFile(){
    this._buroSerice.downloadsTermsPDF();
  }

}
