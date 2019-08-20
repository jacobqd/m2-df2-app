import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth/auth-service";
import {APP_ID} from "../constants";

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader: string = this.authService.getAccessToken();
    // Clone the request to add the new header.
    if (req.url.endsWith("/auth/token") || req.url.endsWith("json")) {
      // 如果是登录页面，不拦截添加token信息
      const authReq = req.clone({headers: req.headers.set('AIN', APP_ID)});
      return next.handle(authReq);
    } else {
      const authReq1 = req.clone({headers: req.headers.set('X-Token', authHeader)});
      const authReq2 = req.clone({headers: authReq1.headers.set('AIN', APP_ID)});
      return next.handle(authReq2);
    }
  }
}
