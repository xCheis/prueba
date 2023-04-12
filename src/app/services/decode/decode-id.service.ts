import { Injectable } from '@angular/core';
import { configurationSubject } from 'src/app/providers/environment-resolver';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DecodeIDService {

  private _environments;
  private iterationCount = 100000;
  private keySize = 256;
  

  constructor() {
    this._environments = configurationSubject.getValue();
   }

   public decryptCrmId (crm_id: string) : string{
    
    try {

      let bytes: Uint8Array = new Uint8Array(atob(crm_id).split('').map(char=> char.charCodeAt(0)));
    
      let iv = bytes.slice(0,16);
      let salt = bytes.slice(16, 32);
      let cipherText = bytes.slice(32,48);
      let ivstring = btoa(String.fromCharCode(...iv));
      let saltstring = btoa(String.fromCharCode(...salt));
      let cipherTextstring = btoa(String.fromCharCode(...cipherText));
      
      let clave = CryptoJS.PBKDF2(
        CryptoJS.enc.Utf8.parse(this._environments.consultaBuro.secretKey), 
        CryptoJS.enc.Base64.parse(saltstring), {
        keySize: this.keySize / 32,
        iterations: this.iterationCount,
        hasher: CryptoJS.algo.SHA256
      });

      let textoPlano = CryptoJS.AES.decrypt(
        {ciphertext: CryptoJS.enc.Base64.parse(cipherTextstring)},
        clave,
        {
          iv: CryptoJS.enc.Base64.parse(ivstring)
        }
      );

      return textoPlano.toString(CryptoJS.enc.Utf8);

    }  catch {

      return "";

    } 
    
  
  }

}
