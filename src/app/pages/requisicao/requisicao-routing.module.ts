import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequisicaoPage } from './requisicao.page';

const routes: Routes = [
  {
    path: '',
    component: RequisicaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequisicaoPageRoutingModule {}
