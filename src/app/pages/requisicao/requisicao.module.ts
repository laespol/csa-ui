import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequisicaoPageRoutingModule } from './requisicao-routing.module';

import { RequisicaoPage } from './requisicao.page';

import {TableModule} from 'primeng/table';

import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequisicaoPageRoutingModule,
    TableModule,
    MultiSelectModule,
    DropdownModule
  ],
  declarations: [RequisicaoPage]
})
export class RequisicaoPageModule {}
