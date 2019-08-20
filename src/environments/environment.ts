export const environment = {
    production: false,
    APP_SERVE_URL: 'http://b.199.m2platform.cn/m2-df2-backend',
    SOCKET_URL: 'ws://b.199.m2platform.cn/m2-df2-backend/m2broadcast',
    FILE_SERVE_URL: 'http://static.m2plat.cn/m2insurance',
    DATA_REPORT_SERVER_URL: '',
    APP_VERSION_SERVE_URL: "",
    APK_DOWNLOAD: "http://webapi.m2plat.cn/dl/m2insurance.apk",
    APP_DOWNLOAD: "http://webapi.m2plat.cn/insurance",
    DEFAULT_AVATAR: './assets/img/avatar.png', // 用户默认头像
    PAGE_SIZE: 20, // 默认分页大小
    DEL_FLAG_DELETE: "1", // 逻辑删除标志
    UPLOAD_FILE_MAX_SIZE: 10485760, // 限制为10M
    IMAGE_SIZE: 1024, // 拍照/从相册选择照片压缩大小
    QUALITY_SIZE: 94, // 图像压缩质量，范围为0 - 100
    REQUEST_TIMEOUT: 12000, // 请求超时时间,单位为毫秒

    IS_DEBUG: true, // 是否开发(调试)模式
    APP_ID: 'm2df-app',
    M2_ENCRYPT_KEY: 'abcdef0123456789',

  }
;
