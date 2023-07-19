import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosicaoModalPage } from './posicao-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PosicaoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosicaoModalPageRoutingModule {}
