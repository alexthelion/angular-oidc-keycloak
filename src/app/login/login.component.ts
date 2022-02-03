import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthInterface, AuthServiceProvider} from '../auth/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(AuthServiceProvider) private authService: AuthInterface,
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
