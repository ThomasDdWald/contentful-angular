import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {BlockHeaderStageComponent} from './templates/header-stage/header-stage';

const routes: Routes = [
  { path: '', component: BlockHeaderStageComponent, outlet: 'header' },
  { path: '', component: HomeComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
