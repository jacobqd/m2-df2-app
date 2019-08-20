import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Guard1 implements CanActivate ,  CanActivateChild {


  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const url: string = state.url;
    console.log("Guard1!canActivate");
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const url: string = state.url;
    console.log("Guard1!canActivateChild");
    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    console.log("Guard1:" + url);
    return new Promise<boolean>(resolve => {
      setTimeout(() => {resolve(true); }, 1000);
      // resolve(true);
    });
  }


}
