import {Menu} from './menu';

/**
* 菜单定义文件
* 1、菜单的使用与布局有关，例如Tab布局，会取第一层级为底部Tab，同时tabs要求有一级菜单，我们默认为m2，例如/m2/tab1
* 2、请保持ID属性为每级两位数
* 3、icon在不同的布局中会使用不同
* 4、如果auth认证码不定义，则表明不控制权限
* 5、如果除了CRUD之外需要额外的权限码，则启用extPermission，按照二进制11110000，高4位倒序使用
 */

export const Menus: Menu[] = [];
