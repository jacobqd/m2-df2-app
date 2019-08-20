import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonInfiniteScroll} from '@ionic/angular';

class StyleLayoutPageModel {
    name: string; // 名字标题 最好以场景命名
    routeUrl: string; // 跳转路由
    imgUrl: string; // 缩略图地址
    component: string; // 包含组件 逗号分隔
    tip: string; // 标签（颜色、情感） 逗号分隔
}


@Component({
    selector: 'app-style-layout',
    templateUrl: 'style-layout.page.html',
    styleUrls: ['style-layout.page.scss']
})

export class StyleLayoutPage implements OnInit {

    // 类别分类
    _type = {
        all: "全部",
        details: "详情页面",
        my: "我的",
        home: "首页",
        search: "筛选、搜索、排序",
        checkin: "签到",
        list: "列表页",
        grid: "九宫格",
        login: "登录页",
        alert: "弹窗",
        step: "步骤",
        form: "表单类",
        navigation: "ABCD导航",
    };

    _typeArr = [];

    selectVal;


    // @all 页面配置写这里
    pagaInfoConfig = [
        {
            name: "首页-保险", // 名字标题 最好以场景命名
            type: "home", // 分类
            routeUrl: "/m2/tab2", // 跳转路由
            imgUrl: "assets/imgs/demo/style-layout/home1.png", // 缩略图地址
            component: "轮播图，卡片，筛选，排序，跑马灯", // 包含组件 逗号分隔
            tip: "小清新，瀑布流，海报", // 标签（颜色、情感） 逗号分隔
        },
        {
            name: "样式布局页", // 名字标题 最好以场景命名
            type: "list", // 分类
            routeUrl: "/m2/styleLayout", // 跳转路由
            imgUrl: "assets/imgs/demo/style-layout/style-layout.png", // 缩略图地址
            component: "卡片，瀑布流", // 包含组件 逗号分隔
            tip: "小清新，瀑布流，海报", // 标签（颜色、情感） 逗号分隔
        },
        {
            name: "测试tab2", // 名字标题 最好以场景命名
            type: "home", // 分类
            routeUrl: "/m2/styleLayout", // 跳转路由
            imgUrl: "assets/imgs/demo/style-layout/style-layout.png", // 缩略图地址
            component: "卡片，瀑布流", // 包含组件 逗号分隔
            tip: "小清新，瀑布流，海报", // 标签（颜色、情感） 逗号分隔
        },
        {
            name: "样式布局页", // 名字标题 最好以场景命名
            type: "form", // 分类
            routeUrl: "/m2/styleLayout", // 跳转路由
            imgUrl: "assets/imgs/demo/style-layout/style-layout.png", // 缩略图地址
            component: "卡片，瀑布流", // 包含组件 逗号分隔
            tip: "小清新，瀑布流，海报", // 标签（颜色、情感） 逗号分隔
        }
    ];

    pageInfo = [];
    searchValue;

    navListShow = true;

    constructor(public router: Router) {

    }

    ngOnInit() {
        for (const _name in this._type) {
            this._typeArr.push({val: _name, name: this._type[_name]});
            // console.log('_name', _name, '_type[_name]', this._type[_name]);
        }
        this.selectVal = "all";

        this.pageInfo = this.pagaInfoConfig;
    }

    jumpPage(_item) {
        this.router.navigate([_item.routeUrl], {
            // 留个传值接口
            queryParams: {
                postinfo: _item
            }
        });
    }

    search(_event) {
        // console.log(_event);
        // console.log('this.searchValue', this.searchValue);

        if (this.searchValue == null || typeof this.searchValue === "undefined" || this.searchValue === '') {
            this.pageInfo = this.pagaInfoConfig;
        } else {
            this.pageInfo = this.pagaInfoConfig.filter(_obj => {
                const _str = JSON.stringify(_obj);
                return _str.indexOf(this.searchValue) > -1 ? true : false;
            });
        }

    }

    ionChange($event) {
        if (this.selectVal === "all") {
            this.pageInfo = this.pagaInfoConfig;
        } else {
            this.pageInfo = this.pagaInfoConfig.filter(obj => {
                return obj.type === this.selectVal;
            });
        }

        // console.log($event);
    }


    navFun(_val) {
        this.selectVal = _val;
        if (this.selectVal === "all") {
            this.pageInfo = this.pagaInfoConfig;
        } else {
            this.pageInfo = this.pagaInfoConfig.filter(obj => {
                return obj.type === this.selectVal;
            });
        }
        this.navListShow = false;
    }
}
