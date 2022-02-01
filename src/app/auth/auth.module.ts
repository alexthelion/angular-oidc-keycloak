import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {OAuthModule} from 'angular-oauth2-oidc';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../environments/environment';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.api_url],
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
