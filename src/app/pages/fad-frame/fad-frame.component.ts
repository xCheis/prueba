import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '../../interfaces/environment.interface';
import { EnvConfigurationService } from 'src/app/providers/env-configuration.service';
import { environment } from 'src/environments/environment';
import { configurationSubject } from 'src/app/providers/environment-resolver';
import { LocalStorageHelperService } from 'src/app/services/transmit/local-storage-helper.service';


@Component({
  selector: 'app-fad-frame',
  templateUrl: './fad-frame.component.html',
  styleUrls: ['./fad-frame.component.scss']
})

export class FadFrameComponent implements OnInit {

 public ticket: SafeResourceUrl;
 private _environments;
  
  EVENT_MODULE = {
    PROCESS_INIT: "PROCESS_INIT",
    PROCESS_ERROR: "PROCESS_ERROR",
    PROCESS_COMPLETED: "PROCESS_COMPLETED",
    ENTRY_PATH: "ENTRY_PATH"
  }

  constructor(
    private route:ActivatedRoute, 
    private sanitizer:DomSanitizer,
    private router:Router,
    private _sessionService: LocalStorageHelperService) { 
      this._environments = configurationSubject.getValue();
  }
  
  ngOnInit(): void {
    let fullUrl: string = this._environments.fad + '/main?ticket=' + this._sessionService.getStorageValue('signature_id'); 
    this.ticket = this.sanitizer.bypassSecurityTrustResourceUrl( fullUrl );
  }

  @HostListener('window:message',['$event'])
  onMessage(event:any){
      if (event.data.event === this.EVENT_MODULE.PROCESS_INIT) {
        // only informative --- start process
      } else if (event.data.event === this.EVENT_MODULE.PROCESS_ERROR) {
        // restart component and send error
      } else if (event.data.event === this.EVENT_MODULE.PROCESS_COMPLETED) {
        // end of the process
        this.router.navigate(["/voucher"], {skipLocationChange: true});
      } else if (event.data.event === this.EVENT_MODULE.ENTRY_PATH) {
        // show current path
      }
  }

}

