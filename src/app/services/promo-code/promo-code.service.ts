import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckBuroRequest, CheckBuroResponse } from 'src/app/interfaces/consulta-buro.interface';
import { configurationSubject } from 'src/app/providers/environment-resolver';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {

  private _environments;

  constructor(private http: HttpClient){
    this._environments = configurationSubject.getValue();
  }

  getUser(code: CheckBuroRequest) {    
    return this.http.post<CheckBuroResponse>( this._environments.consultaBuro.checkBuro, code );
  }

}
