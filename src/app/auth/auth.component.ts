import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errorMessage = '';

  authObs: Observable<AuthResponseData>;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    if (!this.isLoginMode) {
      this.isLoading = true;
      this.authObs = this.authService.signUp(value.email, value.password);
    } else {
      this.isLoading = true;
      this.authObs = this.authService.logIn(value.email, value.password);
    }

    this.authObs.subscribe({
    next: (resData) => {
      console.log(resData);
      this.isLoading = false;
      this.errorMessage = '';
      this.router.navigate(['/recipes']);
    }, 
    error: (errorMessage: Error) => {
      console.log(errorMessage.message)
      this.errorMessage = errorMessage.message;
      this.isLoading = false;
    }, 
    complete: () => {
      this.isLoading = false;
    }});
    form.reset();
  }

}
