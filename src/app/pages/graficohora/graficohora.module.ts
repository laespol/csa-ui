import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficohoraPageRoutingModule } from './graficohora-routing.module';

import { GraficohoraPage } from './graficohora.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    GraficohoraPageRoutingModule
  ],
  declarations: [GraficohoraPage]
})
export class GraficohoraPageModule { }
