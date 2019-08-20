import {PlatFormInfo} from "../models/plat_form_info";

export interface DeviceInfoInterface {
    getPlatformInfo(): PlatFormInfo;      // 设备信息获取
    ready(): Promise<PlatFormInfo>;
    reload(): Promise<PlatFormInfo>;
}
