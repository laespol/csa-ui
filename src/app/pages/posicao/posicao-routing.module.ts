import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosicaoPage } from './posicao.page';

const routes: Routes = [
  {
    path: '',
    component: PosicaoPage
  },
  {
    path: 'posicao-modal',
    loadChildren: () => import('./posicao-modal/posicao-modal.module').then( m => m.PosicaoModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosicaoPageRoutingModule {}