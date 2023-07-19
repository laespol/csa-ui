import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratorelatorioPageRoutingModule } from './contratorelatorio-routing.module';

import { ContratorelatorioPage } from './contratorelatorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratorelatorioPageRoutingModule
  ],
  declarations: [ContratorelatorioPage]
})
export class ContratorelatorioPageModule {}
