import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImovelPage } from './imovel.page';

const routes: Routes = [
  {
    path: '',
    component: ImovelPage
  },
  {
    path: 'imovel-modal',
    loadChildren: () => import('./imovel-modal/imovel-modal.module').then( m => m.ImovelModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImovelPageRoutingModule {}
