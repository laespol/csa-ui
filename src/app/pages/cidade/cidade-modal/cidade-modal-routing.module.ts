import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadeModalPage } from './cidade-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CidadeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CidadeModalPageRoutingModule {}
