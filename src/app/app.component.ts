import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs';
import { UnSubscriberComponent } from './shared/classes/unsubscriber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends UnSubscriberComponent implements OnInit {
  isAuth?: boolean;
  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => {
        this.activeRoute.firstChild?.url.subscribe((el) => {
          this.isAuth = el[0]?.path === 'auth';
        });
      });
  }
}
