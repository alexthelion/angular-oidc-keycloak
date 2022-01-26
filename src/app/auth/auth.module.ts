import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import {RouterModule, Routes} from '@angular/router';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {AuthService} from './auth.service';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://www.angular.at/api'],
        sendAccessToken: true,
      },
    }),
    RouterModule.forChild(routes),
    MdbFormsModule,
    MdbCheckboxModule
  ],
  providers: []
})
export class AuthModule {
}
