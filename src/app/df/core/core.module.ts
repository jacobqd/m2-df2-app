import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import { throwIfAlreadyLoaded } from '../guard/module-import-guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {HttpErrorInterceptor} from './interceptors/http-error-interceptor';


@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, },
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          return new Promise((resolve, reject) => {
            console.log("m2df2核心包已经勾住启动函数，可以任意执行一些代码了！");
            resolve();
          });
        };
      },
      multi: true
    }
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
    console.log("m2df2核心包已经初始化！");
  }
}
