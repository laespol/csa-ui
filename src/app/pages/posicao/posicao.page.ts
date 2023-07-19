import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Posicao } from '../../interfaces/posicao';
import { PosicaoService } from '../../services/posicao.service';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';

import { PosicaoModalPage } from './posicao-modal/posicao-modal.page';


@Component({
  selector: 'app-posicao',
  templateUrl: './posicao.page.html',
  styleUrls: ['./posicao.page.scss'],
})
export class PosicaoPage implements OnInit {
  dataAtual =new Date;

  data1 :Date= null;

  posicao: Posicao = {
    statuscompra: '',
    nome: '',
    status: '',
  };

  posicaos: Posicao[];
  posicaos1: Posicao[];

  selectedPosicao: Posicao;

  constructor(
    private uiService: UiServiceService,
    private posicaoService: PosicaoService,
    public modalController: ModalController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.validaToken();
    this.getPosicaos();
  }

  async getPosicaos() {
    await this.posicaoService.consultaPosicaos();
    this.posicaos = this.posicaoService.posicaos;
    this.posicaos1 = this.posicaos
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
    this.posicao = event.data;
    this.presentModal();
  }

  async presentModal() {
    this.posicaoService.posicao = this.posicao;
    const modal = await this.modalController.create({
      component: PosicaoModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
    .then((data) => {
       this.getPosicaos();
  });
    return await modal.present();
  }

  async novo(){
    this.posicao.statuscompra = "";
    this.posicao.nome = '';
    this.posicao.status = '';
    this.presentModal();
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.posicaos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "posicoes");
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
