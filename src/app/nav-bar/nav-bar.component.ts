import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onUserProfile() {
    if (!localStorage.getItem('Authorization'))
      this.router.navigateByUrl('auth/login');
    else {
      this.authService.logout()
    }
  }
}
