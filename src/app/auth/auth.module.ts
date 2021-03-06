import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage} from 'angular-oauth2-oidc';
import {LogoutComponent} from './logout/logout.component';
import {RedirectComponent} from './redirect/redirect.component';
import {AuthRoutes} from './model/auth.routes';

const routes: Routes = [
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'callback',
    component: RedirectComponent
  }
]

@NgModule({
  declarations: [
    LogoutComponent,
    RedirectComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: []
})
export class AuthModule {
  static forRoot(authConfig: AuthConfig,
                 authModuleConfig: OAuthModuleConfig,
                 storageFactory: () => OAuthStorage,
                 authRoutesFactory: () => AuthRoutes): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useValue: authConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
        { provide: AuthRoutes, useFactory: authRoutesFactory },
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }
}
