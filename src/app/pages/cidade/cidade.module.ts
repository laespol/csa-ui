import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TableModule} from 'primeng/table';

import { CidadePageRoutingModule } from './cidade-routing.module';

import { CidadePage } from './cidade.page';

import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  imports: [
    TableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CidadePageRoutingModule,
    DropdownModule
  ],
  declarations: [CidadePage]
})
export class CidadePageModule {}
