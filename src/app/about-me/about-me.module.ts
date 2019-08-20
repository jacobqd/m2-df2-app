import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AboutMePage } from './about-me.page';
import {SharedModule} from '../df/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AboutMePage
  },
  {
    path: "information",
    loadChildren: () => import("src/app/about-me/information/information.module").then(m => m.InformationPageModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutMePage]
})
export class AboutMePageModule {}
