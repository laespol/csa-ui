import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratonovoPage } from './contratonovo.page';

const routes: Routes = [
  {
    path: '',
    component: ContratonovoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratonovoPageRoutingModule {}
