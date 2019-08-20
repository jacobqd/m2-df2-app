import { Injectable } from '@angular/core';
import {ApiAnon} from "../http/apiAnon";
import {Subject} from "rxjs";
import {Observable} from "rxjs";
import {M2Logger} from '../m2.logger';
import {Storage} from "@ionic/storage";
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class OrgCacheService {
  private data: any[] = [];
  private _ready: Promise<any>;

  private _tipSource = new Subject<string>();
  private _tips: Observable<string> = this._tipSource.asObservable();

  constructor(private apiAnon: ApiAnon,
              private storage: Storage,
              private platform: Platform,
              private m2log: M2Logger) {
    this._init();
  }
  private _init() {
    this.m2log.log("正在加载系统组织树……");
    this._tipSource.next("正在加载系统组织树……");
    this._ready = new Promise((resolve, reject) => {
      this._refresh().then(data => {
        resolve("系统字典已经加载完毕");
      }).catch(e => {
        reject(e);
      });
    });
  }

  ready(): Promise<any> {
    return this._ready;
  }

  reload() {
    this._init();
    return this._ready;
  }

  private _refresh(): Promise<any> {
    return new Promise((resolve, reject) => {
      const queryParam = {
        pageNum: 1,
        pageSize: 0

      };
      this.apiAnon.get("data_ready/sys_offices")
          .subscribe((resp: any) => {
            this.data = resp.result;
            this.platform.ready().then(() => {
              this.storage.set("orgTree", this.data).then( () => {
                this.m2log.log("系统组织树从远程服务器加载完成并缓存！");
                this._tipSource.next("组织数据加载完成……");
                resolve(this.data);
              });
            });
          }, error2 => {
            reject(error2);
          });
    });
  }
  getTips() {
    return this._tips;
  }

  getOrgTree() {
    return this.data;
  }

  getOrgNameById(id: string, tree?: any): string {
    let oldTree;
    if (tree) {
      oldTree = tree;
    } else {
      oldTree = this.data[0];
    }

    let orgName = "";
    if (oldTree.id === id) {
      orgName = oldTree.name;
    } else if (oldTree.children) {
      for (let i = 0; i < oldTree.children.length; i++) {
        if (orgName !== "") {
          return orgName;
        }
        if (oldTree.children[i].id === id) {
          orgName = oldTree.children[i].name;
          break;
        } else if (oldTree.children[i].children) {
          orgName =  this.getOrgNameById(id, oldTree.children[i]);
        }
      }
    }
    return orgName;
  }

}
