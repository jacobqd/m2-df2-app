import {Injectable} from '@angular/core';
import {MenusCover, MenusExt} from '../../../../df-ext/menu-data.ext';
import {Menus} from './menu-data';
import {Menu} from './menu';

@Injectable({
    providedIn: 'root',
})
export class TabsUtilsService {
    // 完整菜单数据容器
    private sysMenu: Menu[];
    constructor() {
        this.createMenus();
    }
    getTabs(): Menu[] {
        const tabs = new Array<Menu>();
        this.sysMenu.forEach( (item: Menu) => {
            const newItem: Menu = JSON.parse(JSON.stringify(item));
            newItem.navUrl = newItem.navUrl.replace("/m2/", "");
            tabs.push(newItem);
        });
        return tabs;
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
}
