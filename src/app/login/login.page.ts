import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastsService } from '../utils/toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastsService: ToastsService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(): Promise<void> {
    try {
      await this.authService.login(this.form.value.email, this.form.value.password);
      this.router.navigate(['/home']);
    } catch (error) {
      const message = error.error && error.error.message ? error.error.message : 'We could not process your request';
      await this.toastsService.presentToast(message, 'danger');
      console.error(error);
    }
  }
}
