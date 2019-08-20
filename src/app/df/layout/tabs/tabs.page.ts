import { Component } from '@angular/core';
import {TabsUtilsService} from '../../core/services/menu/tabs-utils.service';
import {Menu} from '../../core/services/menu/menu';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabs: Menu[];
  constructor(private tabsUtil: TabsUtilsService) {
    this.tabs = this.tabsUtil.getTabs();
  }
}
