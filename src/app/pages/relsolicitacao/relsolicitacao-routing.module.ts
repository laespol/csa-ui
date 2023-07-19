import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelsolicitacaoPage } from './relsolicitacao.page';

const routes: Routes = [
  {
    path: '',
    component: RelsolicitacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelsolicitacaoPageRoutingModule {}
