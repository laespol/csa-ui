import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UsuarioModalPageRoutingModule } from './usuario-modal-routing.module';

import { UsuarioModalPage } from './usuario-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioModalPageRoutingModule
  ],
  declarations: [UsuarioModalPage]
})
export class UsuarioModalPageModule { }
