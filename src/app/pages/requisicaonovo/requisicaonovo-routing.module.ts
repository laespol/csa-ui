import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequisicaonovoPage } from './requisicaonovo.page';

const routes: Routes = [
  {
    path: '',
    component: RequisicaonovoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequisicaonovoPageRoutingModule {}
