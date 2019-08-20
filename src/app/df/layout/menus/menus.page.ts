import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {Menu} from '../../core/services/menu/menu';
import {User} from '../../models/system/user';
import {AuthService} from '../../core/services/auth/auth-service';
import {MenuService} from '../../core/services/menu/menu.service';

@Component({
    selector: 'app-menus',
    templateUrl: './menus.page.html',
    styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

    // 完整菜单容器
    sysMenu: Array<Menu>;
    // 层级菜单容器，可以用于面包屑
    crumbs: any = new Array();
    // 当前登录用户
    user: User;
    constructor(private router: Router,
                private authService: AuthService,
                private menuService: MenuService,
                private menuCtrl: MenuController) {
    }

    ngOnInit() {
        // 加载当前用户数据
        this.user = this.authService.getUser();
        // menu消息订阅后,根据menu变化调整菜单显示变化
        this.menuService.menuObj$.subscribe((event) => {
            this.crumbs = event.crumbs;
            this.sysMenu = event.sysMenu;
            this.sysMenu = this.sysMenu.filter( item => !item.isHidden);
        });
    }


    navTo(target: string) {
        this.router.navigateByUrl(target).then(() => {
            this.menuCtrl.close().then();
        });
    }
}
