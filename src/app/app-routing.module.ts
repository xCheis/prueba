import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenefitsComponent } from './pages/benefits/benefits.component';
import { FadFrameComponent } from './pages/fad-frame/fad-frame.component';
import { MoreProductsAndBenefitsComponent } from './pages/more-products-and-benefits/more-products-and-benefits.component';
import { OtherAppsComponent } from './pages/other-apps/other-apps.component';
import { PromotionalCodeComponent } from './pages/promotional-code/promotional-code.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { VoucherFadComponent } from './pages/voucher-fad/voucher-fad.component';
import { AuthGuard } from './services/guards/auth.guard';
import { DeviceGuard } from './services/guards/deviceGuard';
import { ViewsErrorsComponent } from './shared/errors/views-errors.component';
import { NonModalAuthenticateMenuComponent } from './shared/transmit-templates/non-modal-authenticate-menu/non-modal-authenticate-menu.component';
import { NonModalIconComponent} from './shared/transmit-templates/non-modal-icon/non-modal-icon.component'

const routes: Routes = [
  {
    path:'', component: BenefitsComponent,  canActivate: [DeviceGuard]
  },
  {
   path: 'authentication-flow', component: NonModalIconComponent, canActivate: [AuthGuard, DeviceGuard]
  },
  {
    path: 'authentication-otp', component: NonModalAuthenticateMenuComponent, canActivate: [AuthGuard, DeviceGuard]
  },
  {
    path:'promotional-code', component: PromotionalCodeComponent, canActivate: [DeviceGuard]
  },
  {
    path:'terms-conditions', component: TermsConditionsComponent, canActivate: [AuthGuard, DeviceGuard]
  },
  {
    path:'FAD', component: FadFrameComponent, canActivate: [AuthGuard, DeviceGuard]
  },
  {
    path:'voucher', component: VoucherFadComponent, canActivate: [AuthGuard, DeviceGuard]
  },
  {
    path:'more-benefits', component: MoreProductsAndBenefitsComponent, canActivate: [AuthGuard, DeviceGuard]
  },
  {
    path:'other-pages', component: OtherAppsComponent, canActivate: [AuthGuard, DeviceGuard]
  },
  {
    path:'errors', component: ViewsErrorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
