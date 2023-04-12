import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageHelperService } from '../transmit/local-storage-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _sessionService: LocalStorageHelperService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._sessionService.getStorageValue('csm') || this._sessionService.getStorageValue('signature_id') ) {
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }

}
