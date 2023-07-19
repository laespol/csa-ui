import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosicaoPageRoutingModule } from './posicao-routing.module';

import { PosicaoPage } from './posicao.page';

import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosicaoPageRoutingModule,
    TableModule
  ],
  declarations: [PosicaoPage]
})
export class PosicaoPageModule {}
