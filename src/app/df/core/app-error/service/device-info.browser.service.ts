import {Injectable} from "@angular/core";
import {PlatFormInfo} from '../models/plat_form_info';
import {APP_ID, DATA_REPORT_SERVER_URL} from '../../constants';
import {PLATFORM} from '../../enum/platform';
import {DeviceInfoInterface} from '../interface/device-info.interface';

@Injectable({
    providedIn: 'root'
})
export class DeviceInfoBrowserService implements DeviceInfoInterface {
    private _platformInfo: PlatFormInfo;
    private deviceReady: Promise<PlatFormInfo>;

    constructor(  ) {
        this.deviceInit();
    }
    ready(): Promise<PlatFormInfo> {
        return this.deviceReady;
    }
    reload(): Promise<PlatFormInfo> {
        this.deviceInit();
        return this.deviceReady;
    }

    getPlatformInfo(): any {
        return this._platformInfo;
    }


    // 初始化设备信息
    private deviceInit() {
        this.deviceReady = new Promise<any>(resolve => {
            console.log(navigator.userAgent.toLowerCase());
            this._platformInfo = new PlatFormInfo();
            this._platformInfo.appId = APP_ID;
            this._platformInfo.userAgent = navigator.userAgent.toLowerCase();
            this._platformInfo.platform = PLATFORM.Browser;
            this._platformInfo.runtimeEnvironment = PLATFORM.Browser;

            this._platformInfo.isVirtual = false;
            this._platformInfo.cordovaVersion = "1.0.0"; // cordova 版本
            this._platformInfo.osName = PLATFORM.Browser;
            this._platformInfo.osVersion = "1.0.0";
            this._platformInfo.appVersion = "1.0.0";
            this._platformInfo.remoteVersion = "1.0.1";
            this._platformInfo.forceUpgrade = false;
            this._platformInfo.upgradeContent = "浏览器运行环境无法升级";
            this._platformInfo.serial = "M234567890";       // 设备硬件序列号
            this._platformInfo.uuid = "M234567890-m2df-app";         // 设备UUID
            this._platformInfo.manufacturer = "M2";
            this._platformInfo.model = PLATFORM.Browser;        // 设备型号或产品的名称。该值由设备制造商设置，并可能在同一产品的不同版本中有所不同
            resolve(this._platformInfo);
        });
    }
}
