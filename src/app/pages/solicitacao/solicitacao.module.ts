import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacaoPageRoutingModule } from './solicitacao-routing.module';

import { SolicitacaoPage } from './solicitacao.page';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileUploadModule,
    ReactiveFormsModule,
    SolicitacaoPageRoutingModule
  ],
  declarations: [SolicitacaoPage]
})
export class SolicitacaoPageModule {}
