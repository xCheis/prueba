import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RSA } from 'src/app/services/rsa/rsa.service';
import { LocalStorageHelperService } from 'src/app/services/transmit/local-storage-helper.service';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent  {

public benefitList = [
  'Obtendrás ofertas personalizadas',
  'Accederás a productos que respondan <br> mejor a tus necesidades',
  'Tendrás servicios adaptados a ti'
]

  constructor(private router:Router ) {
    
  }

  public goTo(e:boolean) {
    this.router.navigate(['promotional-code'])
  }

}
