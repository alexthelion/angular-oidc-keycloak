import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ApiService} from './api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string = '';
  response: string = '';
  constructor(private authService: AuthService,
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

  logout(): void {
    this.authService.logout();
  }
}
