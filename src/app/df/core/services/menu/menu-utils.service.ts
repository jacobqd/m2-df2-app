import { Injectable } from '@angular/core';
import {Menu} from "./menu";
import {MenuService} from "./menu.service";
import {AuthService} from "../auth/auth-service";

@Injectable({
  providedIn: 'root',
})
export class MenuUtilsService {

  constructor(private menuService: MenuService,
              private authService: AuthService) { }

  checkResourceAuth(permission: string): boolean {
    if ( permission) {
      return this._checkMenuItemAuth(this.menuService.getLastMenuItem(), this.authService.getUserResources(), permission);
    } else {
      return false;
    }
  }

  checkMenuItemAuth(url: string) {
    if (url.indexOf(".") !== -1) {
      url = url.split(".")[0];
    }
    return this._checkMenuItemAuth(this.menuService.getMenuItemByUrl(url), this.authService.getUserResources());
  }

  getPermissionPosition(permission: string, resourceCode: string) {
    // 有待后面编写具体实现代码
    return "";
  }

  private _checkMenuItemAuth(menuItem: Menu,
                    resourceList: { resourceCode: string, permission: string}[],
                    permission?: string, ): boolean {
    // permission参数使用select，insert，update，delete来表述权限
    // resouceList.permission使用0001等二进制码代表查询，1000代表insert，0100代表update，0010代表delete
    let returnVal = false;
    // 如果菜单项不存在，则允许进入
    if (!menuItem) {
      return true;
    }
    // 如果是超级管理员，则允许进入
    if (this.authService.isSuperAdmin()) {
      return true;
    }
    // 如果没有资源列表，则不允许进入
    if (!resourceList) {
      return false;
    }
    resourceList.map( value => {

        // 如果菜单项没有认证码要求，那么放行
        if (!menuItem.auth) {
          returnVal = true;
          return;
        }
        if (menuItem.auth === value.resourceCode) {
          if (!value.permission) {
            returnVal = false;
            return;
          }
          if ( ! permission) {
            // 如果没有指定权限码，则判断select权限
            if (value.permission.substr(7, 1) === '1') {
              returnVal = true;
            }
          } else if (permission === 'insert') {
            // 00001000
            if (value.permission.substr(4, 1) === '1') {
              returnVal = true;
            }
          } else if (permission === 'delete') {
            // 00000100
            if (value.permission.substr(5, 1) === '1') {
              returnVal = true;
            }
          } else if (permission === 'update') {
            // 00000010
            if (value.permission.substr(6, 1) === '1') {
              returnVal =  true;
            }
          } else {
            // 如果是扩展权限码
            let bitPositon = 4;
            if (!menuItem.extPermission) {
              returnVal = false;
              return;
            }
            menuItem.extPermission.map( (value2, index) => {
              if (permission === value2) {
                bitPositon = index;
              }
            });
            if (bitPositon >= 4) {
              returnVal = false;
              return;
            } else {
            }
            if (value.permission.substr( 3 - bitPositon, 1) === '1') {
              returnVal =  true;
            }

          }
        }
    });
    return returnVal;
  }
}
