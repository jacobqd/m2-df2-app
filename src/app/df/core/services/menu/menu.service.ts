import { Injectable } from '@angular/core';
import {Menus} from "./menu-data";
import {AuthService} from "../auth/auth-service";
import {Menu} from "./menu";
import {SysResource} from "../../../models/system/sys-resource";
import {M2Logger} from "../m2.logger";
import {User} from "../../../models/system/user";
import {MenusCover, MenusExt} from "../../../../df-ext/menu-data.ext";
import { NavigationEnd,  Router} from "@angular/router";
import {distinctUntilChanged, filter, map, mergeMap} from "rxjs/operators";
import {BehaviorSubject, Subject} from "rxjs";
/*
* 菜单服务在app级别注入，保持全应用仅有一份。懒加载应用注入后，需要注意。
*
 */


@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // 完整菜单数据容器
  private sysMenu: Menu[];
  // 修剪后菜单数据容器
  private pruneMenu: Menu[];
  // 层级菜单容器，理论上可以任意层次，目前仅仅处理三层
  private crumbs: any = new Array();
  // 当前菜单项目容器
  private menuItem: Menu;

  menuObj$: BehaviorSubject<any>;

  constructor(private authService: AuthService, private _logger: M2Logger, private router: Router) {
    this.createMenus();
    this._logger.log("系统完整菜单已加载");
    // 修改为behaviorSubject后，不再需要额外执行一次，因为一定可以订阅到一次数据
    this.menuObj$ = new BehaviorSubject<any>({
      sysMenu: this.sysMenu,
      pruneMenu: this.pruneMenu,
      crumbs: this.crumbs,
      menuItem: this.menuItem
    });
    this.authService.getAyscUser().subscribe( (value: User) => {
      if (!value || !value.accessToken || value.accessToken === '') { return; }
      this._logger.log("订阅到系统用户变化，正在根据新权限修剪菜单……");
      if (this.authService.isSuperAdmin()) {
        this.pruneMenu = this.sysMenu;
      } else {
        this.pruneMenu = this.pruneMenuTree(this.sysMenu);
      }
      this.menuObj$.next({sysMenu: this.sysMenu, pruneMenu: this.pruneMenu, crumbs: this.crumbs, menuItem: this.menuItem});
    });
    const route$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    );
    route$.subscribe((event) => {
      this.getCrumbsByUrl(this.router.url);
      this._logger.log("路由变化，menu准备完成，向订阅者发送MenuChange消息！");
      this.menuObj$.next({sysMenu: this.sysMenu, pruneMenu: this.pruneMenu, crumbs: this.crumbs, menuItem: this.menuItem});
    });
  }

  private createMenus() {
    this.sysMenu = [...MenusExt, ...Menus];
    if (MenusCover instanceof Array) {
      MenusCover.forEach( cover => {
        const rule = cover.id.length / 2;
        let obj = this.sysMenu;
        for (let i = 1; i <= rule; i++) {
          const index = obj.findIndex( e => e.id === cover.id.substring(0, i * 2));
          if (index !== -1) {
            if (i === rule) {
              // 如果i已经执行到最末，则直接替换cover
              obj[index] = cover;
            } else {
              // 否则继续查询children级别
              obj = obj[index].children;
            }
          }
        }
      });
    }
    this.sysMenu = [...this.sysMenu];
  }

  // 获得经过权限修剪的菜单选项
  getMenu(): Menu[] {
    return this.pruneMenu;
  }

  // 根据权限码修剪菜单树
  private pruneMenuTree(menuJson?: Menu[] ) {
    if (! menuJson) {
      menuJson = this.sysMenu;
    }
    const resouceList = this.authService.getUserResources();
    if (!resouceList) {
      // 如果没有资源列表，那么菜单返回空
      return new Array();
    }
    if (menuJson) {
      const newMenuTree = new Array();
      menuJson.map( (m: Menu) => {
        // 注意不能直接赋值menuItem；const newMenuTreeItem = menuItem;是错误的，这样会将该菜单项的引用付给新对象
        const newMenuTreeItem = JSON.parse(JSON.stringify(m));
        // 改用JSON.parse(JSON.stringify,如果测试没有问题那么这些代码删除
        // newMenuTreeItem.id = menuItem.id;
        // newMenuTreeItem.title = menuItem.title;
        // newMenuTreeItem.navUrl = menuItem.navUrl;
        // newMenuTreeItem.icon = menuItem.icon;
        // newMenuTreeItem.auth = menuItem.auth;
        // newMenuTreeItem.extPermission = menuItem.extPermission;
        // 准备删除到这里
        if (m.children) {
          newMenuTreeItem.children = this.pruneMenuTree(m.children);
          if ( newMenuTreeItem.children && newMenuTreeItem.children.length > 0 ) {
            newMenuTree.push(newMenuTreeItem);
          }
        } else {
          // 如果没有孩子那么是最末级节点，如果没设auth则不需要控制，否则控制权限
          if (m.auth) {
            resouceList.map( (resourceItem: SysResource) => {
              if (resourceItem.resourceCode == m.auth) {
                // 如果权限列表中找到匹配项，那么该菜单项目保留
                newMenuTree.push(newMenuTreeItem);
              }
            });
          } else {
            // 如果没有权限码，则不控制
            newMenuTree.push(newMenuTreeItem);
          }
        }
      });
      return newMenuTree;
    }
  }

  // 根据菜单项目id生成并返回层级关系容器
  getCrumbsByMenuItem(item: any): any {
    this.menuItem = item;
    this.crumbs = new Array();
    this.getMenuItem(item.id);
    return this.crumbs;
  }
  // 返回当前层级关系容器
  getLastCrumbs(): any {
    return this.crumbs;
  }
  // 返回当前进入的菜单项目
  getLastMenuItem() {
    return this.menuItem;
  }
  getCrumbsByUrl(url: string): any {
    // 缺省，路由URL中"."后面的内容被认为菜单项之外的东西，比如/test，那么新增页面/test.form,共同命中相同菜单和面包屑
    if (url.match(new RegExp("\\.+"))) {
      url = url.substring(0, url.indexOf("."));
    }
    // 缺省，路由URL中";"后面的内容被认为菜单项之外的东西，比如/test;id=1，那么命中相同菜单和面包屑
    if (url.match(new RegExp(";+"))) {
      url = url.substring(0, url.indexOf(";"));
    }
    this.crumbs = new Array();
    this.menuItem = null;
    this.getMenuItemByUrl(url);
    // 直接通过URL进入的，在计算出层级容器后，直接将当前菜单项设置为层级容器最后一个
    if (this.crumbs.length > 0) {
      this.menuItem = this.crumbs[this.crumbs.length - 1];
    }
    return this.crumbs;
  }
  getMenuItem(id: string, level?: number, menuJson?: any, tempCrumbs?: any): any {

    if (!tempCrumbs) {
      tempCrumbs = new Array();
    }
    if (!level) {
      level = 1;
    }
    if (!menuJson) {
      menuJson = this.sysMenu;
    }
    const curId = id.slice(0, 2 * level);
    const judge: any = (val: any) => val.id === curId;
    const menuItem = menuJson.find(judge);
    if (menuItem) {
      tempCrumbs.push(menuItem);
      this.crumbs = tempCrumbs;
      if (menuItem.children) {
        return this.getMenuItem(id, level + 1, menuItem.children, tempCrumbs);
      } else {
        return menuItem;
      }
    } else {
      return menuItem;
    }
  }
  getMenuItemByUrl(url: string, menuJson?: any, tempCrumbs?: any): any {
    if (!menuJson) {
      menuJson = this.sysMenu;
    }
    if (!tempCrumbs) {
      tempCrumbs = new Array();
    }
    let menuItem = null;
    for (let i = 0; i < menuJson.length; i++) {
      if (menuJson[i].navUrl === url) {
        menuItem = menuJson[i];
        tempCrumbs.push(menuJson[i]);
        this.crumbs = tempCrumbs;
        break;
      } else {
        if (menuJson[i].children) {
          tempCrumbs.push(menuJson[i]);
          this.crumbs = tempCrumbs;
          menuItem = this.getMenuItemByUrl(url, menuJson[i].children, tempCrumbs);
          if (menuItem) {
            // 递归children找到了，终止本级遍历
            break;
          } else {
            // 递归children没有找到，要清除对面包屑的操作
            tempCrumbs.pop();
            this.crumbs = tempCrumbs;
          }
        }
      }
    }
    return menuItem;
  }

}
