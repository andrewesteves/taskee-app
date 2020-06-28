import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { ToastController } from '@ionic/angular';
import { ToastsService } from '../utils/toasts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private toastsService: ToastsService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(): Promise<void> {
    try {
      await this.usersService.store(this.form.value);
      await this.toastsService.presentToast('Successfully registered!', 'success');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }
}
