import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth-service";
import {Observable, Subject} from "rxjs";
import {SysDictCacheServcie} from './data-cache/dict-cache.service';
import {OrgCacheService} from './data-cache/org-cache.service';

/**
* 名称：M2Entrance
* 描述：
* 1、M2App框架的入口文件
* 2、在使用M2App的所有服务之前可以简单使用m2.ready包裹
* 3、如果有高级的用途，也可以单独使用内部元素的ready，例如单独sysDict.ready，但是需要考虑元素之间关系，否则还是建议直接使用m2.ready
* 4、m2.ready()必须被ionic的platform.ready所包裹
* 5、此入口文件意在简化系统启动的先后逻辑判断，保证各异步操作能够有序执行
*
*  by 梁超 2018.6.7
 */

@Injectable({
  providedIn: 'root',
})

export class M2Entrance implements OnDestroy {
  private _ready: Promise<any>;


  constructor(private auth: AuthService,
              private sysDict: SysDictCacheServcie,
              private sysOrg: OrgCacheService) {

    this._ready = Promise.all([this.auth.ready(), this.sysDict.ready(), this.sysOrg.ready()]);
  }



  ngOnDestroy() {
  }

  ready() {
    return this._ready;
  }


}
