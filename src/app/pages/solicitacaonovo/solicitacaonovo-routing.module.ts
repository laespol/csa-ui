import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacaonovoPage } from './solicitacaonovo.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaonovoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacaonovoPageRoutingModule {}
