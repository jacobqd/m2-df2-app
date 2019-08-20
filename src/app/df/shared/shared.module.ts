import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule, KeyValue} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {DateTostrPipe} from '../common/pipes/format/dateTostr';
import {OrgPipe} from '../common/pipes/org/org-pipe';
import {SysDictPipe} from '../common/pipes/sys-dict/sys-dict-pipe';
import {SysDictMultiplePipe} from '../common/pipes/sys-dict/sys-dict-multiple-pipe';
import {FilterStrPipe} from '../common/pipes/util/filter-str-pipe';

import {MenuShowPipe} from '../common/pipes/util/menu-show.pipe';


import {CNCurrencyPipe} from '../common/pipes/util/cn-currency.pipe';
import {YNPipe} from '../common/pipes/util/yn.pipe';
import {IonicModule} from '@ionic/angular';
import {
    LayoutHeaderButtonEndComponent,
    LayoutHeaderButtonStartComponent,
    LayoutHeaderComponent, LayoutHeaderTitleComponent
} from '../common/components/layout-header/layout-header.component';
import {NavtoComponent} from '../common/components/navto/navto.component';
import {throwIfAlreadyLoaded} from '../guard/module-import-guard';


// #region third libs
const THIRDMODULES = [];
// #endregion

// #region your componets & directives
const COMPONENTS = [
    LayoutHeaderComponent,
    LayoutHeaderButtonEndComponent,
    LayoutHeaderButtonStartComponent,
    LayoutHeaderTitleComponent,
    NavtoComponent,
];
const DIRECTIVES = [];
const PIPES = [
    DateTostrPipe,
    OrgPipe,
    SysDictPipe,
    SysDictMultiplePipe,
    FilterStrPipe,
    MenuShowPipe,
    CNCurrencyPipe,
    YNPipe,
];

// #endregion

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        // third libs

        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ],
    exports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ]
})
export class SharedModule {
}
