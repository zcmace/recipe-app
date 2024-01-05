import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth/auth.service';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  authObs: Observable<AuthResponseData>;
  @ViewChild(PlaceholderDirective, {static: true, read: ViewContainerRef}) alertHost: ViewContainerRef;

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
      this.router.navigate(['/recipes']);
    }, 
    error: (errorMessage: Error) => {
      this.showErrorAlert(errorMessage.message);
      this.isLoading = false;
    }, 
    complete: () => {
      this.isLoading = false;
    }});
    form.reset();
  }

  private showErrorAlert(message: string) {
    const alert = this.alertHost.createComponent(AlertComponent);
    alert.instance.message = message;
    alert.instance.close.pipe(take(1)).subscribe(() => {
      alert.destroy();
    })
  }
}
