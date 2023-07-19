import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustoPageRoutingModule } from './custo-routing.module';

import { CustoPage } from './custo.page';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustoPageRoutingModule,
    TableModule
  ],
  declarations: [CustoPage]
})
export class CustoPageModule {}
