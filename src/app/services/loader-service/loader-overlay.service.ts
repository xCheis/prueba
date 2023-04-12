import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { LoaderOverlayRef } from './loader-overlay-ref';
import { CONTAINER_DATA } from './loader-overlay.token';
import { LoaderOverlayAbstractionComponent } from 'src/app/shared/loader-overlay-abstraction/loader-overlay-abstraction.component';

export interface LoaderOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: LoaderOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'loader-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable({
  providedIn: 'root'
})
export class LoaderOverlayService {

  constructor(private overlay: Overlay, private _injector: Injector) { }

  open(title:string,message?: string, config: LoaderOverlayConfig = {}) {
    document.body.style.overflow = 'hidden'
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(dialogConfig);
    const dialogRef = new LoaderOverlayRef(overlayRef);
    const containerPortal = new ComponentPortal(
      LoaderOverlayAbstractionComponent,
      null,
      this.createInjector({
        message: message,
        title:title
      })
    );
    const component = overlayRef.attach(containerPortal);
    dialogRef.componentInstance = component.instance;

    return dialogRef;
  }

  private createInjector(dataToPass:any): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CONTAINER_DATA, dataToPass);
    return new PortalInjector(this._injector, injectorTokens);
  }

  private createOverlay(config: LoaderOverlayConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: LoaderOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
