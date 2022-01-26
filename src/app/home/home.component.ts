import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string = '';
  constructor(private authService: AuthService) {
    this.userName = this.authService.getUserName();
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
