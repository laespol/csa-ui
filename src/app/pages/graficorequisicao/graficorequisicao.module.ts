import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficorequisicaoPageRoutingModule } from './graficorequisicao-routing.module';

import { GraficorequisicaoPage } from './graficorequisicao.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    GraficorequisicaoPageRoutingModule
  ],
  declarations: [GraficorequisicaoPage]
})
export class GraficorequisicaoPageModule { }
