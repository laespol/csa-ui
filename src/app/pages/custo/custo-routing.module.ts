import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustoPage } from './custo.page';

const routes: Routes = [
  {
    path: '',
    component: CustoPage
  },
  {
    path: 'custo-modal',
    loadChildren: () => import('./custo-modal/custo-modal.module').then( m => m.CustoModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustoPageRoutingModule {}
