import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioModalPage } from './usuario-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioModalPageRoutingModule {}
