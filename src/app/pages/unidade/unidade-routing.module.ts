import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadePage } from './unidade.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadePage
  },
  {
    path: 'unidade-modal',
    loadChildren: () => import('./unidade-modal/unidade-modal.module').then( m => m.UnidadeModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadePageRoutingModule {}
