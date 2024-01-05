import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../../auth/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any

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
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
    }
  }

  logIn(email: string, password: string) {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    const defaultErrorMessage = 'An error has occurred during Log In.';
    return this.makeAuthCall(url, email, password, defaultErrorMessage);
  }


  autoLogin() {
    const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')); 
    if (!userData) {
        return
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogOut(expirationDuration)
    }

  }

  autoLogOut(expriationDuration: number) {
    console.log(expriationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
        this.logOut();
    }, expriationDuration);
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
      this.autoLogOut(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
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
