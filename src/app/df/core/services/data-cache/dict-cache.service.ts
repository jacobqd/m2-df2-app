import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {SysDict} from '../../../models/system/sys-dict';
import {ApiAnon} from '../http/apiAnon';
import {Platform} from '@ionic/angular';
import {M2Logger} from '../m2.logger';
import {Observable} from 'rxjs';
import {BaseModel} from '../../../models/base-model';

/**
 * 系统字段缓存服务
 */
@Injectable({
    providedIn: 'root',
})
export class SysDictCacheServcie {

  sysDictList: SysDict[];
  private _ready: Promise<any>;

  constructor(private apiAnon: ApiAnon,
              private storage: Storage,
              private platform: Platform,
              private m2log: M2Logger) {
    this._init();
  }

  ready() {
    return this._ready;
  }

  reload() {
    this._init();
    return this._ready;
  }
  private _init() {
    this.m2log.log("正在加载系统字典……");
    this._ready = new Promise((resolve, reject) => {
      this._getAllSysDicts(1, 0)
        .subscribe((baseModel: BaseModel) => {
          if (baseModel && baseModel.code === 1) {
            this.sysDictList = baseModel.result.list;
            this.platform.ready().then(() => {
              this.storage.set("sysDict", this.sysDictList).then( () => {
                this.m2log.log("系统字典从远程服务器加载完成并缓存！");
                resolve("系统字典从远程服务器加载完成并缓存！");
              });
            });
          } else {
            reject("系统字典从远程服务器加载失败！");
          }
        }, error2 => {
          reject("无法从远程服务器获取系统字典，具体原因是：" + JSON.stringify(error2));
        });

    });
  }

  // private _init() {
  //   this._ready = new Promise((resolve, reject) => {
  //     this.storage.get("sysDict").then(value => {
  //       this.sysDictList = value;
  //       if (!this.sysDictList) {
  //         this._getAllSysDicts(1, 0)
  //           .subscribe(baseModel => {
  //             if (baseModel) {
  //               this.sysDictList = baseModel.result.list;
  //               this.storage.set("sysDict", this.sysDictList);
  //             }
  //           });
  //
  //       }
  //       this.m2log.log("系统字典已经加载完毕");
  //       resolve(value);
  //     });
  //   });
  // }

  public getSysDictByType(type: string): SysDict[] {
    const sysDict: SysDict[] = new Array();
    this.sysDictList.map((sysDictItem) => {
      if (sysDictItem && sysDictItem.type === type) {
        sysDict.push(sysDictItem);
      }
    });
    return sysDict;
  }

  public getSysDictByTypeAndValue(type: string, dictValue: string): string {
    let dictLabel = "";
    let _status = false;
    this.sysDictList.map((sysDictItem) => {
      if (sysDictItem && sysDictItem.type === type && sysDictItem.value === dictValue) {
        dictLabel = sysDictItem.label;
        _status = true;
      }
    });
    if (!_status) {
      dictLabel = dictValue;
    }
    return dictLabel;
  }

  private _getAllSysDicts(pageNum: number, pageSize: number): Observable<any> {
    const pageInfo = {"pageNum": pageNum, "pageSize": pageSize};
    return this.apiAnon.get("data_ready/sys_dicts", pageInfo);
  }

}
