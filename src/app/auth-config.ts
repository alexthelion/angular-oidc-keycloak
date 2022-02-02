import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8180/auth/realms/master',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/callback',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'sample-client',
  loginUrl: window.location.origin + '/login',
  logoutUrl: window.location.origin + '/logout',
  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  postLogoutRedirectUri: window.location.origin + '/login',

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
  showDebugInformation: true,

  // If true, the lib will try to check whether the user is still logged in on a regular basis
  sessionChecksEnabled: true,
  // sessionCheckIntervall: 1000,
  disableAtHashCheck: true,
  // clockSkewInSec: 1
};
