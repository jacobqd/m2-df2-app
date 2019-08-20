import {Injectable} from '@angular/core';
import {Api} from '../http/api';
import {AuthService} from '../auth/auth-service';
import {User} from '../../../models/system/user';
import {map} from 'rxjs/operators';
import {BaseModel} from '../../../models/base-model';


@Injectable({
    providedIn: 'root',
})
export class UserProvider {
    private _user: User = new User();

    constructor(private api: Api, private authService: AuthService) {
    }


    async login(accountInfo: any): Promise<boolean> {
        const postInfo = {username: accountInfo.username, password: accountInfo.password};
        const response = await this.api.post('auth/token', postInfo).pipe(map((resp: any) => resp as BaseModel)).toPromise();
        if (response && response.code === 1) {
            await this._loggedIn(response);
            return true;
        } else {
            console.log("登陆失败！原因是：" + response.message);
            return false;
        }
    }


    /**
     * 登出
     */
    async logout() {
        await this._logout();
    }

    /**
     * 处理登陆response，并存储User数据
     */
    private async _loggedIn(resp: any) {
        this._user.id = resp.result.id;
        this._user.name = resp.result.name;
        this._user.accessToken = resp.result.accessToken;
        this._user.resourceList = resp.result.resourceList;
        this._user.office = resp.result.office;
        this._user.roleList = resp.result.sysRoleInfoDtos;
        // 登录后需要设置一下authService，否则token还是原来的空值
        await this.authService.setAccessToken(this._user);
    }

    private async _logout() {
        this._user = new User();
        await this.authService.clearToken();
    }
}
