import {Routes} from "@angular/router";
import {AuthGuard} from '../df/guard/auth-guard';

/*
路由扩展一：最常用扩展
父级组件：Tabs组件
路由守卫： 有
前置路径：""
 */
export const routesExt: Routes = [
    {
        path: 'home',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/home/home.module').then(m => m.HomePageModule)
            }
        ]
    },
    {
        path: 'map',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/demo/map/map.module').then(m => m.MapPageModule)
            }
        ]
    },
    {
        path: 'style',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/demo/style-layout/style-layout.module').then(m => m.StyleLayoutPageModule)
            }
        ]
    },

    {
        path: 'about-me',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/about-me/about-me.module').then(m => m.AboutMePageModule)
            }
        ]
    }
];


