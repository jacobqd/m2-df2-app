import {RUNMODE} from '../df/core/enum/layout';

export const AppData = {
  app  : {
    "name": "艾姆图APP-DF2",
    "description": "艾姆图App开发框架2",
    "year": "2017-2019",
    "copyRight": "青岛艾姆图软件科技有限公司", // 登录页和主页面页脚，版本归属声明
    "loginForgetPwd": true  // 登录页是否启用忘记密码
  },
  config : {
    "runMode": RUNMODE.TABS, // 可以选择menus,tabs,wechat,dingtalk
  },
};
