import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RamalPageRoutingModule } from './ramal-routing.module';

import { RamalPage } from './ramal.page';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RamalPageRoutingModule,
    TableModule
  ],
  declarations: [RamalPage]
})
export class RamalPageModule {}
