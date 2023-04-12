import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidateBuroRequest, ValidateBuroResponse } from 'src/app/interfaces/consulta-buro.interface';
import { configurationSubject } from 'src/app/providers/environment-resolver';
import { DecodeIDService } from '../decode/decode-id.service';
import { LocalStorageHelperService } from '../transmit/local-storage-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateCsmService {

  private _environments;

  constructor(
    private http: HttpClient, 
    private _sessionService: LocalStorageHelperService,
    private _decryptService: DecodeIDService){
    this._environments = configurationSubject.getValue();
  }

  validateCSM( csmData : ValidateBuroRequest){
    


    return this.http.post<ValidateBuroResponse>(this._environments.consultaBuro.validateBuro,csmData );
  }


}
