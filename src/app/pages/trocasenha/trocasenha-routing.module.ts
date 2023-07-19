import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrocasenhaPage } from './trocasenha.page';

const routes: Routes = [
  {
    path: '',
    component: TrocasenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrocasenhaPageRoutingModule {}
