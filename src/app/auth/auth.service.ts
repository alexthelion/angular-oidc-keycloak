import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthConfig, NullValidationHandler, OAuthErrorEvent, OAuthService, OAuthSuccessEvent, OAuthInfoEvent} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8180/auth/realms/master',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/callback',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'sample-client',
  loginUrl: window.location.origin + '/login',
  logoutUrl: window.location.origin + '/logout',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email offline_access',
  requireHttps: false,
  sessionChecksEnabled: false,
  showDebugInformation: true,
  disableAtHashCheck: true,
  // clockSkewInSec: 1
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private oauthService: OAuthService,
              private router: Router) {
    this.configure();
  }

  /**
   * Redirect to keycloak login page by client id
   */
  public login() {
    this.oauthService.initCodeFlow();
  }

  /**
   * Logout and clear storage
   */
  public logout(): void {
    this.oauthService.logOut();
  }

  private configure() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.hasValidIdToken()) {
        this.oauthService.loadUserProfile();
      }
    });
  }

  public redirectOnCallback(): void {
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
        if (event.type === ('token_validation_error'  || 'token_refresh_error')) {
          this.logout();
        }
      } else if (event instanceof OAuthSuccessEvent) {
        if (event.type === 'token_received') {
          this.router.navigateByUrl('/home');
        }
      } else if (event instanceof OAuthInfoEvent) {
        if (event.type === 'token_expires') {
          console.info('token expires soon: ' + this.getTokenIdExpirationDate().toLocaleDateString());
        }
        if (event.type === 'logout') {
          this.router.navigateByUrl('/home');
        }
      }  else {
        console.warn(event);
      }
    });
  }

  /**
   * Extract the username from the Keycloak generated access token (JWT)
   */
  public getUserName(): string {
    return this.getJwtAsObject().preferred_username;
  }

  /**
   * Extract the expiration date of id token
   */
  public getTokenIdExpirationDate(): Date {
    return new Date(this.oauthService.getIdTokenExpiration());
  }

  /**
   * Extract the roles from the realm_access claim within the Keycloak generated access token (JWT)
   */
  public getClaims(): string[] {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    const claims = JSON.parse(atob(tokens[1]));
    return claims.realm_access.roles;
  }

  /**
   * Extracts the OpenID Connect clientId from the Keycloak generated access token (JWT)
   */
  public getClientId(): string {
    const claims = this.getJwtAsObject();
    return claims['azp'];
  }

  /**
   * Extracts the JWT Issuer from the Keycloak generated access token
   */
  public getIssuer(): string {
    const claims = this.getJwtAsObject();
    return claims['iss'];
  }

  private getJwtAsObject(): any {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    return JSON.parse(atob(tokens[1]));
  }

  /**
   * Determines if the current user has a valid id token
   * Returns true if an IdToken exists and not expired within the session storage, false otherwise
   */
  public hasValidIdToken(): boolean {
    return this.oauthService.hasValidIdToken();
  }

}
