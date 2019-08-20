import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabsPage} from '../layout/tabs/tabs.page';
import {MenusPage} from '../layout/menus/menus.page';
import {AppData} from '../../df-ext/app-data';
import {AuthGuard} from '../guard/auth-guard';
import {Guard1} from '../guard/guart1';
import {routesExt} from '../../df-ext/routes-ext-routing.module';

// layout

// dashboard pages

// passport pages

// single pages
/**
 * 路由模块将最终被放入各个插件中，由插件模块提供路由配置，不再冗余配置这么多类型
 */

const routes = {
    'tabs': [
        {
            path: 'm2',
            component: TabsPage,
            canActivate: [Guard1],
            children: [
                ...routesExt
            ]
        },
        {path: 'login', loadChildren: () => import('src/app/df/routes/passport/login1/login1.module').then(m => m.Login1PageModule)},
        {path: 'error', loadChildren: () => import('src/app/df/routes/error/error.module').then(m => m.ErrorPageModule)},
        {path: '', redirectTo: '/m2/home', pathMatch: 'full'}
    ],
    'menus': [
        {
            path: 'm2',
            component: MenusPage,
            canActivate: [AuthGuard],
            children: [
                ...routesExt
            ]
        },
        {path: 'login', loadChildren: () => import('src/app/df/routes/passport/login1/login1.module').then(m => m.Login1PageModule)},
        {path: 'error', loadChildren: () => import('src/app/df/routes/error/error.module').then(m => m.ErrorPageModule)},
    ],
    'wechat' : [],
    'dingtalk' : [],
};

@NgModule({
    imports: [RouterModule.forRoot(routes[AppData.config.runMode])],
    exports: [RouterModule]
})
export class RouteRoutingModule {
}
