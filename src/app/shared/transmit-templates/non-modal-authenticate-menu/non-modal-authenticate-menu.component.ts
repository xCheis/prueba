import { Component, ViewEncapsulation} from '@angular/core';
import { DynamicRenderService } from 'src/app/services/transmit/dynamic-render.service';

@Component({
  selector: 'app-non-modal-authenticate-menu',
  templateUrl: './non-modal-authenticate-menu.component.html',
  styleUrls: ['./non-modal-authenticate-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NonModalAuthenticateMenuComponent  {

  public otpMethod: string;
  private data;
  public templateText;
  public textInfo;

  constructor(
    private _dynamicRender: DynamicRenderService) {
      this._dynamicRender.componentData.subscribe( template => {
        this.data=template;
        this.templateText = { ...this.data.actions_strings }
      });    
    }


  selectedOtpMethod(data:string, i: number){
    this.otpMethod = data;
    this.textInfo = this.templateText?.menu_items[i];
  }

  ContinueEvent(response: string){
    this.data.transmitContinue(response);    
  }

  CancelEvent(response: string){
    this.data.transmitCancel(response);
  }
  

}
