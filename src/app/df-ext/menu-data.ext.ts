import {Menu} from '../df/core/services/menu/menu';

/**
 *1、菜单的使用与布局有关，例如Tab布局，会取第一层级为底部Tab，同时tabs要求有一级菜单，我们默认为m2，例如/m2/tab1
 * 2、请保持ID属性为每级两位数
 * 3、icon在不同的布局中会使用不同
 * 4、如果auth认证码不定义，则表明不控制权限
 * 5、如果除了CRUD之外需要额外的权限码，则启用extPermission，按照二进制11110000，高4位倒序使用
 * 6.此文件中配置业务模块自己的菜单数据，不要与系统的混淆，系统保留90-99段
 * 7.如果需要覆盖系统的菜单，可以在menusCover中定义新的菜单，覆盖的依据是ID
 */
export const MenusExt: Menu[] = [

    {
        title: '首页', icon: 'flash', id: '01', navUrl: '/m2/home',
        children: []
    },
    {
        title: '地图', icon: 'map', id: '03', navUrl: '/m2/map',
        children: []
    },
    {
        title: '样式展', icon: 'map', id: '06', navUrl: '/m2/style',
        children: []
    },
    {
        title: '测试一', icon: 'git-branch', id: '04', navUrl: '/m2/test1',
        children: [
            {title: 't11', icon: 'm2-icons_settings1', id: '0401', navUrl: '/m2/test1/test11',
                children: [
                    {title: 't111', icon: 'm2-icons_settings1', id: '040101', navUrl: '/m2/test1/test11/test111', },
                    {title: 't112', icon: 'm2-icons_settings1', id: '040102', navUrl: '/m2/test1/test11/test112', }
                ]
            },
            {title: 't12', icon: 'm2-icons_settings1', id: '0402', navUrl: '/m2/test1/test12',
                children: [
                    {title: 't121', icon: 'm2-icons_settings1', id: '040201', navUrl: '/m2/test1/test12/test121', },
                    {title: 't122', icon: 'm2-icons_settings1', id: '040202', navUrl: '/m2/test1/test12/test122', }
                ]
            },
            {title: 'test13tab2', icon: 'm2-icons_settings1', id: '0403', navUrl: '/m2/test1/test13tab2'},
        ]
    },
    {
        title: '测试二', icon: 'rainy', id: '05', navUrl: '/m2/test2',
        children: [
            {title: 't21', icon: 'm2-icons_settings1', id: '0501', navUrl: '/m2/test2/test21',
                children: [
                    {title: 't211', icon: 'm2-icons_settings1', id: '050101', navUrl: '/m2/test2/test21/test211', }
                ]
            },
            {title: 't22', icon: 'm2-icons_settings1', id: '0502', navUrl: '/m2/test2/test22',
                children: [
                    {title: 't221', icon: 'm2-icons_settings1', id: '050201', navUrl: '/m2/test2/test22/test221', }
                ]
            },
        ]
    },
    {
        title: '我的', icon: 'apps', id: '02', navUrl: '/m2/about-me',
        children: []
    },
];
export const MenusCover: Menu[] = [];
