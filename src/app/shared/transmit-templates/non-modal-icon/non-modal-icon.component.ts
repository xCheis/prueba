import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DynamicRenderService } from 'src/app/services/transmit/dynamic-render.service';


@Component({
  selector: 'app-non-modal-icon',
  templateUrl: './non-modal-icon.component.html',
  styleUrls: ['./non-modal-icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NonModalIconComponent implements OnInit {

  public data: any;
  public templateText: any;
  public key;
  public activeResend;
  private timeOutResendButton;

  constructor(
    private _dynamicRender: DynamicRenderService, private _router: Router) {
      this.key = "";
      this.activeResend = false;
      this._dynamicRender.componentData.subscribe(template => {
      this.data = template;
      this.templateText = { ...this.data.actions_strings };
      if (this.templateText.active_resend) {
        this.timeOutResendButton = this.setTimer();
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('popstate', () => {
      if(this.templateText.button_back){
        this.data.transmitCancel(this.templateText.button_back.reply);
      }
    }) 
  }

  public ContinueEvent(value: string) {
    this.key = "";
    this.forceActive();
    this.data.transmitContinue(value);
  }

  public CancelEvent(value: string) {
    this.data.transmitCancel(value);
  }

  public ResendEvent() {
    this.key = "";
    this.data?.transmitResend();
    this.activeResend = false;
    this.timeOutResendButton = this.setTimer();
  }

  private forceActive() {
    if(this.templateText.active_resend){
      this.activeResend = true;
      clearTimeout(this.timeOutResendButton);
    }
  }

  private setTimer(){
    return setTimeout(() => {
      this.activeResend = true;
    }, this.templateText.active_resend);
  }
}
