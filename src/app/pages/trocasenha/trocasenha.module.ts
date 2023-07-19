import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrocasenhaPageRoutingModule } from './trocasenha-routing.module';

import { TrocasenhaPage } from './trocasenha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrocasenhaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TrocasenhaPage]
})
export class TrocasenhaPageModule {}
