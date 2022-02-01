import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage} from 'angular-oauth2-oidc';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogoutComponent} from './logout/logout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    RouterModule.forChild(routes),
    MdbFormsModule,
    MdbCheckboxModule
  ],
  providers: []
})
export class AuthModule {
  static forRoot(authConfig: AuthConfig, authModuleConfig: OAuthModuleConfig, storageFactory: () => OAuthStorage):
    ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useValue: authConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }
}
