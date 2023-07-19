import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficorequisicaoPage } from './graficorequisicao.page';

const routes: Routes = [
  {
    path: '',
    component: GraficorequisicaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficorequisicaoPageRoutingModule { }
