import {  Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ModalInfoComponent } from 'src/app/shared/modal-info/modal-info.component';
import { ModalError } from 'src/app/shared/modal/modal-error';

@Injectable({
  providedIn: 'root'
})
export class DynamicRenderService {

  public componentData :BehaviorSubject<any> = new BehaviorSubject(0);


  constructor( 
     private router: Router,
     private bottomSheet: MatBottomSheet
     ) { }

  loadComponent(form: string, extraInfo: any) {
    switch (form) {
      case 'non_modal_icon':
      this.componentData.next(extraInfo);
      this.router.navigate(['authentication-flow'],{ skipLocationChange:true});
        break;
      case 'non_modal_authenticate_menu':
        this.componentData.next(extraInfo);
        this.router.navigate(['authentication-otp'],{ skipLocationChange:true});
        break;
      default:
        return null;
    }
  }

  getComponentData(): Observable<any>{
    return this.componentData;
  }

  showModal(extraInfo: any){
    this.bottomSheet.open(ModalError, {
      data: extraInfo
    })
  }
  
  showModalInfo(extraInfo: any){
    this.bottomSheet.open( ModalInfoComponent, {
      data:extraInfo
    } )
  }

  showError(){
    this.router.navigate(['/errors'], {queryParams: {icon: 'wrongFlow'}, skipLocationChange:true});
  }

}
