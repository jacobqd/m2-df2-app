import {Inject, Injectable} from '@angular/core';
import {User} from '../../../models/system/user';
import {RunTimeMessage} from '../models/run_time_message';
import {DATA_REPORT_SERVER_URL} from '../../constants';
import {AuthService} from '../../services/auth/auth-service';
import {Subject} from 'rxjs';
import {M2_DEVICE_INFO_PROVIDER} from '../../tokens/m2.tokens';
import {DeviceInfoInterface} from '../interface/device-info.interface';

@Injectable({
    providedIn: 'root'
})
export class DeviceInfoUploadService {
    _user: User;
    constructor(private authService: AuthService,
                @Inject(M2_DEVICE_INFO_PROVIDER)  private deviceInfoInterface: DeviceInfoInterface) {
        this.userInfo();
    }

    // 用户信息
    userInfo(): User {
        this.authService.getAyscUser().subscribe( (userInfo: User) => {
            this._user = userInfo;
        });
        return this._user;
    }

    // 设备信息上传
    uploadDeviceInfo() {
        const runTimeMessage: RunTimeMessage = new RunTimeMessage();
        runTimeMessage.userInfo = this.userInfo();
        runTimeMessage.platFormInfo = this.deviceInfoInterface.getPlatformInfo();
        // 采用angular内置的$http服务提供浏览器原生的XMLHttpRequest对象，可以直接同外部进行通信。来避开angular http 拦截器的造成的循环依赖
        const subject = new Subject<any>();
        const oReq = new XMLHttpRequest();
        oReq.open("POST", DATA_REPORT_SERVER_URL + "/anon/runtime/app/device", true);
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
        return subject.asObservable();
    }
}
