import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {AuthService} from '../services/auth/auth-service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {M2Toast} from '../../layout/setting/m2.toast';

@Injectable({
    providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private m2Toast: M2Toast,
                private route: Router,
                private authService: AuthService) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError(
                    (error: any, caught: Observable<HttpEvent<any>>) => {
                        switch (error.status) {
                            case 401:
                                if (req.url.endsWith('/auth/token')) {
                                    // this.m2Toast.presentToast(error.error.message).then();
                                } else {
                                    // this._notification.create('error', '无权访问', '您的账号已在另一台设备或浏览器登录,请重新登录！');
                                    this.authService.clearToken();
                                    // this.confirmServ.warning({
                                    //   nzTitle: '无权访问',
                                    //   nzClosable: false,
                                    //   nzMaskClosable: false,
                                    //   nzContent: '您的账号已长时间未登录或其他浏览器登录，请重新登录！',
                                    //   nzOnOk: () => {
                                    //     this.route.navigate(["/login"]);
                                    //   }
                                    // });
                                }
                                break;
                            case 500:
                                // this._notification.create('error', '服务器错误', '错误代码500，服务器执行错误，请联系管理员！' + error.error.message);
                                // return of(new HttpResponse());
                                this.m2Toast.presentToast("错误代码500，服务器执行错误，请联系管理员！").then();
                                break;
                            case 404:
                                // this._notification.create('error', '请求地址错误', '错误代码404，请检查后台API地址是否正确！');
                                this.m2Toast.presentToast("错误代码404，请检查后台API地址是否正确！").then();
                                break;
                            case 0:
                                // this._notification.create('error', '服务器连接错误', '错误代码0，无法连接到服务器，请确认是否已经连接网络或稍后再试！');
                                this.m2Toast.presentToast("错误代码0，无法连接到服务器，请确认是否已经连接网络或稍后再试！").then();
                                break;
                            default:
                                // this._notification.create('error', '服务器错误', error.error.message);
                                this.m2Toast.presentToast("未知服务器错误！" + error.error.message).then();
                                break;
                        }
                        throw error;
                    }
                ),
            );
    }

}
