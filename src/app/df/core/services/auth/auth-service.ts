import {Injectable} from '@angular/core';
import {User} from "../../../models/system/user";
import * as CryptoJS from "crypto-js";
import {M2Logger} from "../m2.logger";
import {BehaviorSubject, Subject} from "rxjs";
import {Observable} from "rxjs";
import {APP_SERVE_URL} from '../../constants';
import {UserTokenDto} from '../../../models/user-token-dto';
import {Platform} from '@ionic/angular';
import { Storage } from '@ionic/storage';

/**
 *  AuthService是核心登陆认证服务
 *  改进点：
 *    1、ready可以被多次调用
 *    2、对于storage存储，严格等待执行完毕返回结果，即：所在方法为返回承诺
 *  梁超 2019.5.15
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _accessToken = "";
  private _user: User = new User();
  private _dataSource = new BehaviorSubject<User>(this._user);
  private _asycUser: Observable<User> = this._dataSource.asObservable();
  private _ready: Promise<any>;
  public redirectUrl: string;
  private _isSuperAdmin = false;

  private _tipSource = new Subject<string>();
  private _tips: Observable<string> = this._tipSource.asObservable();

  constructor(private _logger: M2Logger,
              private platform: Platform,
              private storage: Storage) {
    this._init(true);
  }

  private _init(strict = false) {
    this._ready = new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.storage.get("userInfo").then(value => {
          if (value) {
            if (strict) {
              // 严格模式，执行远程校验
              this._checkToken(value.id, value.accessToken).subscribe( checkValue => {
                if ( checkValue && checkValue.result === "true") {
                  this._user = value;
                  this._dataSource.next(value);
                  this._accessToken = this._user.accessToken;
                  this._logger.log("用户和权限加载完毕");
                  resolve(value);
                } else {
                  this.clearToken().then( () => resolve(value));
                }
              }, error2 => {
                reject(error2);
              });
            } else {
              // 非严格模式，不执行远程校验
              this._user = value;
              this._dataSource.next(value);
              this._accessToken = this._user.accessToken;
              this._logger.log("用户和权限加载完毕");
              resolve(value);
            }
          } else {
            this._accessToken = "";
            resolve("");
          }
        })
            .catch(err => {
              // console.log("进入AuthService的构造函数，并catch" + err);
              this._accessToken = "";
              resolve(err);
            });
      });
    });
  }

  ready(): Promise<any> {
    return this._ready;
  }

  getTips() {
    return this._tips;
  }

  getAccessToken(): string {
    return this._accessToken;
  }

  getUser(): User {
    return this._user;
  }

  getAyscUser(): Observable<User> {
    return this._asycUser;
  }

  getUserResources(): any {
    return this._user.resourceList;
  }

  getUserRoles(): any {
    return this._user.roleList;
  }

  isSuperAdmin(): boolean {
    return this._isSuperAdmin;
  }

  isLogin(): boolean {
    if (this._accessToken === "") {
      return false;
    } else {
      return true;
    }
  }

  async setAccessToken(user: User): Promise<boolean> {
    await this.storage.set("userInfo", user);
    this._accessToken = user.accessToken;
    this._user = user;
    // 必须要确认是否是管理员再发送订阅事件，否则下游订阅者可能执行太快，取到不正确的isAdmin值
    this._checkSuperAdmin();
    this._dataSource.next(this._user);
    this._logger.log("用户和权限数据已加载完成");
    return true;
  }

  private _checkSuperAdmin() {
    this._isSuperAdmin = false;
    if (this._user.roleList) {
      this._user.roleList.forEach( value => {
        if (value && value.roleEnName === "sys_manager") {
          this._isSuperAdmin = true;
        }
      });
    }
  }

  async clearToken(): Promise<boolean> {
    let rt = false;
    await this.storage.remove("userInfo").then(value => {
      this._user = null;
      this._accessToken = "";
      this._dataSource.next(null);
      rt = true;
    }).catch(err => {
      this._logger.log(err);
    });
    return rt;
  }

  private _checkToken(userId: string, token: string): Observable<any> {
    const subject = new Subject<any>();
    const userToken = new UserTokenDto();
    userToken.id = userId;
    userToken.accessToken = token;
    // 此处使用XHR，来避开angular http 拦截器的造成的循环依赖
    const oReq = new XMLHttpRequest();

    oReq.open("POST", APP_SERVE_URL + "/anon/token/checkToken", true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.responseType = "json";
    oReq.onload = function (oEvent) {
      if ( oReq.readyState === 4 && oReq.status === 200) {
        const result = oReq.response;
        subject.next(result);
      } else {
        subject.next(null);
      }
    };
    oReq.onerror = function (error) {
      subject.next(null);
    };
    oReq.send(JSON.stringify(userToken));
    return subject.asObservable();
  }
}
