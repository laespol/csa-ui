import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Unidade } from '../../interfaces/unidade';
import { UnidadeService } from '../../services/unidade.service';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';

import { UnidadeModalPage } from './unidade-modal/unidade-modal.page';


@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.page.html',
  styleUrls: ['./unidade.page.scss'],
})
export class UnidadePage implements OnInit {
  dataAtual = new Date;

  data1: Date = null;

  unidade: Unidade = {
    idunidade: 0,
    nome: '',
    status: '',
    idimovel: 0,
    imagem1: null,
    imagem2 : null,
    centrocusto : '',
    imovel: {
      idimovel: 0,
      nome: '',
      status: ''
    }
  };

  unidades: Unidade[];
  unidades1: Unidade[];

  selectedUnidade: Unidade;

  constructor(
    private uiService: UiServiceService,
    private unidadeService: UnidadeService,
    public modalController: ModalController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.validaToken();
    this.getUnidades();
  }

  async getUnidades() {
    await this.unidadeService.consultaUnidades();
    this.unidades = this.unidadeService.unidades;
    this.unidades1 = this.unidades
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
    this.unidade = event.data;
    this.presentModal();
  }

  async presentModal() {
    this.unidadeService.unidade = this.unidade;
    const modal = await this.modalController.create({
      component: UnidadeModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        this.getUnidades();
      });
    return await modal.present();
  }

  async novo() {
    this.unidade.idunidade = 0;
    this.unidade.nome = '';
    this.unidade.status = '';
    this.unidade.idimovel = 0;
    this.unidade.centrocusto = '';
    this.presentModal();
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.unidades);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "unidades");
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