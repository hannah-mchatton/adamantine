import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Adamantine';

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
    });
  }
}
