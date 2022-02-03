import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {AuthInterface, AuthServiceProvider} from '../auth/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string = '';
  response: string = '';
  constructor(@Inject('AuthServiceProvider') private authService: AuthInterface,
              private apiService: ApiService) {
    this.userName = this.authService.getUserName();
  }

  ngOnInit(): void {
  }

  testApi(): void {
    this.apiService.testApi().subscribe(result => {
      this.response = result;
    }, error => alert(error.error.error + ' - ' + error.error.status));
  }

  forbiddenTest(): void {
    this.apiService.forbiddenTestApi().subscribe(result => {
      this.response = result;
    }, error => alert(error.error.error + ' - ' + error.error.status));
  }
}
