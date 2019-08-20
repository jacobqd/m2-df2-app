/**
 * 后台Api地址
 **/

import {environment} from "../../../environments/environment";

// 本机后台
export const APP_SERVE_URL = environment.APP_SERVE_URL;

export const SOCKET_URL = environment.SOCKET_URL;

export const DATA_REPORT_SERVER_URL = environment.DATA_REPORT_SERVER_URL;
/**
 * 文件服务器地址
 **/
export const FILE_SERVE_URL = environment.FILE_SERVE_URL;

// app版本升级服务地址
export const APP_VERSION_SERVE_URL = environment.APP_VERSION_SERVE_URL; // app版本升级服务;测试环境,查询app最新版本号,更新日志等信息.
export const APK_DOWNLOAD = environment.APK_DOWNLOAD; // android apk下载完整地址,用于android本地升级
export const APP_DOWNLOAD = environment.APP_DOWNLOAD; // app网页下载地址,用于ios升级或android本地升级失败

/**
 * 代码中需要用的常量
 **/
export const DEFAULT_AVATAR = environment.DEFAULT_AVATAR; // 用户默认头像
export const PAGE_SIZE = environment.PAGE_SIZE; // 默认分页大小
export const DEL_FLAG_DELETE = environment.DEL_FLAG_DELETE; // 逻辑删除标志
export const UPLOAD_FILE_MAX_SIZE = environment.UPLOAD_FILE_MAX_SIZE; // 限制为10M
export const REQUEST_TIMEOUT = environment.REQUEST_TIMEOUT; // 请求超时时间,单位为毫秒

export const IS_DEBUG = environment.IS_DEBUG; // 是否开发(调试)模式
export const APP_ID = environment.APP_ID;
export const M2_ENCRYPT_KEY = environment.M2_ENCRYPT_KEY;

/**
 * df内部控制常量
 */
export const LR_LAYOUT_OFFSET = 56; // left-right布局的偏移量

/**
 * 钉钉用的企业信息
 */
export const CORP_ID = "ding7558253f652d464835c2f4657eb6378f";
