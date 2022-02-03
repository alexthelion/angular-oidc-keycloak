import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const AuthServiceProvider = new InjectionToken('AuthServiceProvider');

export interface AuthInterface {
  /**
   * Extract the username from the Keycloak generated access token (JWT)
   */
  getUserName(): string;

  /**
   * Extract the expiration date of id token
   */
  getTokenIdExpirationDate(): Date;

  /**
   * Extracts the JWT Issuer from the Keycloak generated access token
   */
  getIssuer(): string;

  /**
   * Handle incoming events from keycloak
   */
  redirectOnCallback(): Observable<any>;

  /**
   * Extract the roles from the realm_access claim within the Keycloak generated access token (JWT)
   */
  getClaims(): string[];

  /**
   * Extracts the OpenID Connect clientId from the Keycloak generated access token (JWT)
   */
  getClientId(): string;

  /**
   * Determines if the current user has a valid id token
   * Returns true if an IdToken exists and not expired within the session storage, false otherwise
   */
  hasValidIdToken(): boolean;

  /**
   * Redirect to keycloak login page by client id
   */
  login(): void;

  /**
   * Logout and clear session
   */
  logout(): void;

  /**
   * Refresh token request
   */
  refreshToken(): void;
}
