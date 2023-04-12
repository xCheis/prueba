import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-apps',
  templateUrl: './other-apps.component.html',
  styleUrls: ['./other-apps.component.scss']
})
export class OtherAppsComponent {

  constructor(private router:Router) { }

  goTo(link:string) {
    this.router.navigate([link]);
  }

}
