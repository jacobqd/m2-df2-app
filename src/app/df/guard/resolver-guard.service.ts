import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {MenuService} from "../core/services/menu/menu.service";
import {EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResolverGuardService implements Resolve<any> {

  constructor(private menuService: MenuService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return EMPTY;
  }
}
