import {NgModule, Optional, SkipSelf} from '@angular/core';

import { RouteRoutingModule } from './routes-routing.module';
// single pages
import {SharedModule} from "../shared/shared.module";
import {throwIfAlreadyLoaded} from '../guard/module-import-guard';



const COMPONENTS = [
  // passport pages
  // single pages
];
const COMPONENTS_NOROUNT = [
];

@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: [
    ...COMPONENTS_NOROUNT,
  ]
})
export class RoutesModule {}
