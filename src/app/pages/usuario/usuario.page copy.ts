import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';

import { UsuarioModalPage } from './usuario-modal/usuario-modal.page';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  dataAtual = new Date;

  data1: Date = null;

  usuario: Usuario = {
    idusuario: 0,
    nome: '',
    email: '',
    cpf: '',
    dtnascimento: null,
    sexo: '',
    status: '',
    idnivel: 0,
    trocasenha: true,
    iddepartamento: 0,
    senha: '',
    ramaln: '',
    celular: '',
    idmenu: 0,
    chatid: '',
    Nivel: {
      idnivel: 0,
      nome: '',
      idusercreateAt: 0,
      createdAt: null,
      iduserupdatedAt: 0,
      updatedAt: null,
      status: '',
    },
    Departamento: {
      iddepartamento: 0,
      nome: '',
      centrocusto: '',
      idusercreateAt: 0,
      createdAt: null,
      iduserupdatedAt: 0,
      updatedAt: null,
      status: '',
    }
  };

  usuarios: Usuario[];
  usuarios1: Usuario[];

  selectedUsuario: Usuario;

  constructor(
    private uiService: UiServiceService,
    private usuarioService: UsuarioService,
    public modalController: ModalController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.validaToken();
    this.getUsuarios();
  }

  async getUsuarios() {
    await this.usuarioService.consultaUsuarios();
    console.log("Usuarios =" + JSON.stringify(this.usuarioService.usuarios));
    this.usuarios = this.usuarioService.usuarios;
    this.usuarios1 = this.usuarios
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
    this.usuario = event.data;
    this.presentModal();
  }

  async presentModal() {
    this.usuarioService.usuario = this.usuario;
    const modal = await this.modalController.create({
      component: UsuarioModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        this.getUsuarios();
      });
    return await modal.present();
  }

  async novo() {
    this.presentModal();
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.usuarios);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "products");
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