import {Component, OnInit} from '@angular/core';
import {AppData} from '../../../../df-ext/app-data';
import {RUNMODE} from '../../../core/enum/layout';

@Component({
  selector: 'm2-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  is_menus_mode = AppData.config.runMode === RUNMODE.MENUS;
  is_nohead_mode = AppData.config.runMode === RUNMODE.WECHAT || AppData.config.runMode === RUNMODE.DINGTALK;
  constructor() { }

  ngOnInit() {
  }

}
@Component({
    selector: 'm2-layout-header-title',
    template: `
        <ng-content></ng-content>
    `,
    styles: ['']
})
export class LayoutHeaderTitleComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}
@Component({
    selector: 'm2-layout-header-button-start',
    template: `
        <ng-content></ng-content>
    `,
    styles: ['']
})
export class LayoutHeaderButtonStartComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}
@Component({
    selector: 'm2-layout-header-button-end',
    template: `
        <ng-content></ng-content>
    `,
    styles: ['']
})
export class LayoutHeaderButtonEndComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}
