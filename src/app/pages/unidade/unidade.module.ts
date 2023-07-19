import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnidadePageRoutingModule } from './unidade-routing.module';

import { UnidadePage } from './unidade.page';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnidadePageRoutingModule,
    TableModule
  ],
  declarations: [UnidadePage]
})
export class UnidadePageModule {}
