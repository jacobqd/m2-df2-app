
export class PlatFormInfo {
    appId: string;

    /*取自appVersion*/
    appVersion: string; // APP版本
    appName: string; // APP名称

    // 远程最新版本
    remoteVersion: any;
    // 最新版本是否强制升级
    forceUpgrade: boolean;
    // 最新版本升级内容
    upgradeContent: string;

    /*取自device*/
    platform: string;
    osName: string;    // 操作系统名称
    osVersion: string;    // 操作系统版本
    manufacturer: string; // 生产厂商
    isVirtual: boolean;   // 是否模拟器运行
    serial: string;       // 设备硬件序列号
    uuid: string;         // 设备UUID
    model: string;        // 设备型号或产品的名称。该值由设备制造商设置，并可能在同一产品的不同版本中有所不同
    cordovaVersion: string; // cordova 版本

    runtimeEnvironment: string; // 运行环境

    // 屏幕宽高
    screenWidth: string;
    screenHeight: string;

    // 渲染屏幕宽高
    deviceWidth: string;
    deviceHeight: string;

    // 缩放比
    devicePixelRatio: string;

    userAgent: string;
}
