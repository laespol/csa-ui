import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadeModalPage } from './unidade-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadeModalPageRoutingModule {}
