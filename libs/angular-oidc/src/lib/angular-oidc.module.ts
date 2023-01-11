import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards';
import { AuthInterceptor } from './interceptors';
import {
  AuthenticationService,
  AuthUrlConstantServiceToken,
  AUTH_URL_SERVICE,
} from './services';
import {
  LoginCallbackComponent,
  LogoutCallbackComponent,
  SilentCallbackComponent,
} from './components';

@NgModule({
  declarations: [
    LoginCallbackComponent,
    LogoutCallbackComponent,
    SilentCallbackComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [
    AuthGuard,
    AuthenticationService,
    AuthUrlConstantServiceToken,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: AUTH_URL_SERVICE, // That's the token we defined previously
      useClass: AuthUrlConstantServiceToken, // That's the actual service itself
    },
  ],
  exports: [
    LoginCallbackComponent,
    LogoutCallbackComponent,
    SilentCallbackComponent,
  ],
})
export class AngularOidcModule {}
