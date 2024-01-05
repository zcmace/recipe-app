import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../../auth/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  api_key = 'AIzaSyCqpnThfCnn6exgojN0GYPJeVsiTPOntWY';
  authRequest = Observable<AuthRequestData>;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  signUp(email: string, password: string) {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    const defaultErrorMessage = 'An error has occurred during Sign Up.';
    return this.makeAuthCall(url, email, password, defaultErrorMessage);
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);

  }

  logIn(email: string, password: string) {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    const defaultErrorMessage = 'An error has occurred during Log In.';
    return this.makeAuthCall(url, email, password, defaultErrorMessage);
  }


  handleError(errorRes, defaultErrorMessage) {
    let errorMessage = defaultErrorMessage;
        if (
          !errorRes.error ||
          !errorRes.error.error ||
          !errorRes.error.error.message
        ) {
          return throwError(() => new Error(errorMessage));
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'A user with that email exists already.';
            break;
          case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage =
              'A user with that email/password cannot be verified.';
            break;
        }
        return throwError(() => new Error(errorMessage));
  }

  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000
      );
      const user = new User(
        email,
        userId,
        token,
        expirationDate
      );
      this.user.next(user);
  }


  makeAuthCall(
    url: string,
    email: string,
    password: string,
    defaultErrorMessage: string
  ) {
    const paylaod = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponseData>(url + this.api_key, paylaod).pipe(
      catchError((error) => this.handleError(error, defaultErrorMessage)),
      tap((data: AuthResponseData) => {
       this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn);
      })
    );
  }
}

interface AuthRequestData {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
