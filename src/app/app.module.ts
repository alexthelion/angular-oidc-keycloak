import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {AuthModule} from './auth/auth.module';
import {RedirectComponent} from './redirect/redirect.component';
import {OAuthStorage} from 'angular-oauth2-oidc';
import {authConfig} from './auth-config';
import {authModuleConfig} from './auth-module-config';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RedirectComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MdbCollapseModule,
    MdbDropdownModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(authConfig, authModuleConfig, storageFactory, '/home'),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
