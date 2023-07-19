import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadePage } from './cidade.page';

const routes: Routes = [
  {
    path: '',
    component: CidadePage
  },
  {
    path: 'cidade-modal',
    loadChildren: () => import('./cidade-modal/cidade-modal.module').then( m => m.CidadeModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CidadePageRoutingModule {}
