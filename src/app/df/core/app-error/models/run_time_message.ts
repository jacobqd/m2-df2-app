import {ErrorInfo} from "./error_info";
import {PlatFormInfo} from "./plat_form_info";
import {User} from '../../../models/system/user';

export class RunTimeMessage {
    errorInfo: ErrorInfo; // 错误信息

    expendJson: string; // 扩展信息
    expendLog: string; // 扩展埋点日志

    platFormInfo: PlatFormInfo; // 设备信息

    userInfo: User; // 用户信息
}
