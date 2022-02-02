import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthInfoEvent,
  OAuthService,
  OAuthSuccessEvent
} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private oauthService: OAuthService,
              private router: Router,
              @Inject('HOMEPAGE_PATH') private homepagePath: string) {
    this.configure();
    this.redirectOnCallback().subscribe();
  }

  private configure(): void {
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.hasValidIdToken()) {
        this.oauthService.loadUserProfile();
      }
    });
  }

  private getJwtAsObject(): any {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    return JSON.parse(atob(tokens[1]));
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
   * Extracts the JWT Issuer from the Keycloak generated access token
   */
  public getIssuer(): string {
    const claims = this.getJwtAsObject();
    return claims['iss'];
  }

  /**
   * Handle incoming events from keycloak
   */
  public redirectOnCallback(): Observable<any> {
    return this.oauthService.events.pipe(tap(event => {
      console.log(event);
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
        if (event.type === 'token_validation_error' || event.type === 'token_refresh_error') {
          this.logout();
        }
      } else if (event instanceof OAuthSuccessEvent) {
        if (event.type === 'token_received') {
          this.navigateToHomepage();
        }
      } else if (event instanceof OAuthInfoEvent) {
        if (event.type === 'token_expires') {
          console.info('token expires soon: ' + this.getTokenIdExpirationDate().toLocaleDateString());
        }
        if (event.type === 'logout') {
          console.warn('logout');
        }
      } else {
        console.warn(event);
      }
    }));
  }

  private navigateToHomepage(): void {
    this.router.navigate([this.homepagePath]);
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
   * Determines if the current user has a valid id token
   * Returns true if an IdToken exists and not expired within the session storage, false otherwise
   */
  public hasValidIdToken(): boolean {
    return this.oauthService.hasValidIdToken();
  }

  /**
   * Redirect to keycloak login page by client id
   */
  public login() {
    this.oauthService.initLoginFlow();
  }

  /**
   * Logout and clear storage
   */
  public logout(): void {
    this.oauthService.logOut();
  }

  /**
   * Refresh token request
   */
  public refreshToken(): void {
    this.oauthService.refreshToken();
  }
}
