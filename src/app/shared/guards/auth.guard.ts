import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  canActivate(): boolean {
    const token = this.localStorageService.getData('Authorization');
    if (!token) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }
}
