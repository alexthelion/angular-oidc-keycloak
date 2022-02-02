import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
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
