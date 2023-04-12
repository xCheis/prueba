import { OverlayRef } from '@angular/cdk/overlay';
import { LoaderOverlayAbstractionComponent } from 'src/app/shared/loader-overlay-abstraction/loader-overlay-abstraction.component';

export class LoaderOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  public componentInstance: LoaderOverlayAbstractionComponent;

  close(): void {
      document.body.style.overflow = 'none';
    this.overlayRef.dispose();
  }

  setMessage(message: string): void {
    this.componentInstance.message = message;
  }
}
