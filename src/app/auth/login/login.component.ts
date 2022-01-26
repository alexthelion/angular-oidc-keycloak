import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginFormGroup = new FormGroup({});
    if (!this.authService.hasValidIdToken()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login();
  }
}
