import {SysRole} from "./sys-role";

export class SysUser {

  id: string;
  officeId: string;
  password: string;
  no: string;
  name: string;
  email: string;
  mobile: string;
  userType: string;
  photo: string;
  gender: string;
  idCard: string;
  birthDate: string;
  workDate: string;
  loginFlag: string;
  verificationCode: string;  // 短信验证码
  imageOriginalName: string; // 头像原文件名
  imageServerName: string;   // 头像服务器文件名-带相对路径
  pictureName: string;       // 图片名字
  pictureBaseCode: string;   // 图片Base64编码

  sysRoleList: SysRole[];

  url = "sys_users";
}
