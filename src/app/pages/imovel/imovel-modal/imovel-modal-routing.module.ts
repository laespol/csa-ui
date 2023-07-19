import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImovelModalPage } from './imovel-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ImovelModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImovelModalPageRoutingModule {}
