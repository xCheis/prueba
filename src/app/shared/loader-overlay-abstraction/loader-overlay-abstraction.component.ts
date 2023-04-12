import { Component, Inject, Optional } from '@angular/core';
import { CONTAINER_DATA } from '../../services/loader-service/loader-overlay.token';

@Component({
  selector: 'app-loader-overlay-abstraction',
  templateUrl: './loader-overlay-abstraction.component.html',
  styleUrls: ['./loader-overlay-abstraction.component.scss']
})
export class LoaderOverlayAbstractionComponent {

  public title = ''; 
  public message = ''; 


  constructor(@Optional() @Inject(CONTAINER_DATA) data: any ) {
    if (data && data.message && data.message !== '') {
      this.message = data.message
    }
    if (data && data.title && data.title !== '') {
      this.title = data.title
    }
  }

}
