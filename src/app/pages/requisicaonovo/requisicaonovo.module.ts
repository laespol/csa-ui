import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequisicaonovoPageRoutingModule } from './requisicaonovo-routing.module';

import { RequisicaonovoPage } from './requisicaonovo.page';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import { PdfViewerModule  } from 'ng2-pdf-viewer';
import { FileUploadModule } from 'primeng/fileupload';
import {InputMaskModule} from 'primeng/inputmask';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequisicaonovoPageRoutingModule,
    TableModule,
    PdfViewerModule,
    CurrencyMaskModule,
    FileUploadModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,
    ButtonModule,
    InputMaskModule
  ],
  declarations: [RequisicaonovoPage]
})
export class RequisicaonovoPageModule {}
