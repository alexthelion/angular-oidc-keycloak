import {Component, OnDestroy, OnInit} from '@angular/core';
import {of} from "rxjs";
import {delay, tap} from "rxjs/operators";
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit, OnDestroy {

  private subscription: any;

  constructor(private authService: AuthService) { }

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
