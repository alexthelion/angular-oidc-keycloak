import {Component, Inject, Injector, OnInit} from '@angular/core';
import {Router} from '@angular/router';

export interface AuthService {
   login(): void;

   hasValidIdToken(): boolean;
 }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(@Inject('AuthServiceProvider') private authService: AuthService,
              private injector: Injector,
              private router: Router) {
    if (this.authService.hasValidIdToken()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login();
  }
}
