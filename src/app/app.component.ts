import {Component, QueryList, ViewChildren} from '@angular/core';

import {IonRouterOutlet, Platform} from '@ionic/angular';
import {M2Entrance} from './df/core/services/m2-entrance';
import {M2Toast} from './df/layout/setting/m2.toast';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private m2plat: M2Entrance,
    private m2Toast: M2Toast
  ) {
    window.localStorage.setItem("appComponent" , new Date().toISOString());
    console.log("AppComponent构造时间：" + new Date());
    this.initializeApp();

  }

  async initializeApp() {
    try {
      await this.platform.ready();
      await this.m2plat.ready();
      // 下面可以执行项目中需要在app启动时初始化的代码

    } catch (e) {
      this.m2Toast.presentWarningToast(e).then();
    }
  }
}
