import {ErrorHandler, Inject, Injectable} from '@angular/core';
import {RunTimeMessage} from "../models/run_time_message";
import {ErrorInfo} from "../models/error_info";
import {Subject} from "rxjs";
import {DatePipe} from "@angular/common";
import {M2Logger} from '../../services/m2.logger';
import {DATA_REPORT_SERVER_URL} from '../../constants';
import {M2_DEVICE_INFO_PROVIDER} from '../../tokens/m2.tokens';
import {DeviceInfoInterface} from '../interface/device-info.interface';
import {AuthService} from '../../services/auth/auth-service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
    constructor(private _logger: M2Logger,
                private authService: AuthService,
                @Inject(M2_DEVICE_INFO_PROVIDER)  private deviceInfoInterface: DeviceInfoInterface) {
    }

    handleError(error: any): void {
        try {
            const obj: any = new Object();
            // 路由 请求地址参数请求方式等信息
            // try {
            //     const jsons: ErrorExpendJson[] = [];
                // this.app.getActiveNavs().forEach((value, index) => {
                //     // console.log("app.getActiveNavs()---------" + value.getActive());
                //     if (!isUndefined(value.getActive())) {
                //         jsons.push(new ErrorExpendJson(value.getActive().id, value.getActive().name, index));
                //     }
                // });
            //     obj["错误模块"] = jsons;
            // } catch (e) {}
            // 执行错误上报
            const runTimeMessage: RunTimeMessage = new RunTimeMessage();
            const errorInfo: ErrorInfo = new ErrorInfo();
            errorInfo.errorName = error.name;
            errorInfo.errorMessage = error.message.toString(); // "ActivePage:" + this.app.getActiveNav().getActive().name + " " + error.message;
            errorInfo.errorStack = error.stack;

            const _datePipe = new DatePipe('en-US');
            const nowTimeStr = _datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
            // const nowTimeStr = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().replace("Z", "+08:00");
            errorInfo.errorHappenTimeStr = nowTimeStr;
            runTimeMessage.errorInfo = errorInfo;
            runTimeMessage.expendJson = JSON.stringify(obj);

            // 日志扩展 // JSON.stringify(sessionStorageLogClass.get());
            runTimeMessage.expendLog =  JSON.stringify(localStorage.getItem("m2ErrorCache") || "");

            // 用户信息
            runTimeMessage.userInfo = this.authService.getUser();
            // 增加设备信息
            runTimeMessage.platFormInfo = this.deviceInfoInterface.getPlatformInfo();

            // 此处应该采用原生方式存储错误信息
            // 采用angular内置的$http服务提供浏览器原生的XMLHttpRequest对象，可以直接同外部进行通信。来避开angular http 拦截器的造成的循环依赖
            const subject = new Subject<any>();
            const oReq = new XMLHttpRequest();
            oReq.open("POST", DATA_REPORT_SERVER_URL + "/anon/runtime/app/message", true);
            oReq.setRequestHeader("Content-Type", "application/json");
            oReq.responseType = "json";
            oReq.onload = function () {
                if ( oReq.readyState === 4 && oReq.status === 200) {
                    const result = oReq.response;
                    subject.next(result);
                } else {
                    subject.next(null);
                }
            };
            oReq.onerror = function () {
                subject.next(null);
            };
            oReq.send(JSON.stringify(runTimeMessage));
            subject.asObservable();
        } catch (e) {
            this._logger.log("解析错误：" + e);
        }
    }

}
