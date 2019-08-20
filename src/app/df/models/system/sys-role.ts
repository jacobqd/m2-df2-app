import {SysResource} from "./sys-resource";

export class SysRole {

  id: string;
  officeId: string;
  name: string;
  enname: string;
  roleType: string;
  dataScope: string;
  isSys: string;
  firstMenus: string;
  useable: string;
  createBy: string;
  createByName: string;
  createDate: string;
  updateBy: string;
  updateByName: string;
  updateDate: string;
  remark: string;
  delFlag: string;

  sysResourceList: SysResource[];

}
