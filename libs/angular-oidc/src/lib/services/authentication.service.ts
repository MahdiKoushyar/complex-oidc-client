import { Injectable } from '@angular/core';
import { User, UserManager, WebStorageStateStore } from 'oidc-client';
import { UserManagerSettings } from '../models';
import devData from './../../../../shared/assets/config/production.json';

@Injectable()
export class AuthenticationService {
  isUserDefined = false;
  private _user: User | null;
  private _userManager: UserManager;

  isLoggedIn() {
    return this._user != null && !this._user.expired;
  }

  getAccessToken() {
    return this._user ? this._user.access_token : '';
  }

  getClaims() {
    return this._user?.profile;
  }

  startAuthentication(): Promise<void> {
    this.getUserManager();
    return this._userManager.signinRedirect();
  }

  completeAuthentication() {
    this.getUserManager();
    return this._userManager.signinRedirectCallback().then((user) => {
      this._user = user;
      this.isUserDefined = true;
    });
  }

  startLogout(): Promise<void> {
    this.getUserManager();
    return this._userManager.signoutRedirect();
  }

  completeLogout() {
    this.getUserManager();
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  silentSignInAuthentication() {
    this.getUserManager();
    return this._userManager.signinSilentCallback();
  }

  private getUserManager() {
    if (!this._userManager) {
      const userManagerSettings: UserManagerSettings =
        new UserManagerSettings();
      //set up settings
      userManagerSettings.authority = devData.apiEndpoint.authApi; //website that responsible for Authentication
      userManagerSettings.client_id = devData.oidc.client_id; //uniqe name to identify the project
      userManagerSettings.response_type = devData.oidc.response_type; //desired Authentication processing flow - for angular is sutible code flow
      //specify the access privileges, specifies the information returned about the authenticated user.
      userManagerSettings.scope = devData.oidc.scope;
      userManagerSettings.useRefreshToken = true;
      userManagerSettings.silentRenew = true;
      userManagerSettings.ignoreNonceAfterRefresh = true;
      userManagerSettings.redirect_uri = `${window.origin}/login-callback`; //start login process
      userManagerSettings.post_logout_redirect_uri = `${window.origin}/logout-callback`; //start logout process
      userManagerSettings.automaticSilentRenew = true;
      userManagerSettings.silent_redirect_uri = `${window.origin}/silent-callback`; //silent renew oidc doing it automaticly
      userManagerSettings.userStore = new WebStorageStateStore({
        store: window.localStorage,
      }); // store information about Authentication in localStorage
      this._userManager = new UserManager(userManagerSettings);
      this._userManager.getUser().then((user) => {
        this._user = user;
        this.isUserDefined = true;
      });
    }
  }
}
