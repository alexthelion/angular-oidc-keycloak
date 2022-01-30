import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from "@angular/router";
import {of} from "rxjs";
import {delay, first, tap} from "rxjs/operators";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit, OnDestroy {

  private subscription: any;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = of('').pipe(
      delay(700),
      tap(() => this.authService.logout())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
