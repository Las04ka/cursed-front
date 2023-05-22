import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UnSubscriberComponent } from 'src/app/shared/classes/unsubscriber';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends UnSubscriberComponent {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService,
    private router:Router,
  ) {
    super();
  }

  onSubmit(): void {
    this.authService
      .register(this.form.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (el) => {
          this.snackbar.openSnackBar('Успіх');
          localStorage.setItem('Authorization', el.accessToken);
          localStorage.setItem('Role', el.role);
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
