import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Imovel } from '../../interfaces/imovel';
import { ImovelService } from '../../services/imovel.service';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';

import { ImovelModalPage } from './imovel-modal/imovel-modal.page';


@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.page.html',
  styleUrls: ['./imovel.page.scss'],
})
export class ImovelPage implements OnInit {
  dataAtual =new Date;

  data1 :Date= null;

  imovel: Imovel = {
    idimovel: 0,
    nome: '',
    status: ''
  };

  imovels: Imovel[];
  imovels1: Imovel[];

  selectedImovel: Imovel;

  constructor(
    private uiService: UiServiceService,
    private imovelService: ImovelService,
    public modalController: ModalController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.validaToken();
    this.getImovels();
  }

  async getImovels() {
    await this.imovelService.consultaImovels();
    this.imovels = this.imovelService.imovels;
    this.imovels1 = this.imovels
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
    this.imovel = event.data;
    this.presentModal();
  }

  async presentModal() {
    this.imovelService.imovel = this.imovel;
    const modal = await this.modalController.create({
      component: ImovelModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
    .then((data) => {
       this.getImovels();
  });
    return await modal.present();
  }

  async novo(){
    this.imovel.idimovel = 0;
    this.imovel.nome = '';
    this.imovel.status = '';
    this.presentModal();
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.imovels);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "imovels");
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