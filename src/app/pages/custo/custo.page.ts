import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Custo } from '../../interfaces/custo';
import { CustoService } from '../../services/custo.service';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';

import { CustoModalPage } from './custo-modal/custo-modal.page';


@Component({
  selector: 'app-custo',
  templateUrl: './custo.page.html',
  styleUrls: ['./custo.page.scss'],
})
export class CustoPage implements OnInit {
  dataAtual =new Date;

  data1 :Date= null;

  custo : Custo = {
    idcusto: 0,
    nome: '',
    idimovel : 0,
    status: '',
    imovel : {
      idimovel: 0,
      nome: '',
      status: ''
    }
};

  custos: Custo[];
  custos1: Custo[];

  selectedCusto: Custo;

  constructor(
    private uiService: UiServiceService,
    private custoService: CustoService,
    public modalController: ModalController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.validaToken();
    this.getCustos();
  }

  async getCustos() {
    await this.custoService.consultaCustos();
    this.custos = this.custoService.custos;
    this.custos1 = this.custos
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

  async onRowSelect(event) {
    this.custo = event.data;
    this.presentModal();
  }

  async presentModal() {
    this.custoService.custo = this.custo;
    const modal = await this.modalController.create({
      component: CustoModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
    .then((data) => {
       this.getCustos();
  });
    return await modal.present();
  }

  async novo(){
    this.custo.idcusto = 0;
    this.custo.nome = '';
    this.custo.status = '';
    this.presentModal();
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.custos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "custos");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

  clear(table: Table) {
    table.clear();
}

}