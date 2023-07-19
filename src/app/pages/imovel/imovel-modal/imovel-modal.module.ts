import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ImovelModalPageRoutingModule } from './imovel-modal-routing.module';

import { ImovelModalPage } from './imovel-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImovelModalPageRoutingModule
  ],
  declarations: [ImovelModalPage]
})
export class ImovelModalPageModule { }
