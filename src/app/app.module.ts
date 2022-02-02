import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {AuthModule} from './auth/auth.module';
import {OAuthStorage} from 'angular-oauth2-oidc';
import {authConfig} from './auth-config';
import {authModuleConfig} from './auth-module-config';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginModule} from './login/login.module';
import {AuthRoutes} from './auth/model/auth.routes';

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export function authRoutesFactory(): AuthRoutes {
  return new AuthRoutes('/home');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MdbCollapseModule,
    MdbDropdownModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(authConfig, authModuleConfig, storageFactory, authRoutesFactory),
    LoginModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
