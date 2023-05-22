import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UnSubscriberComponent } from 'src/app/shared/classes/unsubscriber';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends UnSubscriberComponent {
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService,
    private router: Router,
  ) {
    super();
  }
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  onSubmit(): void {
    this.authService
      .login({
        email: this.email.value,
        password: this.password.value,
      })
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (el)=>{
          this.snackbar.openSnackBar('Успіх');
          localStorage.setItem('Authorization', el.accessToken);
          localStorage.setItem('Role', el.role)
          this.router.navigateByUrl('');
        },
        (error) => {
          this.snackbar.openSnackBar(error.error.message);
        },
      );
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
}
