import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RamalPage } from './ramal.page';

const routes: Routes = [
  {
    path: '',
    component: RamalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RamalPageRoutingModule {}
