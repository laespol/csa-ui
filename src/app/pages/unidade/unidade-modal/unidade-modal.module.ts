import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UnidadeModalPageRoutingModule } from './unidade-modal-routing.module';

import { UnidadeModalPage } from './unidade-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnidadeModalPageRoutingModule
  ],
  declarations: [UnidadeModalPage]
})
export class UnidadeModalPageModule { }
