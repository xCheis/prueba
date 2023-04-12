import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHelperService {

  public getStorageValue(key: string) {
    return sessionStorage.getItem(key);
  }

  public setStorageValue(key: string, value: string) {
    sessionStorage.setItem(key, value);
    return value;
  }

  public clearStorage() {
    sessionStorage.clear();
  }

  public deleteValue(key: string) {
    sessionStorage.removeItem(key);
  }

}
