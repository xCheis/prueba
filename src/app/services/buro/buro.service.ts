import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class BuroService {
  private _countTryCodePromo = 0;

  constructor(private http: HttpClient){

  }

  @Input()
  public get countTryCodePromo() {
    return this._countTryCodePromo;
  }

  
  public set countTryCodePromo(value: number) {
    this._countTryCodePromo = value;
    if(this._countTryCodePromo > 2) {
      this._countTryCodePromo = 0;
    }
  }

  public downloadsTermsPDF(){

    if (environment.production){
      this.http.get(environment.getTermsPdf, {responseType: 'blob'}).subscribe(
        (archi: Blob) => {
          saveAs(archi, "AvisoDePrivacidad.pdf");
        });      
    } else {
      console.log("Method no implemented")
    }

  }

  private dummyMethod(){
    console.log("Method no implemented")
  }

}
