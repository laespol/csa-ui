import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoranovoPageRoutingModule } from './horanovo-routing.module';

import { HoranovoPage } from './horanovo.page';

import { InputMaskModule } from 'primeng/inputmask';
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
    HoranovoPageRoutingModule,
    CurrencyMaskModule,
    InputMaskModule,
  ],
  declarations: [HoranovoPage]
})
export class HoranovoPageModule {}
