import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewsErrorsComponent } from './errors/views-errors.component';
import { LoaderOverlayAbstractionComponent } from './loader-overlay-abstraction/loader-overlay-abstraction.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { NonModalAuthenticateMenuComponent } from './transmit-templates/non-modal-authenticate-menu/non-modal-authenticate-menu.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    FormFieldComponent,
    SpinnerComponent,
    LoaderOverlayAbstractionComponent,
    ViewsErrorsComponent,
    NonModalAuthenticateMenuComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    FormFieldComponent,
    SpinnerComponent,
    ViewsErrorsComponent
  ]
})
export class SharedModule { }
