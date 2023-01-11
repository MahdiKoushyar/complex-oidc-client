import { Injectable, InjectionToken } from '@angular/core';
@Injectable()
export class AuthUrlConstantServiceToken implements IAuthUrlConstantService {
  getServiceName(): string {
    return '';
  }
  getAuthSuccessCallbackRedirectUrl(): string {
    return '';
  }
  getLogoutCallBackRedirectUrl(): string {
    return '';
  }
}

export const AUTH_URL_SERVICE = new InjectionToken<IAuthUrlConstantService>(
  'IUrlConstantService injection token'
);

export interface IAuthUrlConstantService {
  getServiceName(): string;
  getAuthSuccessCallbackRedirectUrl(): string;
  getLogoutCallBackRedirectUrl(): string;
}
