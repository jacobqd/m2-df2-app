import {SysResource} from "./sys-resource";

export class User {

  id: string;
  name: string;
  accessToken: string;
  roleList: {roleId: string, roleEnName: string, roleName: string}[];
  resourceList: { resourceCode: string, permission: any}[];
  // 归属部门
  office: {id: string, name: string, type: string};
  wechatInfo: {wechatOpenId: string, wechatUnionId: string, wechatNickName: string, wechatHeadImgUrl: string};
  dingtalkInfo: {ddUserId: string, ddUnionId: string, ddName: string, ddAvatar: string, ddMobile: string};
}
