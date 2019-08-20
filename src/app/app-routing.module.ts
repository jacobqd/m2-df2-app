import { NgModule } from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy:  NoPreloading, enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
