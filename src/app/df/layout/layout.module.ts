import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {TabsPageModule} from './tabs/tabs.module';
import {MenusPageModule} from './menus/menus.module';



const SETTINGDRAWER = [];

const COMPONENTS = [
  ...SETTINGDRAWER
];

const HEADERCOMPONENTS = [

];
const PASSPORT = [
];

@NgModule({
  imports: [
    SharedModule,
      TabsPageModule,
      MenusPageModule
  ],
  entryComponents: SETTINGDRAWER,
  declarations: [
    ...COMPONENTS,
    ...HEADERCOMPONENTS,
    ...PASSPORT,
  ],
  exports: [
    ...COMPONENTS,
    ...PASSPORT
  ]
})
export class LayoutModule { }
