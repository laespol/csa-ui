import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CustoModalPageRoutingModule } from './custo-modal-routing.module';

import { CustoModalPage } from './custo-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustoModalPageRoutingModule
  ],
  declarations: [CustoModalPage]
})
export class CustoModalPageModule { }
