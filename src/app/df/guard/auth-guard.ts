import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild, UrlTree
} from '@angular/router';
import {AuthService} from "../core/services/auth/auth-service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate ,  CanActivateChild {


  constructor(private authService: AuthService,
              private auth: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.canActivate(route, state);
  }

  async checkLogin(url: string): Promise<boolean | UrlTree> {
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    try {
      await this.authService.ready();
      if (this.authService.isLogin()) {
        return true;
      } else {
        return this.router.parseUrl("/login");
      }
    } catch (e) {
      return this.router.parseUrl("/error");
    }
  }


}
