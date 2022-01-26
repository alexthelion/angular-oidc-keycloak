import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from './auth.service';
import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.hasValidIdToken()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
