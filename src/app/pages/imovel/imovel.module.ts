import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImovelPageRoutingModule } from './imovel-routing.module';

import { ImovelPage } from './imovel.page';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImovelPageRoutingModule,
    TableModule
  ],
  declarations: [ImovelPage]
})
export class ImovelPageModule {}

