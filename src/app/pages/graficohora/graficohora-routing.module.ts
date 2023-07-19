import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficohoraPage } from './graficohora.page';

const routes: Routes = [
  {
    path: '',
    component: GraficohoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficohoraPageRoutingModule { }
