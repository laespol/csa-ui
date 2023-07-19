import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PosicaoModalPageRoutingModule } from './posicao-modal-routing.module';

import { PosicaoModalPage } from './posicao-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosicaoModalPageRoutingModule
  ],
  declarations: [PosicaoModalPage]
})
export class PosicaoModalPageModule { }
