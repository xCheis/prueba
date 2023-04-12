import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { BenefitsComponent } from './pages/benefits/benefits.component';
import { PromotionalCodeComponent } from './pages/promotional-code/promotional-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/guards/auth.guard';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { FadFrameComponent } from './pages/fad-frame/fad-frame.component';
import { VoucherFadComponent } from './pages/voucher-fad/voucher-fad.component';
import { MoreProductsAndBenefitsComponent } from './pages/more-products-and-benefits/more-products-and-benefits.component';
import { DatePipe } from '@angular/common';
import { BuroService } from './services/buro/buro.service';
import { LoaderOverlayService } from './services/loader-service/loader-overlay.service';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { OtherAppsComponent } from './pages/other-apps/other-apps.component';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { EnvConfigurationService } from './providers/env-configuration.service';
import { RSA } from './services/rsa/rsa.service';
import { resolveEnvironmentConfig } from './providers/environment-resolver';
import { HtmlTransmit } from './pipes/html-transmit.pipe';
import {MatButtonModule} from '@angular/material/button';
import { NonModalIconComponent } from 'src/app/shared/transmit-templates/non-modal-icon/non-modal-icon.component';
import {MatInputModule} from '@angular/material/input'
import { ExtractValuePipe } from './pipes/extract-value.pipe';
import { ModalError } from './shared/modal/modal-error';
import { ModalInfoComponent } from './shared/modal-info/modal-info.component';
import {loadSettings} from './utils/app-config-init';
import {loadData} from './utils/app-data-init';
import { IpResolverService } from './providers/ip-resolver.service';



const loadConfigJson = () => {
	return resolveEnvironmentConfig();
};

//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    BenefitsComponent,
    PromotionalCodeComponent,
    TermsConditionsComponent,
    FadFrameComponent,
    VoucherFadComponent,
    MoreProductsAndBenefitsComponent,
    OtherAppsComponent,
    FormatTimePipe,
    HtmlTransmit,
    NonModalIconComponent,
    ExtractValuePipe,
    ModalError,
    ModalInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    AuthGuard,
    DatePipe,
    BuroService,
    RSA,
    LoaderOverlayService,
    Overlay,
    [{
      provide: APP_INITIALIZER,
      useFactory:  loadSettings,
      deps:[EnvConfigurationService],
      multi: true
    }
    ],
    [{
      provide: APP_INITIALIZER,
      useFactory:  loadData,
      deps:[IpResolverService],
      multi: true
    }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
