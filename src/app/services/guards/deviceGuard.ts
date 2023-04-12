import {Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DeviceDetectorService} from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
})
export class DeviceGuard implements CanActivate{

    isDesktop: boolean;

    constructor(private _deviceService: DeviceDetectorService, private router: Router){

    }

    canActivate():boolean {
        this.isDesktop = this._deviceService.isDesktop();
        if (this.isDesktop){
            this.router.navigate(['/errors'], { queryParams: { icon: 'NoMobile' }, skipLocationChange: true });
            return false;
        }
        return true;
    }

}