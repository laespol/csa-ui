import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelsolicitacaoPageRoutingModule } from './relsolicitacao-routing.module';

import { RelsolicitacaoPage } from './relsolicitacao.page';

import {TableModule} from 'primeng/table';

import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelsolicitacaoPageRoutingModule,
    TableModule,
    MultiSelectModule,
    DropdownModule
  ],
  declarations: [RelsolicitacaoPage]
})
export class RelsolicitacaoPageModule {}
