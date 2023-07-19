import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import { LoginService } from './../../services/login.service';
import { UiServiceService } from '../../services/ui-service.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { Registro } from 'src/app/interfaces/login';
import { LazyLoadEvent } from 'primeng/api';
import { Coluna } from '../../interfaces/coluna';
import { ColunaService } from 'src/app/services/coluna.service';
import { Usuariocoluna } from 'src/app/interfaces/usuariocoluna';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Hora } from 'src/app/interfaces/hora';
import { HoraService } from 'src/app/services/hora.service';
import { Documento } from 'src/app/interfaces/documento';


import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { CidadeModalPage } from './cidade-modal/cidade-modal.page';
import { GeradospdfService } from 'src/app/services/geradospdf.service';
import { Geradospdf } from 'src/app/interfaces/geradospdf';
import { Gestor } from 'src/app/interfaces/gestor';
//import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.page.html',
  styleUrls: ['./cidade.page.scss'],
})
export class CidadePage implements OnInit {

  noselect: boolean = true;

  geradospdf: Geradospdf = {
    idgeradospdf: 0,
    programa: '',
    codigo: null,
    createdAt: null,
    iduserupdatedAt: 0,
    updatedAt: null,
    status: '',
  }

  idimovel: string = '0';

  dt22: string = '';

  sortField: string = '';

  documento: Documento;

  dataAtual: string = "";

  datainicio: string = '';
  datafinal: string = '';
  dtcompini: string = '';
  dtcompfim: string = '';

  usuarios: Usuario[];

  selectedHora: Hora;
  selectedHoras: Hora[];

  selectedColumns: Coluna[];

  lista: any = [];
  Heading: any = []
  cabec: string[] = [];
  linha: string[] = [];
  renovauto: string;
  aprovado: string;
  periodo: string;
  iddocumento: string;
  dtviginicio: string;
  dtasscont: string;
  dtrecdoc: string;
  createdAt: string;
  updatedAt: string;

  cols: Coluna[];
  colsgeral: Coluna[] = [];
  usuariocolunas: Usuariocoluna[] = [];
  colunas: Coluna[];
  colunasGeral: Coluna[];
  tabela: string = "";
  coluna: Coluna = {
    idcoluna: 0,
    programa: '',
    field: '',
    header: '',
    style: '',
    type: '',
    agregado1: '',
    agregado2: '',
    ordena: '',
    idusercreateAt: 0,
    createdAt: null,
    iduserupdatedAt: 0,
    updatedAt: null,
    status: '',
    filtra: false
  };

  observacao: string = '';

  posicao: LazyLoadEvent;

  totalRecords: number;

  loading: boolean;

  mobile: Boolean = false;
  vira: Boolean = false;

  hora: Hora = {
    idhora: 0,
    funcionario: '',
    chapa: '',
    datainicio: null,
    datafinal: null,
    motivo: '',
    qthoras: 0,
    status: '',
    centrocusto: '',
    departamento: '',
    idunidade: 0,
    unidade: {
      idunidade: 0,
      nome: '',
      status: '',
      idimovel: 0,
      imagem1: null,
      imagem2: null,
      centrocusto: '',
      administrativo: false,
      imovel: {
        idimovel: 0,
        nome: '',
        status: ''
      }
    },
    usuario: {
      idusuario: 0,
      nome: '',
      email: '',
      status: '',
      idnivel: 0,
      idunidade: 0,
      trocasenha: true,
      senha: '',
      ramaln: '',
      celular: '',
      chatid: '',
      idmenu: 0,
      cpf: '',
      ti: false,
      contratost: false,
      vtodoscontratos: false,
      vtodoshoraextra: false,
      ccontratos: false,
      choraextra: false,
      unidade: {
        idunidade: 0,
        nome: '',
        status: '',
        idimovel: 0,
        imagem1: null,
        imagem2: null,
        centrocusto: '',
        administrativo: false,
        imovel: {
          idimovel: 0,
          nome: '',
          status: ''
        }
      }
    }
  }



  horas: Hora[];

  registro: Registro = {
    idusuario: 0,
    nome: '',
    email: '',
    idnivel: 0,
    nivel: {
      idnivel: 0,
      nome: '',
    },
    senha: 0,
    ti: false,
    contratost: false,
    contrato: false,
    vtodoscontratos: false,
    vtodoshoraextra: false,
    ccontratos: false,
    choraextra: false,
    trocasenha: '',
    menu: {
      idmenu: 0,
      nome: '',
      Menuitem: [{
        idmenuitem: 0,
        idmenu: 0,
        seq: 0,
        titulo: '',
        url: '',
        icon: '',

      }]
    },
    unidade: {
      idunidade: 0,
      nome: '',
    }
  };

  gestor: Gestor = {
    idunidadegestor: 0,
    idunidade: 0,
    idusuario: 0,
    idusercreateAt: 0,
    createdAt: null,
    iduserupdatedAt: 0,
    updatedAt: null,
    status: '',
    usuario: {
      idusuario: 0,
      nome: '',
      email: '',
      cpf: '',
      dtnascimento: '',
      sexo: '',
      status: '',
      idnivel: 0,
      trocasenha: true,
      senha: '',
      ramaln: '',
      celular: '',
      idunidade: 0,
      idmenu: 0,
      chatid: '',
      ti: true,
      contratost: true,
      vtodoscontratos: false,
      vtodoshoraextra: false,
      ccontratos: false,
      choraextra: false,
    }
  }

  usuario: Usuario = {
    idusuario: 0,
    nome: '',
    email: '',
    cpf: '',
    dtnascimento: '',
    sexo: '',
    status: '',
    idnivel: 0,
    trocasenha: true,
    senha: '',
    ramaln: '',
    celular: '',
    idunidade: 0,
    idmenu: 0,
    chatid: '',
    ti: true,
    contratost: true,
    vtodoscontratos: false,
    vtodoshoraextra: false,
    ccontratos: false,
    choraextra: false,
  }

  constructor(
    private uiService: UiServiceService,
    private loginService: LoginService,
    private navCtrl: NavController,
    public modalController: ModalController,
    public alertController: AlertController,
    private screenOrientation: ScreenOrientation,
    public platform: Platform,
    private datePipe: DatePipe,
    private horaService: HoraService,
    private currencyPipe: CurrencyPipe,
    private usuarioService: UsuarioService,
    private colunaService: ColunaService,
    //    private sanitizer: DomSanitizer,
    private geradospdfService: GeradospdfService
  ) {

    this.platform = platform;
    if (this.platform.is('android')) {
      this.mobile = true;
    }
    if (this.platform.is('ios')) {
      this.mobile = true;
    }
  }

  ngOnInit() {
    this.inicio();
  }

  async inicio() {
    await this.consultaColuna();
    this.posicao = this.horaService.posicao;
    this.dt22 = this.horaService.dt22;

    await this.consultaUsuario();
    //   console.log("inicio = ");
    //    await this.LoadItcompra(this.posicao);
  }

  async consultaUsuario() {
    await this.usuarioService.consultaUsuarios;
    this.usuarios = this.usuarioService.usuarios;
  }

  async consultaColuna() {

    this.coluna.programa = 'hora';
    await this.colunaService.consultaColunaDetail(this.coluna);
    this.cols = this.colunaService.colunas;
    await this.colunaService.consultaColunaDetailUsuario(this.coluna);
    this.usuariocolunas = this.colunaService.usuariocolunas;
    if (this.usuariocolunas != null || this.usuariocolunas != undefined) {
      for (let i = 0; i < this.usuariocolunas.length; i++) {
        this.colsgeral.push(this.usuariocolunas[i].coluna);
      }
      this.selectedColumns = this.colsgeral;
    } else {
      this.selectedColumns = this.cols;
    }
  }

  async setColumnsDefaultValue() {
    this.selectedColumns = this.cols;
  }

  async save() {
    await this.colunaService.gravaColuna(this.selectedColumns, this.coluna.programa);
  }


  async exportExcel(event: LazyLoadEvent) {

    this.loginService.validaToken();

    if (event.sortField == undefined) {
      event.sortField = 'razaosocial';
      event.sortOrder = 0;
    }
    if (event.globalFilter == undefined) {
      if (this.horaService.dt22 != '') {
        event.globalFilter = this.dt22;
      } else {
        event.globalFilter = 'undefined';
      }
    }

    //    console.log("event = " + JSON.stringify(event));
    for (let prop in event.filters) {
      console.log("prop" + JSON.stringify(prop));
      if (prop == 'global') {
        //        this.idimovel = '0'
      } else {
        let filterField: string = prop;
        //        console.log("filterField " + JSON.stringify(filterField));
        let filterMeta = event.filters[filterField];
        //      console.log("filterMeta " + JSON.stringify(filterMeta[0].value));
        if (filterMeta[0].value == null) {
          this.idimovel = '0';
          //      console.log("this.idimovel true " + this.idimovel);
        } else {
          this.idimovel = JSON.stringify(filterMeta[0].value.idimovel);
          //    console.log("this.idimovel false " + this.idimovel);
        }
      }
      //     this.idimovel = JSON.stringify(filterMeta[0].value.idimovel);
    }
    event.first = 0;
    event.rows = 9999999;
    await this.horaService.consultaHoras(event.first, event.rows, event.sortField, event.sortOrder, event.globalFilter, this.idimovel);

    //  await this.contratoService.getContratogeral();
    this.horas = this.horaService.horas;

    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    this.cabec = [];
    this.linha = [];
    this.Heading = [];
    this.lista = [];

    for (let x = 0; x < this.selectedColumns.length; x++) {
      this.cabec[x] = this.selectedColumns[x].header;
    }
    this.Heading.push(this.cabec);

    for (let i = 0; i < this.horas.length; i++) {
      this.linha = [];
      for (let x = 0; x < this.selectedColumns.length; x++) {
        if (this.selectedColumns[x].type == 'string') {
          this.linha[x] = this.horas[i][this.selectedColumns[x].field];
        }
        if (this.selectedColumns[x].type == 'soma') {
          this.linha[x] = this.horas[i][this.selectedColumns[x].agregado2].replace('.', ',');
        }
        if (this.selectedColumns[x].type == 'date') {
          if (this.horas[i][this.selectedColumns[x].field] == null) {
            this.dtviginicio = '';
          } else {
            this.dtviginicio = new Date(this.horas[i][this.selectedColumns[x].field]).toLocaleDateString();
          }
          this.linha[x] = this.dtviginicio;
        }
        if (this.selectedColumns[x].type == 'date1') {
          if (this.horas[i][this.selectedColumns[x].field] == null) {
            this.dtviginicio = '';
          } else {
            this.dtviginicio = new Date(this.horas[i][this.selectedColumns[x].field]).toLocaleDateString();
          }
          this.linha[x] = this.dtviginicio;
        }
        if (this.selectedColumns[x].type == 'agregate1') {
          this.linha[x] = this.horas[i][this.selectedColumns[x].field][this.selectedColumns[x].agregado1];
        }
        if (this.selectedColumns[x].type == 'agregate2') {
          this.linha[x] = this.horas[i][this.selectedColumns[x].field][this.selectedColumns[x].agregado1][this.selectedColumns[x].agregado2];
        }
        if (this.selectedColumns[x].type == 'status') {
          if (this.horas[i][this.selectedColumns[x].field]) {
            this.linha[x] = 'Sim';
          } else {
            this.linha[x] = 'Não';
          }
        }
        if (this.selectedColumns[x].type == 'stcontrato') {
          if (this.horas[i][this.selectedColumns[x].field]) {
            this.linha[x] = 'Ativo';
          } else {
            this.linha[x] = 'Finalizado';
          }
        }
      }

      this.lista.push(this.linha);
    }

    import("xlsx").then(xlsx => {
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet([]);
      xlsx.utils.sheet_add_aoa(worksheet, this.Heading, { origin: 'A2' });
      xlsx.utils.sheet_add_json(worksheet, this.lista, { origin: 'A3', skipHeader: true, });
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Horas');
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `horas`);
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

  async clear(table: Table) {
    this.dt22 = '';
    this.idimovel = '0';
    this.horaService.dt22 = '';
    //   this.table.reset();
    table.clear();
  }
  async customSort(event: SortEvent) {
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

  async rotaciona() {
    if (!this.vira) {
      this.vira = true;
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } else {
      this.vira = false;
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  async LoadItcompra(event: LazyLoadEvent) {
    //    console.log("LoadItcompra");

    this.loginService.validaToken();
    this.posicao = event;
    this.horaService.posicao = event;

    //    console.log("this.posicao" + JSON.stringify(event));

    if (event.sortField == undefined) {
      event.sortField = 'datainicio';
      event.sortOrder = 0;
    }

    // console.log("sortfield");
    if (event.globalFilter == undefined) {
      if (this.horaService.dt22 != '') {
        event.globalFilter = this.dt22;
      } else {
        event.globalFilter = 'undefined';
      }
    }
    //    console.log("for");
    for (let prop in event.filters) {
      //   console.log("prop" + JSON.stringify(prop));
      if (prop == 'global') {

      } else {
        let filterField: string = prop;
        let filterMeta = event.filters[filterField];
        if (filterMeta[0].value == null) {
          this.idimovel = '0';
        } else {
          this.idimovel = JSON.stringify(filterMeta[0].value.idimovel);
        }
      }
    }
    this.loading = true;
    this.loginService.validaToken();
    this.registro = this.loginService.registro;
    //   console.log("consultaHoras");
    await this.horaService.consultaHoras(event.first, event.rows, event.sortField, event.sortOrder, event.globalFilter, this.idimovel);

    this.horas = this.horaService.horas;
    //    console.log("this.horas " + this.horas);
    this.totalRecords = this.horaService.totalRecords;
    this.loading = false;
    //   console.log("Posicao na saida do load = " + JSON.stringify(this.posicao));

  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async exclui(event) {
    await this.uiService.present({
      message: 'aguarde'
    });
    this.hora = event;
    await this.horaService.apagaHora(this.hora);
    await this.uiService.dismiss();
    this.dismiss();

    this.loading = true;
    this.LoadItcompra(this.posicao);
    this.dismiss();
  }

  async presentModal() {
    this.horaService.posicao = this.posicao;
    const modal = await this.modalController.create({
      component: CidadeModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        this.posicao = this.horaService.posicao;
        this.LoadItcompra(this.posicao);
        //      this.dismiss();
      });
    return await modal.present();
  }


  async novo() {
    this.hora.idhora = 0;
    this.hora.funcionario = '';
    this.hora.chapa = '';
    this.hora.datafinal = null;
    this.hora.datainicio = null;
    this.hora.motivo = '';
    this.hora.qthoras = 0;
    this.hora.status = '';
    this.hora.centrocusto = '';
    this.hora.departamento = '';
    this.horaService.dt22 = this.dt22;
    this.hora.usuario.idusuario = this.registro.idusuario;
    this.horaService.hora = this.hora;
    //console.log ("this.registro.nome" + this.registro.nome )
    //console.log ("this.registro.nome" + this.registro.unidade.nome )

    //    this.hora.usuario.nome = this.registro.nome;
    //    this.hora.usuario.unidade.nome = this.registro.unidade.nome;
    //  await this.presentModal();
    //this.horaService.hora = null;
    this.navCtrl.navigateRoot('menu/horanovo', { animated: true });
  }


  async apagar(event) {
    await this.uiService.present({
      message: 'aguarde'
    });

    this.horaService.posicao = this.posicao;
    this.hora = event;
    await this.horaService.apagaHora(this.hora);
    await this.uiService.dismiss();
    if (this.horaService.gravado.ok) {
      this.uiService.alertaInformativa(this.horaService.gravado.mensagem);
      this.posicao = this.horaService.posicao;
      await this.LoadItcompra(this.posicao);
    } else {
      this.uiService.alertaInformativa(this.horaService.gravado.mensagem);
    }

    await this.uiService.dismiss();
  }

  async onRowSelect(event) {
    if (this.noselect) {
      console.log("onRowSelect");
      this.hora = event.data;
      this.horaService.hora = this.hora;
      this.horaService.dt22 = this.dt22;
      //    this.horaService.posicao = this.posicao;
      this.hora = event.data;
      this.navCtrl.navigateRoot('menu/horanovo', { animated: true });
      //await this.presentModal();
      this.noselect = true;
    }
  }

  async finalizar() {

    await this.uiService.present({
      message: 'aguarde'
    });

    var santoamerico = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAD5CAYAAACd+QhdAAAAAXNSR0IArs4c6QAAIABJREFUeF7tXQd4VFUW/ie9956QhBBKIBASSuggTXqzgCgWQGyoKK4NQWRRUVGpFmRFLKiIKL0jvQUCJCEhJAQC6b0nkzb7nYtAJnUyM2/mzcw937q7n3nvlv++/Ln33HP+I5HJZDJwEzECMoBWSCIR8Rj50DgCmkFAwglLM0Ar04ustgZVhTdQXZoOc+cgGFs6E3Mp0xR/hyOgFwhwwhLrMspqUJ5xAXmXv0FFdhRsA8bBsetMmNr5inXEfFwcAcER4IQlOMSt74BO6SU39iA/aj2kOTGgM6HEyARWPoPgFDoXFq5dW98of4MjoAcIcMIS2SLKaqtQEPsLCqL/h+rSDPnRSYxg7tQJTj3mwabNEO7XEtna8eEIjwAnLOExVriH2upy5F1YicKrv6G2qrSJ9yQwtfWBc8/XYRswBpAYKdw+f5AjoOsIcMISxQrKUF2Wg7xLX6Po2hbIqstbHBU54J1CX4Zd+8kwMrVq8Xn+AEdAHxDghKXtVZTJUFl0E/mX16H4+nbIaioVHpGxuT0cus6GfadpMLZwUPg9/iBHQFcR4ISl5ZWT5sYh7+JalCQfBGQ1rR6NxNgc9kGPw7HrMzCx9mj1+/wFjoAuIcAJS4urVZZ+BrnnV6Ii8wK7CVTW6AbR2m8knMNehpljoLLN8Pc4AqJHgBOWNpZIVovim/uYg72y4Lp6RiAxhpVXHzj3eA0WbiHqaZO3whEQGQKcsDS8IBS9XpS4HXkXvmQR7Go1Cntw6QLXPgtg6d5DrU3zxjgCYkCAE5YGV4HCFoqv72A7q+qyLMF6pmOha9/3YenZCxKJsWD98IY5AppGgBOWhhCvrSpB0bWtyLv0FWrKcwXv1dTeHy6934a1z0BIjM0E7493wBHQBAKcsDSAcq20CAWxPyE/ZiNqpfka6PFOFyZW7nAKexm2geNhZMJjtTQGPO9IMAQ4YQkG7Z2Ga6RFyItcxQJCm45eF24QxpaucOw6C/adp8PIxFK4jnjLHAENICBawpLVVv+b9GuqARiE6aKmogA5EcvvBIQqEL0uzCgkTJbGIfhpOHSeobtR8TIZZLLqOz45no4kzKeiA62KkrCqilOQfWYpk1excAmGlfcAmNh6w8y+Lcg3Y2RsLnpoa6T/ktW1raCEZm2bkZktnMJegUOnaZCYWGh7OC32X1NZhMr8BFQV3UZlQQLKUk6gqvg2HIKfgVPIc9wv1yKC+vmAKAmrIusS0vY9C/qlr2/0i2fu3BnmLsGwdA+DmWNHGJlaw8jUEhT1LTGiWzHtitzVVpYg7/I6FMT8r1WpNkJ/YoSTS99FsAucwORqtGqyWtAuWlYjRU1VKWori1GReQkVOVFM/6uqILFR7Chcw+vB9TAys9Hq8Hnn2kFAlIRVmX8N6f+8jsq8+BZRkRhbwNS+LbvCN3dsDxMbL7YTozw7I1MbrRwfKrIvI23fHNRU5LU4fk0/QDvUNuM3w9jCUdNdM4KiC4jqihxUFSazHZM05wrKMyLuhHkokJpk4z8C7oOX6+7RVuOo61eHoiQsOhJmnVqMsttHW4027SIsPXvD1MYbpvYBMHfudIfALJw0Rl6VBYnIPPYOpDnRoEBRsRipOlj7DofbgCVsV6oJI5IiXa/KgiRIc6/8e8RLhDQ3BrKa1h+VHUOeYylItJvmZngIiJKwaspzkHPuMxQlbFVpRSQmlkxS2NS2DTtGWnn1Zf8rtBwLKS7QsZaSmsvSzyq0c1Bpogq8TGENth2mwDH4GYaHkEUtSDG1tqIA5Rnn2O6JCJz+CNGOCrJaBUbb1CMSeAz9ErZtR2vsj48Kg+WvCoCAKAmL/Br5Ud8h98JKNU1ZAiMTC3ZbRtf81v4j2UdvYuMJiUA3TjLSZE87i6yTi1BVlKymeSjbjATWvkPh2ncBE/8TysdHRE25kYXxm1GRcR41Fbmgm1J1XTrQHyCvB7+DlWe4skDw93QcAVESFmFadO1PZJ36QJBwALoal5haw6btKHbdb+7QTpi/2DIZMk8uRPG1P5n/RltmbO4I556vwT5omiBkJauWsp0k/ZGpyL50x1mu0k6qcaSIbD2HrWH5ktwMEwHRElbprcPMj1VdouYE4XrrLDEyhbXfMDh0eYpJsxib2amVvApjf0H2uWWQVVdo7Qszc2gH98GfwsK1m9rGQARcU5HPjn0F0d+jIjtaJYkcRQZm5d0fbgP+e+dIy80gERAtYZVnXkD2qQ9AAneaMHLiWvsNh137SbBwDYGxuYNa/DzF13ci6/gC1FaXaWIajfZBfjvPYavVUiKMLhFIZaI8PQKF8b+jIjNScKK6Oym7TlPh0nO+Vm44tbZ4vGM5BERLWCx49NRilCpxU6jKGpNqp43/g0x2mHYmqjqnixK3IfvEQpBSg7aMKu14DF0JM4cAlYZAvqjy9HMojNuEstSTGk81osBXp25zIDHhN4QqLaQOvyxawiLHe/bppcyBK4Q/pLk1I3UDh64z4Rw6V+Xr8/zoDcg9/zkLkNSWmdr5wW3gR7Dy7K3SEKqKU5F9eglKbx/RwpqYw7Xve7DvOFXlPyIqgcBf1ioCoiUsyGTsljA/er1Wftlt/EfBffAnKodAZB5/D8UJ2na6O7CyYPZBj6n0sUnzriLj0KuoLExSqR1lXja184db//dZmhY3w0VAvIT1701hTsRnGtGPqv8JmDsHwWfsL6BUIGWNorfTD7zAUk20ahJjOHSZAdfwd1S6UCjPOM9SpkjbS9Nm4d4Dbv0Ws0BgboaLgKgJi5KfM4+/g6rCG1pZIe+xv6h0jCq5eQDZp/+rfilkJdCwcA/79xc+SIm36QRIFal/Rs6Zj5R6X9WXrH2HwbXf+zC18VS1Kf6+DiMgasKqLklD2sGXIM2J0QrE1m2GwG3QxzCxdGl1/6R9lXN2GYqu/SGK9BzKHSQFUtv2E5WSTS7PuozMI2+gquhmq7FQ+QWJEew7PQbXPu9ylQaVwdTtBkRNWOSoTts/B2WppzV2dS6/nBJ2W0gCeKb2fq1aaTo+sbCMvKutek/Ih23bTYBL+NswsXJVvBuZDGUZEcg9/8W/5cgUf1VdT1ISu1PoXDh2m6WuJnk7OoqAqAmLMM059wkKYjaqLb2jtetEgaVWPgNh3/kJlhKiiD46+XjyL3+HOxcGildybu3YWvs87bLcBy0D7RwVEcEjyRcqmlEY96tWidfEyg0u4e/Att241k6ZP69nCIiesMQQeEkaW5SDSL8wdDRpKXm4IicGGf+8hqpCLRyfWvhAKafQfcjnMG5GT4pItjwrEoUxP6Is4xyThFGl0KuqvzNCROqrOib+vnYQED1hkepB6t6ZTOBN+yYBjO7cuFE8EAssrWeUgpN15iMUXf1V+8NtdAQSeA5fzYJjG4ydJWyfQ0HM9yhNOabxWKumALP0DIf3qB8gMday6KBIV9SQhiV6wiLndfIfD6K6LFNc6yIxZhWW7dpNhLlrMKtQY2Ruh4qsi0jbN1sprSdNTdDUxgs+4zczTawaaT6qStJQnnoaRde3obo4RVPDUKwfiTFsAyfAY/Cnij3Pn9JrBERPWIQ+Od5Lb/0j2oUgvxblH1p69UHprSNMuE/sZu03AkRcZSnHmfwNyeGI0SjHkxzuTt2fF+Pw+Jg0jIBOEFbO+S+Qf+lrDUPDuxMDAnRD6Dl8Lay8+4lhOHwMWkZAJwir9PYxpO3jV9pa/la00j1JW/tO2QUTq9bHwmllwLxTQRHQCcKieKykn3ppVfFA0FXgjTeJgJljB/hN2aFQGAaHUf8R0AnComVI3joelSIKwtT/T0McMyTflXPP+eIYDB+F1hHQGcIiueTC2J+1DhgfgGYR8BzxNWz8hmu2U96baBHQGcIqST7EctkozEGbQYyiXUl9G5jECEZmdvCdvI3dZnLjCBACOkNYVAW6OHEHK1suzY1l1VmowjI3PUJAQhkFTjB37ABz5y6sQK59h4e4YJ8eLbGqU9EZwmITlclQU1kEUnGoKk1nlaFLbu5nKTDa0GhSFXz+PiFgBCMLB1i4BLNSZGb2/qx6t4m1JyvNxo0jUBcBRlgyAFXVtaisvl/k0sLMCCZGRiJGSwYqL0U7L/qnJPkgSpJ2M/kTZSoKi3iiejk0EkY0d+rIksqJrCjq3sjcHpRsLnaTVtWgqoZ+a+6YtbmJqtL/Yp+yaMbHCCvqdgGmfnsaVzPk8/VMjSVws7OAt4Ml2rnaoIO7LdztzOFqaw4Pe0t4O1rCw84CZiZGbMEkYP9F/9GaUTn0gpgfUXLr4J0jowD18bQ2OZ3umD4MCUxsvGHXfjKT7WmVzI2a587oRkb/uUM8NbUyFJVXISW/HOmFFcgsuvNPSn4ZkrJLkZhVgvSCChRVVDUYyYKxQVg6uauaR8ibawwBRlhH47MwesVxlFe1Pj3DxIhIzRz+LtYI83VEiI8DfJws4WBlBlsLE7jYmMPWwhT0nImxBEbEbBqw2mopSpMPoThpByrzE1FTnoXaKqpcc/8vowaGYdhdkE/KzJYd76j4qV2nabB0C9EoJkREVTW1bEeUWyJFQVkliiqqkV0sRVJ2CSJu5CM2vQi380pRXFGt1NcxsosH9r02SKPzMtTOJDW1tbKdl9Mwee0p1LLDoXrM2EgCe0tTDOnoiu5tHGFvZQoXGzMEuNqwHRv9zMbCRHgCk9VCmp+A0luHIM29ClJ/qCnP0Zq+lnrQFXcrRiZWMLH1YYVbLd3DmG+KnOma2HtX1tSisKyKkVNSTinSCsqRX1qFnFIpDsVm4kpaISqrZWr91unUkbp8Auib5yYsApKqmlrZT6dvYuaGCGF7AtjRsaOHLTq42cLF1hzejhbo7GmPzl52aONkBSszY0EJrLaqDGWpJyDNv4bytDOQ5lzhYRLqWnWJEYwtnGHp0ZP9Q0U8LNxCITESVhKGdk95pZW4nlWC6NRCJGQWI7u4EqkF5YhOKUB2iZTuagQ1cp3krJgEO0vx+98EBUIDjUsqqmpky3bHYfH2KxroTr4LIjDygXk6WLCjo4+jJSaH+qCbjz2cbMxgbmIsyJhIoK6q+DYLjSi5sZcpFpDjXv0mgZGZDSgfzswx8N8S6xJWlKKy8AZqSrNRU1mgFj+bxNgURhZOMLX2YuEAJpbOIIImn151aQYrKy9IbUSJBKa2vrBpOwpWXn1ZsVYTKw/BQhHoiqhEWoPU/DIcisvCycQcZBZXILtIykiKyEvTRl6Om8vGwtfZWtNdG1x/klJplWzuL5HYcFL76pimxkZwtDKFlZkJI7En+vhhaJAbc/jTz9RusloWJkHO+cKrm1GcsFU9ulsSI3Ykcgh6AtZtBsPIxJJVKyapFDIiTPZPbRWqi1ORG7kSFTnRIPG/1hqRIdXqcwp7ibUvMTL793+NGRGyitPUT0U+iq7+juKkXeoRQ5QYw8yhLZN+oWOfkZk9jEwtBTn2kasir6QScRlF+O5YEk5fz4W0qhaFFVUolVYzh7m27dQ7Q9G3HU/QFnodJEXlVTK6IdwTnS50X0q372prhucGt8P4EG8Ee9vD3MQIRkbsTlKtRlH0xYnbkB/zA6qKbhGztLp9ibEFK1jq3ONVdlWvmMlQnhGB7LPL2DFVkZtNiYkFbNuOYQVSTazdFesGQGVRMrKOvoXyrIsK9SPfsIQRL2l/OfV4FVbuPQRJSqYjXI1MhqKyKhyMy8Sms8nYFZWOahEQU1NA/zCzN57q56/wOvAHlUNAUlBWKRu6/Agik/OVa0GDb9ENo6+zFR4K88GwIDf4OVvDz9kKFqbGanV40q6kOGk3I6/K/ATUSvMVKtVlYu0F516vwy5wolKo1FTkITdyNYoT/m4mEJaOYD5wDJkDu/ZTFCqKUX8wstpq5EQsR1H8ZoV2W7RrM7H2gLlbCOw7TYWlew+1+6ak1bXsBu9mTili04rwe8Rt/BOfJRcbqBSoGnrpgwldsGhCFw31ZrjdSPJKpLLQJfuRnFumUyjQ7ooIa0ZfP/i7WrNwikA3GxZKoa7QCZmsFqU39qE05SjKMyOZfDAd4xozUztfuPZ5D9a+D6iEIyl/5kWuQUHMhn8vBOSbM7XzY+oFtgGjVDp+kT8r7+JXKLjyY5PkKDGxgrlTB+Y8pwIcFq4Ua6S+fS3d6FF4AcUBXkkrwoXkPOy8nI4SabVKGGrj5TmDAvDtkz210bVB9SnJKZbKOi7YjVwtOCvVhTTtsMhR393XAT38HDGkgxsLn6C4L3UYOa8rMiNRlnaahUeQw7zusY2itl16vwm7Dg+rZedB/q28S18jP2qdXJkwuoVzG7AUNv7qUS8gnfycc5+CKhPVnQ8dNy1cuzP/m5V3fxaRrkhZMEWwJqd5YXkV29EfS8hhu6lTiTnMYa7LNrqrB3a/ymOxhF5DSXZxhcx7/g7QXztdN7qtcbY2Rzs3awS42GBab18M7OACB0tTSNQQsErO+crCJJSnn0VB7E/s9o3uzOmGzLXPAnZsUpfR8ZAkdSjdiJnEGG793mcR4mrLA5HVoiz9DLJPL2VHXwpBIME8h66zWLoMHT0VqcOoyJwp/IAiyCmE5vi1HNzMLWW7+golgpUV6U/Tz4S3dcKZBer5Q6LpsetSf5IrqYWyLov26tKYFRorBfE5WJnCzdYCM/r64vFwfxbrpQbeYuEB1WXZLCSiKOEvOHabA7vA8WrbhdyZoAzlmReRefRNViTCJmAM3Af8l0muqNPIX5dzdhnry7XPOzBzCGRBnhKJekJK6BaPdlPL9sQhOrWIhR2USZWLKFfnvNXdFsUSXllCx3RuQiIg2ROVJhu98riQfYiibQpCfqRnG8wb0QHd2ziwIFZ1+LrIgc02QAIESFKYQ17UdyiI/h88hq2CtfdA9e2u6qwKzUEiMVIL4VKAAYUZFJZVYnPEbaw8lID4ejmqovgg1DwIXycrJH/KK1OrGdYGzUnWHEqQzd0UKXQ/ommfSIr8XM8NDkB4gDNz3NuIONu+LPUUytLPwiHoMbUeOdW9INX/OtCvZRazEIRvj11HUbnuOc+VxYUCn29/No7dWHMTDgHJu1ujZB/tihOuBxG3TDFd40M80S/QBb3bOsHVxkItR0Z1Tpki1MnpT7FWQuziVB0rSRIRSZ1JysWe6Azsv5Khk7d8quLgaG2G8+8NZ5c93IRDQDLv10jZioMJwvWgAy1TStDgjm4Y3N4VY7p5sih7dRwXdWDqSg+R4qYoV2/L+RScvZGLiJt5KJW2PtBW6QGI7EVK5t89bxD6tXMW2cj0aziSORsjZOuOJenXrJSYDQVAONuYo4uXHSaGemNqrzbwtLcU3Y5Liamp9RUSr6PUGErlunS7AHHpRUy+xdCN4v82zemDcd24/ryQ34Jk+rozMkp94HYHASIuUpCkzPvXR3bA0/3bwtnazODhqa2VsZ3Up3vjcSIhh0WlizlVRtMLRt/M10+EYUZfnp4jJPaSh786KdtyIUXIPnS6bUszYywYE4RZAwOYnpeJEEnYIkWIcvqk1TWISyvC239GYX9spkhHqv1hkTTSF1O7s5xXbsIhIBmz4qhsd3SGcD3oSct0bU0f47gQT7R3t4WlHt8GkToCpcxcSS3CmsMJ2HE5je+mWviO6Xv45OFueHlYez354sU5DUm/jw7KTl3PFefoRDiqYC87PBbuiwc6uiHUz1HvrrGziqUgyWwKTdh2KRUFZY3nTopwabQ6JApnWDo5GPNHdtTqOPS9c0n3xftk5Dzl1joEKPh0VLAHpoT5sBxGQfS6WjcklZ6m4grbLqay0ITDV7NYAQZuiiNAhPX++M54e0yQ4i/xJ1uNgKTjgt0yQ4hEbjUyCrxgYWrEjofP9G+LmQPaMp16XbTT13Ow4kACjiVkI6OQE5Uya0gabe+ODcKi8VxiRhn8FH1H4jrvbxn5K7gpj0CorwN+mh2OLl72yjeipTcpjWbRthh8sf+a3iQiawNKIqy3R3fC4onB2ujeYPqUOL/6lyy3RPM62PqG8DczemDWgLY6d4sYlVIAksg+npCjb0ui0flQbup/HuzI6xMKjLrE/qWtMtLG5qYaAiQvsuXFfvBxtFKtIQ2+TdIuqw4l4P1tV/juSkXcyYf54pB2WPFYqIot8debQ0CCWb9rX8FfT9bog4ldsHBcZ7VobwkNCS365dsFmLPxPEur4aYaApywVMNP0bc5YSmKlALPUcb+Hy/0xZCObgo8rd1HyiqrsWBrNFYfThRF1RntoqF670RYLwxph5V8h6U6mM20wAlLzfCGBzhhz7xBcLQSdzrP1sgUzPohgsdZqWn9TYwkrGrO+qd7qalF3kxjCHDCUvN3Qc7XV4e1x4dTuoo2NiurSIqghXu0UnRUzXCLpjlSuKU6mlTui5twCHDCEgBbLwdLlqZBmvL0l1dMVlxRhYmrT+Cf+GwxDUvnx8IJSzNLyAlLIJx7+jviy6mh6BfoLBptrfyySny4M5b5rUh4j5v6EOCEpT4sm2uJE5aAOE8K9cInD4egvZut1nW1qBgElXn/aHccS2zmpl4EOGGpF8+mWuOEJSDOVBeRqlSveTwMdIOoLaPdFDnZF/wVjaTsUm0NQ6/75YSlmeXlhCUwzmbGRpjSwxs/zAwHpW9o2kjT6mRiDmb+cA4JmSWa7t5g+qOwhmcHBWDt42EGM2dtTJQTlgZQJ8f75DBv/DgrXONyNCRhPPKLo0jNLwePEBZusXngqHDY1m1ZYjR7s4wE27gJiwCR1vRwX5a6oYkYLVpTKhIx6JN/UFRhOOW2hF3FplvnhKUZ5Hnys2ZwZr2QKuWMvn5MgoRCH9RRhbqx4VNRiFOJuZi27jSXi9HQ+tLRf+7QQHw+tbuGejTMbiQur/4ly+FqDRpbfSraOr2PL94ZHcSKuKqbtMora7A3JgPvbo1iFZf53lkzS0v+yTdHdcKSSVxeRkjEJf5v7pDdzC0Tsg/edj0EqGDBqGBPfDE1hJGWuoxCFzafv41lu68iIasY/KSvLmRbbofrYbWMkTqe4Iqj6kBRiTboGpxklv94oR/auqhOWuVVNVh9KAErDyYgraBciRHxV1RBgCSSSamDVEe5CYeAJHzpAdnZG1xeRDiIm2+Zqk5vnBmOBzq5Ki1LU11Tize3ROHrI9e5rpWWFpJrumsGeMnAZYdkXG1SM2A31Qs54JdOCsbU3m1gZWai8GDoyJdRWI7ZGyPAS7UpDJsgD9KFykcPdcW84R0EaZ83egcBycTVJ2RUzombdhGgSHi6ZaLah+72FqwCdXNGaqEXbxVg/uZLOJuUi1ruXdfqAvK6hJqBn1d+1gzOCvVibmqEx8P98NqIDgj2brqgBZWJ//tiKj7ffw0xqYUKtc0fEhYBukhZOS0UswcFCNuRgbcueWr9WdnG0zcNHAZxTX9wB1e8+EAgpvTwaSBPk1daiSXbr+DPyFSk5PPbXbGsnLWZCb56IgxP9vMXy5D0chyS2RvOydafuKGXk9PlSZEz/vE+flgyMRgkCiiTyXA7vxwPfXWSlZCnW0Fu4kHA1sIEm57tg3EhXuIZlB6ORPLKpguyVYcS9XBquj8lSveYEuaFZQ+H4ERCNuZvjkIWr8gsyoV1sDLF4TceANWo5CYcApIFW6NkH+6KE64H3rLKCBBxUcFTnvOpMpSCNeBobYaLi0aoNRBYsMHqcMOS9cevy2b/cF6Hp8CHzhHQPgJ0y3tj2VjYWCgelqL9UeveCCQHrmTIRnxxVPdGzkfMERARAt4OlkhZPl5EI9LPoUjiM4pkHRfs0c/Z8VlxBDSEQEcPW1xdOlpDvRluN5KsogpZm//sgJQXJTDcr4DPXGUEevo5ImLhCJXb4Q00j4Akp1gq67BgN69Rx78UjoAKCAzv7IYDrw9RoQX+qiIISHJLpLLui/exGB9uHAGOgHIIUMDoRl5EVTnwWvGWJL9UKuu/7DBi04pa8Rp/lCPAEaiLwDtjgvDRlK4cFIERkBSWVcomrD6Bo9d4JWCBsebN6zECa6aH4aWhgXo8Q3FMTVJSUSWb+UMENkfcFseI+Cg4AjqIwN8v9cfEUG8dHLluDVlSVlkte3tLFFYdStCtkfPRcgREhEDMBw+iSzMKGyIaqk4PRSKtqpGtOHgNb22J0umJ8MFzBLSFgJFEgtTl4+Fhb6GtIRhMv5LqmloZHQenf3fGYCbNJ8oRUCcCpKaRv2pSq9Ri1dm/IbUlqamtle2KSsfktSdZgi03jgBHoHUIuNqaI+vLia17iT+tFAISmUwmOxqfjdErjnGNJaUg5C8ZOgLDg9xxYP5gQ4dBI/NnhHUhOR9TvjqJW7w+oUZA553oFwKvj+yAzx/lFZ81saqMsBKzSjDnx/P452qWJvrkfXAE9AqB5Y92x/yRvFqOJhaVEVZqfjle//0SqxrMjSPAEWgdAr/O6YNpvX1b9xJ/WikEGGHllEixYGs01h1LUqoR/hJHwJAROLtgOHq3dTJkCDQ2d0ZYpdJqfLznKj7cGauxjnlHHAF9QMDc1BhJH48BFcPlJjwCjLAonOGrfxLZsbCahzYIjzrvQW8Q6Oxlh5NvD4WDlZnezEnME2GERQP84/xtvPRLJLKLpWIeLx8bR0BUCIzr5olNc/qCynxxEx6Be4R1JD6LERaXmREedN6D/iAwc0BbrJ4eBqr8zE14BO4R1vmbeYywzt3IE75X3oOoEJg9sC0WTwzG8WvZ+OJAPCJu5ItqfGIeDGlgzR/ZkRW75SY8AvcI60ZOKeb+Eond0enC96qjPQzp6AqqP3clrQiJmcVQt7vP2twEHnYWMDWWyCFUWF6N7OKKZv2LlIDrZmcOJ2sz0CH/Zm4pyitbrg5Nv2irHgvFnEHtIPm3W6p/uP9KJl77/RKupnNhx6Y+V8L8r5f6Y1yIJ+j/cxMegXuERR/3K79exP9OJLEPnltDBMZ09cTax8Ngb2mKF36+gMu3CxCfWaw2vO627+9iLdcndjPMAAAgAElEQVT5r2dvYf4fl5Fe0FDG2thIghGd3eFsYw6S6R3Z2R2nrudi5oZziM8obnEZqdoLic8N7+x+71kirJ9PJ+PV3y6ioKyqxTYM9QH647Dr1YHoE+BsqBBofN73CIt6XvR3DD7bF4+Kqpb/Mmt8pCLosC6h0G3qkatZ+PbYdeyNyUBJRbXKI5we7ovlj4bA017+inzH5TS8vCkSyY2kTlFV6MhFIxBcR4uprLIGj35zCnuiM1qsFj26qycjrADX+yRJYS4f7Y7DR7wieLNrSjeEFDTazYeXp1f541ewATnCotCGhX/H8Ao6TYBXfwdEG9GUvDL8dTEVn+29ihQVC3m8NqID3p/Qhe3g6trhuCzM+ek8rmeVNDoyOtK9PKy93M/+uzOWxdU1V76NyO6VYe2x7KFuMKlzDKV5vPbbRWy5kKLgZ2SYjw0NcsO6GT3Rzs3GMAHQwqzlCGtrZCrm/XYRt/PKtDAU8XfZ1JGNdqTXs0swYfVJJGU3TiqKzG7FtO6MeOr7Qy7dyscT688y31ljRr84h+bLl5i6eCsfQ5cfafZI52Zrjo8f6ga66apr52/eSYbn30Hzq/bc4HZYOjkYVKaem2YQkCOs2LRCPLbuDKJSCjXTu4710hRh3Z1GVU0tHlh+BCcTclo9MwtTY6x5PAyz6pEHNXQ7vwyT15wEqWo0ZhRtXfH1Q3I/qq6tRdB7e5CYVdrkWLr62LMjTRcv+3vPkP9yb0w6xq8+wfXRmllFIwnw6SMheHVYe5gY8xvCVn/wSr4gR1jkeB+z8hiOxPMKOo3h2RJh0TuF5VVsl/r7udut0hdztjHD2ulhmNpIEi0R4YgvjoJ0y5qyjbN648m+/nI//mD7FSzefqXRV+hSixz0f80dAEvT+zFEtFukdz7Zc1XJT8owXqO4KzqK0+5Uwm8INbbocoRFt0OPrzuDPy6k8L+ujSyBIoTFdkR5ZXh/Wwz+OJ+CEqliznhfJyu2wxof4tXo4tMRbdvFtCad6E/398eGZ3rLvUvHwrAlBxrflZkYgWrpkc+srhWVV2HsquM4ocQuUWNfrQg6autizW6M6dKCm+YQkCMs6nbpzlj2T3POWs0NT1w9KUpYNOrEzBIs3BbDHPJSBW5dgzzt2C/AA53cGp006ZVtOHkD1TWNx5zQLd/5hSPgWCenrbK6FqFL9jeavWBnaYpdrwzAgPaucv0R2YYs3o/8skpxgS+y0Qzq4MpuV+lYzU1zCDQgrJ2X0zH9u9MoVsM1veamoZmeWkNY5AuKTS/CM9+fBTmxWwptI3kS2mH18m9cpuSdrVH4Yv81EAk1ZkRA2+YOAAW31rW3/4xq9HjX1tUal98fCVsL+RvJH0/dxFPfn9MMoDrcy0M9fBhh8Uo5ml3EBoRFV+e9lh7kf2EVPBImZBbjTFIuRnT2aPDxEmltv5SKJ/53tsU4rVHBHmyHFeDa+BX5p3uu4v3tV5qMkTNv4ogXlVqA7ov3NwhuffGBQNZffXv+x/P4luuitfhbOGdQACMsU56S0yJW6nygAWFRQGSb/2xHRiFXbagPdGM7rOiUQszddAE9/Z2xdFIwLOslwZIYxos/R+Kbo9ebXbfH+/ixXwAHK/kdz92X1h9Pwqu/XgQFhTZlA9u7YO9rg+TKTdElwLDlRxrcMP7ybDimh/s1aMpz/ja+9i38hlGE+5KJXfDSUPnYN3X+YvK2GkegAWHRY7N+iMD3J25wzOoh0BxhHU/IwRdTu+Ploe1B6TJ1raCsEp0X7UV6QUWjmNLj9Bd7xWNhoJ1SY0ahBo9+0/xRncITfn42HN3b3I+8Lq+qAR0LVx28X9nbxtwYeasmgwJH61pUSgHzX3FrHgFyuH89owce7OLBodIwAo0S1nfHklhRCm7yCDRHWMeu5bCM/e0vD2j0Qyb56eeawNTESMICRj97JKQB2d0dAeUF9v3oULNHdaqPR+oBswcG3Bs4HUsPxmZgwpqT946TNA/Kgatvqw8n4JVNF/myt4BANx97/PZcX9BFCTfNItAoYV26VcBul7i1jrDoafqY/3ihHzq428q9nF5YziLPr6Y3TEimmJ63RnfCovHyIQZ1G6BLkPbv7kZmUeO7NHqW0mvmDg3Epw+HyO2erqQVYsb6c6AwB7J1T/XEs3VIjf5dba0MD644hoOxmXzZm0GAQq5oZ0UqDRTsy02zCDRKWHQT5ffWTmQUNv3LodlhiqO3lnZYNEo6Zr0wpB1WPhYqN2gKyHx/eww+3RPfYDKU2kE7o2cH3d8Z1X+I1qTjgj1MNqY5GxbkzpzppMJw1/JKK1li+9p/Epl/K+qDkWhXz7mfWypF54V7kVXEfZfN4WtmbISXh7fH8kdCxPFRGtgoGiUswmDSmhPYdinNwOBofrqKEBa1QD6kX+b0Qec6RwY6mh2+molJa042CCb1c7ZiqpVNBY1Sm+S87/7B/hbTpgLdbFh4RF3/So3svmZ/v0AXbJ87oEGCNSlCTP/uTIu3mYb+QdBueMW00Gb/uBg6RkLOv0nCor/IlPHP7T4CihIWqS0sGt8Zr4/sKAcfHc0oiZmO3HWNdkPfP90LRCbN2agvj2HflYxmnyF/GKWMPD8k8J4gH71wNikXczdFYlyIF94eHdTAuf/WlstYcTChyTgv/h3cQYBuCC8sHIH6mmUcH80g0CRhxWcUIXjRPl5Fp846KEpY5Od4qp8/I466gZkp+WWY99sl/FlPtoX8Xr/O6QvSV2rOSDTwmyPNh0fQ+8/092eSMW52FveaSysox/zNl/FYeBuM6+YlpwhRWVOLyWtOYE9MhtrECDXz+Wq+F4psv/T+SK4wqnnoWY9NEhb5PXr+9wBIOpnbHQQUJSx6llJsKK6qLglRDNWyPXFYuiNWLvK9p78T/p7bH94t1Lb7fH883th8ucXloKj5jTN7o1O9I+nu6DR09rIHXcvXNVJOfZzka1K5SkdL4JKfcd2TPVt6jP9cIASaJCxK2p21IYKXr1dih0WvdPG2w9rpPTC4TqoM1X9ccziB7XTo/9+1/oEu2PfaIJCme3P227lbTP6nJSM/y5YX+uHBYA+5nQDlh9KRsX6cGMkh/2fLZX7J0hKwALa+1A+TQ30UeJI/IgQCTRIWSZrQ8YN03rm1fofl70zqCz0wttv9bH5Sw6AYN4pYv5tcTsfHsV09se3lAS0eM0irvf/HhxRajtZUc3l3azRo99ZUnqJCHRrAQ7RWqcsnwNP+/lHbAKYtqik2SVh0q3XgSgbGrT4BIi9urTsS0s0fHQnJyX3XiLDojwBVo7lLDiT+9uygtvjq8R4tQnwts5iFNihiwzq7Y+uL/WBXL7m5/rvphRWsWtLWSC6H3BKu4QFOOPXOsBb/sLTUDv+58gg0SVjU5NUMUhs4hzNJvFYh4dEaHxb5rii84IGO9+ViKE9z9aEE/OeP+0dCEs/7cEpXkJ57S5ZbUgmXeX+39Bj7OcVbxS0dBdLZas4ik/MZYZ1OylWoXUN+iC4yKMCXm/YQaJawqGw9yZr87zjPK2wtYQ3p6MYIq0udmz/yC1Ilmo93x91bcfI3ffVEGJ7qJ6+r3tgnQTs0i+f/VHjHS+kjU3u1afLrol307xG32LGf1ppb0wiQzv6h+YMxpAm9Mo6dZhBolrDo2EL5ZeTj4P4NxXdY5OsguWIKayCdqrvGqtH8fhFbzt8/ftmYm+Cn2eGYFOqt0Ip3WbQHsWkt1xukxiaHemPrS/2bbJcksT/ZexUkpcyteQToZjXivREgKWtu2kOgWcKiYe2OSmcBhzy8QXHCouDCxRO6sLy+unrfVPXmifVn5AJHKch097yB6Neu+aDRu58I3RLSbaEiRlVxbn4yroHkzd1378ZmKdqeIn3q6zOP9fbFd0/1bPEmV1/nL5Z5tUhYsWlFjLD+uZolljFrbRyK+rBC2jjg9+f6yuXz0aCpms7olcfk1FyJ3KIWPwhvR/niqU1N8s0/LrNit4oYidyQCun47o3rxF+6XcAka0iEkFvzCGx4phee6OvPwkK4aQ+BFgmLoqBf//0Su92qGzukvSFrr2dFCIsy+Ckt581RneTinSj5mVKd6ldT9rCzQMry8U3KytSf7ce7Y/Hu1hiFQXh9ZAd8/mj3Bs+T/+pQXCYrOMGP+83DSWEMf88dAArI5aZdBFokLBoerwh9Z5EUISzaXZ16Z6ic6ie9S0Udxq443uA2rqe/I/ON1LeMogoQmdW3b49ex/M/XVD4q/F1tsL1j8bKVXamlykOjMhzyQ7uv2oJzGFBbvj2yZ4NFC5aeo//XP0IKERYlDj79IYIXE1vvPKw+oclzhZbIqw2jlbYNW8guno3rKTyx/nbmPrN6QbFKCZ292J/vevb7uh0RpD1jVQVJqw+oTBA5CM7/MYQhPk5yr1D+lrT153Gzqh0hdsyxAfpBEg6Zf8Z1Ql0o8tNuwgoRFgksztl7UmmFEBHCUO15ggrs0jKyr5P6u7VoLBmQVkVxq9uvNbfi0PaYe0TDYNGP9odh/kjOzZQVSDFB0pKV9Scrc1wZsFwkOxMXWPSyVuisOrQfelkRds0pOdIq2zV9FBM6+Urp35hSBiIaa4KERYNmNcrbPpISMc0yhmk0IT6OumEHcVdLdga3Wipr4XjO2PJxOAG38Sj35xiyqH1ZUyyiivg9+ZOVFQpln1A8WAH5w9u4COjmC7SO5v27Wnuw2rmN5LyPEkQkY763LSPgMKEFXEjj5VLpyoshmqN7bAID1K2IMdsY5K5tCulJPLUgvJGYVv/VE/MqidXTJtY/zd34pdn+2BAe/lwh/zSSoT99wBuKqiiQWRIpNiYXbxVwAiLUn64NY7AjL5+LAC4pRQnjp9mEFCYsOgmKeSDfY1qkmtmqNrvpTWFVGm017NLWGrTicScJo/Sp94dhr4BznKTK5FWwWv+Dmx6to9cLiI9RAQ5ZuVxnErMUQiQ2P+OarJYAuURvrH5EjadVSyuS6EO9eghKurx4eSumD0oADyYQRwLqzBh0XCX741nMiSGaq0hLCoWQTIyFJTZVDgI/RKUfDWlwY1ick4pury/D9/O6AGqV1jXyFlOx8W9Mc0rj9I77d1scO2jMU0uF/0R+uJAPMtkMGTfZFMAdfKwxYaZvdGn3h8UQ/3+xTDvVhFWTFohei45cE8aRQwT0OQYFCEs+sVPKShj5eHJt1Vd0/QthZ2lCfJWToKxkXx9QKokTRV2qOzXSw8Eyk2xVFqN2Rsj8Nu52y1O/YUHAvFVI9Wd67647VIqS36mtCFu9xGg3EGSBqLUJh4sKp4vo1WERYUQ+n982GAz+xUhLFLvXHHwGn45c6vFJGXSzEpaNrbBreKms8l45vsIzB0W2CDok/L/3vjjMouNa87oF45qD44Kbr7YZ1x6EV76hWcy1MeSVDRIU2yeAioa4vl11v+RtIqwCA6KeCdtcUO0lgjrx9M3mbLFiYQc0C1cS9avnTNOvjOswWMU0Lnw7xiMD/FsEKNF2mSrDyVi/uZLzTbvYW+ByEUj4GnffMpPcUUVy2TYcPKmwWcy1AXU3c4Cx996AO3r1ZdsaU35z4VFoNWElZxbih5LDiC3tFLYkYmw9cYIi2iJbtnWHEpgxSXIka2oTQ/3ZTeB9e2ZDefww8mbGNjeFQdeHwTzOgU7iQd3Radh/Krmg0dJVmb9071AahAt2drDCVi07Qq77eR2BwEK6N36Yn8Y8dxBUX0SrSYs8qFQasjPZ5JFNRFNDKYxwiKyIkG+vdEZoLzL1ti7Y4KYeF99G/jJYbZLCw9wxs5XBoCCF+va8YRsjPj8aLO+RAp2fH5wu0bjwur3R/US5/x4AdezSlozfL1+dtcrAzGmjry1Xk9WhybXasKio87WCymYtu6MwR0hWkrNae26k1zJ7HoxWHSjGLxoL65mFLN0GpI59nOWr3JDTvmxK483uSOyNjNhKUKDO7jKDYmi28koXqzuNT0dM0evOIbDcVmNBre2dl66/ryLjRlSPx8PM2OeiiO2tWw1YdEEKKdw5g8ROH3dsGR11U1YFIFOpeXrGqk6BL6zmwWakswyifuF+crnAV5IzmepUrfyyhr9noZ3dmchEQH1ytEfjMtkSdgTQ7xhZiJ/M0k682sPJ7Z4USC2D1iI8Xw+tTte5852IaBVuU2lCItigT7ZE8fUKpu7tld5dCJrQN2EdXnxSHTzkU/5uJVbhtAl+9nuqZ2rDb59skcDUqP6gVRHkG4kG7OXh7bHB5O6wNFKXh3z2yPXsSs6HT/O6g2Hej+jZGuKeqe1NWRztzPH0TeHNtAyM2RMxDR3pQiLHM27o9Lw8qaLBqVEqk7CIl8uqYG2qVckYm9MOhPVI+LwdLBgYQ2kdlnXyNc058fzONyIqKKthQm+nBqKZwb4y1V3oXAI8rVtPHUTR996oMGujVJ+Oi/cC5K1MWR7qp8fS0anYzU38SGgFGHRNKhoARUvoCIGCtzgi2/mSoxInYTlamuGuP+OhnM9h/q6Y9fx2m+XQFWiHaxMmdTyq8PlK+owbfjfLmJLvZL3NCWKzqbct/pHzaTsUqYcuyc6HW+O6ohPHg6RQ4Bi7J783zmDvEy5CwTlC/7ybDhztlMcGzfxIaA0YdEui2KyFv4VbTAhDuokrAGBLiyws26RCvo8qJT9B9tjQb4sC1MjvPFgRyyZ1FXOSU7Hxfe3xWDN4YbBoxO6ezN1AZ96kst0s0gBotEphWjnZo3Ej8Y2+Bo3R9zG1G9Pi+8r1dCIRnf1wNrHe4AKTnATJwJKExZNh4oYPPzVKYOJfFcnYT3Z1w9f0dGjXpzUW1uiWKQ85flRSsjLwwLx2SPd5eRh6Hi3bM/VBmqhZsZGrL7hxw91lYuep5vdr49cx7zfLqH639CLPfMoCl5eIDCnWAqvN3YYpOPd3MQInz0agheGBPJUHHFyFRuVSoRFR0HSyfpwV6xB5Beqk7CIWCgGi1JA6tqM9Wfw67nbLGSETiXPDW6HldNC5W71KN7rywPX8M6fUXLHcYrO/uThbniqn79cm0XlVViyMxaf1yleMWdQAL6Z0bOBKB2FNyiSWC3ib1qpoQ1sf0f3qmu9SxClGuMvCYaASoRFo7qRXYqRXx5FogEEHaqTsD6Y2AVvjQ6SUxSlytBjVxzDgdjMe/FQFA1Pv0h1b/Vox0S5hLRjqqsE0dXHHr/O6YMuXvISzUnZJXjupws4GJt570OiKj0XFo4AkVxdo8rU5Js0JCPpY8oZXDiuc6OaZoaEhdjnqjJhkbN20d8xWLrrfjVjsU9a2fGpk7C+fiKMBY2aGN+Ph8opkWLcqhMgDf27RsnL5ESnEIe6Rrd9L2+KvBeGQLuxkZ098NdL/RvUIaT2Jq09iYw6aUOUsvPDrN54KMxHrl0KWO299IBBhTdQdW6KdwutF++m7HfC3xMOAZUJi4aWXliO8A8P4XYTgYzCDV+zLauTsIhYJnT3kruNorgqiq+iOKu7RqWliLB6+cuXmKK4KXKi31Uepej1pZODmQ58XaMdGDnTZ/zvrNxuzNhIwsIlfpjZW84/RgKBo1YcwxkDCQomSWs6Hn85rbtCaUya/eJ4b/URUAthUaNUNIF0y/XZ1EVYRC77Xx/Ekpvr2pH4LDy78bzc8Zqi3elISNrsdY0I5aVNkYhMzmf/mm4bt7/cH4M7yD9XVlnNiI2Sqesb7Sj+eL4v2tUpUEG3k1S6npz6hmBUpOPYW0NZVgE38SOgNsLKLZGi38eH9VofXF2E5etkxYThetQrvbXzchqLlUrOvZ9yQ1fstMOqX/KLwhOIsI5fy2ZfmY+TFRI+HN3AB0MVe0gM8OKtO8RW16iU/bKHu+GZ/m3v/Wu6SCEd+klrThjERcq84e3xxdTuDTTJxP+ra5gjVBthUQLtuqNJTFyO/krro6mLsHq1dcLGmb0baK3/ciaZRaPXlaghXXHaYT3Ss40cpBTtTjsnIhey2QPb4runejWAPT6jGN0W72u0Mo6JsQTPD2mHzx4OkSO6qJQCPP7dGcSk6ncdSi8HS5x5d1iDbAN9/Hb1ZU5qIywC5FpGMZ776TyOxN/5q69vRtreFI5A4nh3jW7gVhy4hssp9/1OLc2bhPso0rx+gOJXRxKx6mACSqT38/koRYR8U/UJi/yG7/0Vc4+wyAfzSA95UqNxkAzQ239GNTmkPu2c8eHkYHR0v38koiyGpbtimb6XvhqlRq2YFoq5QwP57kqHFlmthCWtrsGGEzfx3t8xoCOivhnl6dFfZQrQvGu0m6QA2tJKxXeVtGuiEASrevlqtBuinVNdtVJKEaFK0m2creTgpMDS6NQCpBfcyf0b1MG1QdQ8/fv4jCIkZDatc0VzCva2l0sRouBSeoeq/uirkXTPjpcHsPXkpjsIqJWwaNp0U/jKpkhWpLNlkWDdAYqPVH8QoF3ruqd6glRZ6baUm+4goHbCIqftz2du4s0tUXJxP7oDCR+pviNAREWaV958d6VzS612wiIE6CqdnLbbL6UrVIxB51DjA9ZZBCgpfNVjoZgU6tMgLUlnJ2VAAxeEsAg/iq5+5JvTeh9MakDfis5PlRKcZw0MYJcY9cUNdX5yBjIBwQiLHMdUTJSCSbkvy0C+JhFPkzxV3do4MOloKu7BTTcREIywCA7SDx+38jhOGUiah25+AoYxalLFoJ3VK8M7cPkYHV5yQQmLcDmVmIOxq46DIq65cQS0hQAV5vj9ub5wspbXudfWeHi/yiEgOGFJq2vxxf54vKvneYbKwc/f0gQCxhIJYpeORgd3ecULTfTN+1AvAoITFg2XgiFf/PkCDsRlGoz+u3qXibemLAJUzoxEDefV08VXtj3+nnYR0AhhkcTJtkupeP33S3KJvdqdOu9d3xGgLIGHevhg/VM9G80C0Pf56+P8NEJYBBz5sD7eHceUMuvmyukjqHxO4kCAUo6ounZ4W2cecyWOJVF5FBojLBrptcxizNl4HscTcnhAqcpLxxtoDgEPOwu8N64zq89YP2eTI6e7CGiUsCht52h8FqZ8dRL5/NZQd78akY+cVESf6OPHfFeUaM5NfxDQKGERbERaKw9dY8VCuXEEhECgexsH/PxseINiHEL0xdvULAIaJyyaXm2tDNPXn8WW83fKWXHjCKgLAZI8Xj09DI+F+6qrSd6OiBDQCmHR/FPzyzH121M4mXi/QoyIcOFD0UEEKIThrVGd8P6ELlw2RgfXT5Eha42wKNfwcFwWXv31ImLT9VuKV5GF4M+ohgDlCj7V35/trqiEGTf9REBrhEVwllXW4IeTN7BkRywyi+4oZ3LjCCiDwLAgN6ZpX192Wpm2+DviRUCrhEWwFJRVsnL33xy53iqZYfFCykemaQQo3ooqC1G5eQoW5aa/CGidsAjavFIpHv/uLPZfyeTxWfr7rQkyM3c7cyx/NASP9fbjfitBEBZXo6IgLIIkObcUo1ceR1wa92eJ6xMR72jsLEzx+sgOeHNUJ1iaGYt3oHxkakNANIRFMyIpmmc2nMO1Zqq8qG3mvCGdRoAqFz3d358VguXqoTq9lK0avKgIi0a+/VIq5m++LFeuvVUz4g8bBAKTw7xZxWZ/Z2uDmC+f5B0EREdYVG9v09lkvL/tCm7l3S/ZzheMI3AXgaFBbvj6iR7o4G7LQTEwBERHWIQ/qTl8e/Q6uz3kSqUG9kW2MN2efo7YOLs3Onvac2AMEAFREhatQ2llNRZvu4K1hxNRXqV4VWUDXEODmTLtqH6eHY6ebZ3AgxcMZtnlJipawqJR5pVWYu4vF/DnhVRU1tQa5grxWbPYqnau1szBPqG7Ny8iYcDfhKgJi9Ylo7ACr/x6EVsjU3iitAF+qBQHSo71heM74/FwP1C+IDfDRUD0hEVLk5Jfhre3RGHTuVtcE97AvlWqcvPxQ90wo48fj7UysLVvbLo6QVg08Fu5ZVi8PQYbT90EV6QxjC+XkpiprDxJxViY8sBQw1j15mepM4RFwn9JOSVY+FcMfo+4zVN49PzrtbM0wbczemJKmA8/Bur5WrdmejpDWHcnRcfDeb9dxF+RqXyn1ZqV1qFnbcyN8fWMnpjW25c72HVo3TQxVJ0jLAKF8g5f+jkS+2IzUF3DFUs18aFoog9ysFPxCBLge6qfPz8GagJ0HetDJwmLML6ZU4o3/4zC35GpqOIhDzr22TUcLpEVaVm9PToIM/r6cbLS+RUVZgI6S1gER3phOZbujMP640mglB5uuotARw9bvDe2Myt8ypUXdHcdhR65ThMWgZNdLMXKg9ew6mACiqXVQuPF2xcAgS5ediyReUhHN+5gFwBffWpS5wmLFiO/tBLfHL2Oz/bGI7+sUp/WR+/n0sPPkVVn7ubjwAX49H61VZ+gXhAWwUBHwq/+ScTSXbHILeGkpfqnIWwLlAs4pKMrvpnREx08uOqCsGjrT+t6Q1i0JFU1MhZYunTnFSTncmkasX6mFAQ6pqsHPpgYjC7e9jyRWawLJcJx6RVhEb5UPmxXVDqWbL+CC7fyeSqPyD46il6nMvL/GdUJAa5cfE9kyyP64egdYd1F/NyNPCzbE4edl9N52INIPkNXW3PMG94ezw5qB/r/3DgCrUVAbwmLUnkSs4rxxYFr+Pl0MhMF5KY9BEjLavGELpgU6s3DFrS3DDrfs94SFq0MkVZ2SQVWHUrAmkOJKCyv0vkF08UJ9G7rhE8e7ob+gS4wNebyMLq4hmIZs14T1l2Qa2pl+P7EDbyx+TKKKjhpaerjMzaS4MEu7vhyWijXX9cU6Hrej0EQ1t01PJmYg+d/uoD4jGLu1xL4w6bSW4/0bMOOgZ4OFgL3xps3FAQMirBoUa9lFrMbxN3RGTzIVICvnOKrOnnaYc6gADw7KADW5iYC9MKbNFQEDI6wSNsho6AcP5y6yXIQk7JLDXXt1T5vEzoCBnvglWHtMaKzByihmRtHQJ0IGBxh3QWvuJjiGjUAAASlSURBVKIah69mslJikckFXBBQxa+KpIyf7OeP5wYHMH8VFY7gxhFQNwIGS1gEZHWtDLdzy/DWn5fxx/kUdWNrMO35OFgyDatHe7WBrYUp31kZzMprfqIGTVh34ZbJZFj7TyL+80cUpNU1PDpewe+QbgGDveyxcVZvhLRxUPAt/hhHQHkEOGH9i11trQzHrmVj8Y4rOH8jnxVy5dY4AkYSwM3OAg+H+WDJ5GDQjSA3joAmEOCEVQdlCjRNyCrGd8eSsDniNm7nl/HdVr2vkMT1evk74sUhgZjMC0Ro4neU91EHAU5YjXwOFBG/NyadEdehuCz+wfyLgKuNOZ7s54cn+vqzo6CJMXes849DswhwwmoCb4qOT8gsxq/nbrHUnoIyw46Q797GAe+ODcLQTu5wtuFHQM3+mvLe7iLACauFb6GssgYUIf/eX9GIuJEHQ6vRY25ihOcGt8PbozvB1c6Cl93i3KFVBDhhKQh/ekE5lu25ip9OJ6OgrFLviYuCQLv6OODDKcEY2dmDyxcr+J3wx4RFgBNWK/AlGea9VzLw6Z44XL5dqJeSNRTw6eNkiSmhPnhleHv4O1vzuKpWfCP8UWER4ISlBL4ZhRVYd+w6tpxPQVx6EQtA1QcjNdAHOrlh1oC2LMWGpIy5cQTEhAAnLCVXg4q3Hk/Iwe/nbmHbpTRkFlUo2ZI4XgsPcML03r6YGOoNP2cuXSyOVeGjqI8AJywVvgnSj88pljLiWn04AScSckC3i7pk7nbmTGN9eh8/dPW25wJ7urR4BjhWTlhqWHQ6EpIj/qfTN/HRrqvIKZGqoVVhm6C0mmFBbnhnTBB6+TvBysyE+6qEhZy3rgYEOGGpAcS6TWQUlmPhthj8evY2yitrRKcCQRLFbnbm+OShbixZmUsWq/kD4M0JigAnLAHgpQTqI1ezWTXq09dzkVVcofUUH0tTY/i7WOPhHj548YFAeNhzFVABlp43KTACnLAEBDi3RIodl9Pw54UUnE7K1UpFagpTCPK0xYjO7pjW2xdhfo58VyXgmvOmhUWAE5aw+LLWk3NK8U98Fv6MTMWRq1kai9/ycbRkx75x3bzQ09+RaVVx4wjoMgKcsDS0enR7eCuvDEevZWHD8Zs4k5SLyppaQXr3sLPA1N5t8FAPH3T1doCDFScqQYDmjWocAU5YGoa8uqYWxdJq/BWZis/2xuNqRpHaRmBrYYJHerTBi0MDEeRpB/JbcaVitcHLGxIBApywtLgINTW1+PnsLUZcSdklkFbXtvpWkSReiJjGdPPEGyM7ooefIyScpbS4qrxrIRHghCUkugq2TTFcWyNTsDkiBdGphSxqvrkAVFKhsjI3gZ+zFQa1d8HsgQHo4e+kYG/8MY6A7iLACUtEa5ddLMXhuCzsj83AuRt5jRZ8JX9UDz8nDGzvgrHdPNHNxwFmJrz8u4iWkQ9FQAQ4YQkIrrJNF1VU4WJyAdPhOhKfhYibeXCxMcegDq4Y3MEVvds6IdDNlit+Kgswf09nEeCEJeKlK6+qQVp+ObtdJIe6r7M1SKaYu6hEvGh8aIIiwAlLUHjV0zilU3P1dPVgyVvRbQT+D6Scf7qBEXXGAAAAAElFTkSuQmCC';
    var mosteiro = 'data:image/jpeg;base64,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SXH/AF0Zgf7or7N0LQLHwvpMNhptlaadY2y7Ibe1hWGGJfRVUAAewFW6Ko+gCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/Ov8A4Kof8EhYfiVDqPxG+Fenx2/iNQ1xq2hW6bY9U7tNAo4E3UlBw/UfNw/z7/wS2/4KnX/7K+uW/wAPPiJcXU3gGWbyLa5mBabwzITg8dTb5+8nVDkjjIr9lq/PD/grn/wSqj+KljqHxQ+HOnqnie3RrjW9Jt041dAMtPEo/wCW4HLKP9YOR8/36v3A/QXTtRt9X0+C7tJ4bq1uo1mhmicPHMjDKsrDgqQQQRwRUw61+Qv/AASG/wCCn8nwN1qy+FnxCv2/4Q29l8nRtRuG/wCQDMx4hcnpbsx4z/q2P90nb+vUbBwrLyDyCO9SB/M/8eBt+Lviwemu3w/8mJK4+u0+P67PjJ4uH/Ufv/8A0pkrjYITcShR9SfSvLxUXKtyryP5n8QcHVxXE88NQXNOXIkvNxRPp9t5jeY33R0r9Uf+CJ//AAThjW1svjN42sVkeT5/C1hOnCgf8vrKe/aPPu/9w18qf8Etv2F5v2zfj3DHqEEq+CfDBS81uYDaJxn93aqf70hBBxyEVz1Az+7+nafb6Rp8FpawxW1raxrFDDEoVIkUYVVA4AAAAA6V6NKmqceVH7vwxw/RyfAxwlLWW8n/ADS6v06LyJqKKKs+hCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD8sP8Ags3/AMEx49AbUPjB4B0/bYzMZvE2l26fLAxPN5Go/hJP7wDofm6FtvVf8EW/+ClLeM7Wx+DvjzUN2r2cfl+GdSuH+a+iUf8AHm7HrIij5CeWUbeqjP6Q3lnDqNnLb3EUc9vOhjljkUMkikYKkHggjgg1+Kv/AAVO/wCCe2pfsU/FiHxz4JivIPA2qXq3NjPbMwfw/eBt4hLDlV3DdG3oNvVctW+gHyf+0MuPjZ4xUdf+Eg1AAf8AbzJUPwk+Fms/Frx5pHhfw9ZSahrmu3KWtrCn8bt3J7KBkkngAEngGqOrahdeK/EFxfXTveahqNw9xK+PmmlkYszYHcsSePWv2Q/4I8/8E4T+zN4LX4geMLIL488RW+La2lT5tEtG52EHpNIMFu6rheDvzn7JKbqPc+bw/DdGGcVs4qazkko/3UopN+r28l6s+if2Kv2UNH/Y2+AWk+D9L8ue7jH2nVb5Vw2oXbAeZIe+0YCqD0VVHXJPrNFFUfSBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFZvjHwbpPxC8L32ia5p1nq2kalEYLq0uohLDOh6hlPB9fYgGtKigD51+D3/BKv4I/A74mt4s0Twl5mqRzCezW+u5LuDTXHeFHJAIPILbip6EcV9FUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/2Q==';
    //var obras        = 'data:image/jpeg;base64,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';
    var obras = 'data:image/jpeg;base64,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';

    var imagem1 = '';
    var imagem2 = '';



    //    var mosteiro = 'data:image/png;base64,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'
    //    var santoamerico = 'data:image/jpeg;base64,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';

    this.selectedHoras.sort(function (x, y) {
      return x.idhora - y.idhora
    });

    for (let i = 0; i < this.selectedHoras.length; i++) {
      pdfmake.vfs = pdfFonts.pdfMake.vfs;
      this.hora = this.selectedHoras[i];

      await this.usuarioService.consultaGestor(this.hora.unidade);

      this.gestor = this.usuarioService.gestor;
      //      console.log("this.gestor.usuario.unidade.imagem1 " + this.gestor.usuario.unidade.imagem1);
      //      console.log("this.gestor.usuario.unidade.imagem2 " + this.gestor.usuario.unidade.imagem2);

      this.datainicio = new Date(this.hora.datainicio).toLocaleDateString();
      this.datafinal = new Date(this.hora.datafinal).toLocaleDateString();
      this.dtcompini = new Date(this.hora.dtcompini).toLocaleDateString();
      this.dtcompfim = new Date(this.hora.dtcompfim).toLocaleDateString();

      this.dataAtual = new Date().toLocaleDateString();

      console.log("Unidade - " + this.hora.unidade.administrativo);

      if (this.hora.unidade.idimovel == 4) {
        imagem1 = mosteiro;
        imagem2 = obras;
      } else {
        imagem1 = mosteiro;
        imagem2 = santoamerico;
      }
      if (this.hora.idtphora == 2) {
        var docDefinition = {
          content: [
            {
              style: 'tableExample',
              table: {
                widths: [100, 300, 100],
                body: [
                  [{
                    image: `${imagem1}`,
                    border: [false, false, false, false],
                    width: 70,
                    height: 60,
                  },
                  {
                    text: 'Solicitação para Compensação de Horas',
                    bold: true,
                    fontSize: 16,
                    alignment: 'center',
                    border: [false, false, false, false],
                  },
                  {
                    image: `${imagem2}`,
                    border: [false, false, false, false],
                    width: 70,
                    height: 60,
                  },
                  ]
                ]
              }
            },
            { text: `Solicitação Nr. ${this.hora.idhora} `, bold: true, fontSize: 18, alignment: 'center', style: 'header', margin: [0, 0, 0, 20], },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: [300, '*'],
                body: [
                  [{ text: 'Solicitante', bold: true }, { text: 'Departamento', bold: true }],
                  [{ text: `${this.hora.usuario.nome} ` },
                  { text: `${this.hora.unidade.nome}`, }]
                ]
              }
            },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: [70, 200, 80, '*'],
                body: [
                  [{ text: 'Cracha', bold: true }, { text: 'Colaborador', bold: true }, { text: 'Centro de Custo', bold: true }, { text: 'Departamento', bold: true }],
                  [{ text: `${this.hora.chapa} ` },
                  { text: `${this.hora.funcionario}` },
                  { text: `${this.hora.unidade.centrocusto}` },
                  { text: `${this.hora.unidade.nome}` }],
                ]
              }
            },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: [120, 120, 90, '*'],
                body: [
                  [{ text: 'Dia Inicial', bold: true }, { text: 'Dia Final', bold: true }, { text: 'Total de Horas', alignment: 'center', bold: true }, { text: 'Valor RH', bold: true, alignment: 'center' }],
                  [{ text: `${this.datainicio} ` },
                  { text: `${this.datafinal} ` },
                  { text: `${this.hora.hrcomp} `, alignment: 'center' }, { text: '' }]
                ]
              }
            },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: [250, '*'],
                body: [
                  [{ text: 'Dia Compensado ', bold: true }, { text: 'Total de Horas Comp.', alignment: 'center', bold: true }],
                  [{ text: `${this.dtcompini} ` },
                  { text: `${this.hora.qthoras} `, alignment: 'center' }]
                ]
              }
            },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: ['*'],
                heights: [90],
                body: [
                  [{ text: `Motivo : ${this.hora.motivo} ` }]
                ]
              }
            },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: [500],
                heights: [70],
                body: [

                  [{ border: [false, false, false, false], text: ``, alignment: 'center', bold: true }],

                ],
              }
            },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: [250, 250],
                body: [

                  [{ border: [false, false, false, false], text: `${this.gestor.usuario.nome}`, alignment: 'center', bold: true }, { border: [false, false, false, false], text: 'Rubens Ferreira de Lima', alignment: 'center', bold: true }],
                  [{ border: [false, false, false, false], text: `${this.gestor.usuario.nivel.nome} - ${this.gestor.usuario.unidade.nome} `, alignment: 'center' }, { border: [false, false, false, false], text: 'Gerente Administrativo Financeiro', alignment: 'center' }],
                ],
              }
            },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: [500],
                heights: [70],
                body: [

                  [{ border: [false, false, false, false], text: ``, alignment: 'center', bold: true }],

                ],
              }
            },
            {
              margin: [0, 0, 0, 5],
              style: 'tableExample',
              table: {
                widths: [250, 250],
                body: [

                  [{ border: [false, false, false, false], text: ``, alignment: 'center', bold: true }, { border: [false, false, false, false], text: 'José Rodolpho Perazzolo', alignment: 'center', bold: true }],
                  [{ border: [false, false, false, false], text: `Diretor Pedagogico `, alignment: 'center' }, { border: [false, false, false, false], text: 'Comissário Papal', alignment: 'center' }],
                ],
              }
            },

          ]

        }
      } else {
        if (this.hora.unidade.administrativo) {
          var docDefinition = {
            content: [
              {
                style: 'tableExample',
                table: {
                  widths: [100, 300, 100],
                  body: [
                    [{
                      image: `${imagem1}`,
                      border: [false, false, false, false],
                      width: 70,
                      height: 60,
                    },
                    {
                      text: 'Solicitação de Horas Extras',
                      bold: true,
                      fontSize: 16,
                      alignment: 'center',
                      border: [false, false, false, false],
                    },
                    {
                      image: `${imagem2}`,
                      border: [false, false, false, false],
                      width: 70,
                      height: 60,
                    },
                    ]
                  ]
                }
              },
              { text: `Solicitação Nr. ${this.hora.idhora} `, bold: true, fontSize: 18, alignment: 'center', style: 'header', margin: [0, 0, 0, 20], },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [300, '*'],
                  body: [
                    [{ text: 'Solicitante', bold: true }, { text: 'Departamento', bold: true }],
                    [{ text: `${this.hora.usuario.nome} ` },
                    { text: `${this.hora.unidade.nome}`, }]
                  ]
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [70, 200, 80, '*'],
                  body: [
                    [{ text: 'Cracha', bold: true }, { text: 'Colaborador', bold: true }, { text: 'Centro de Custo', bold: true }, { text: 'Departamento', bold: true }],
                    [{ text: `${this.hora.chapa} ` },
                    { text: `${this.hora.funcionario}` },
                    { text: `${this.hora.unidade.centrocusto}` },
                    { text: `${this.hora.unidade.nome}` }],
                  ]
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [120, 120, 90, '*'],
                  body: [
                    [{ text: 'Dia Inicial', bold: true }, { text: 'Dia Final', bold: true }, { text: 'Total de Horas', alignment: 'center', bold: true }, { text: 'Valor RH', bold: true, alignment: 'center' }],
                    [{ text: `${this.datainicio} ` },
                    { text: `${this.datafinal} ` },
                    { text: `${this.hora.qthoras} `, alignment: 'center' }, { text: '' }]
                  ]
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: ['*'],
                  heights: [90],
                  body: [
                    [{ text: `Motivo : ${this.hora.motivo} ` }]
                  ]
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [500],
                  heights: [70],
                  body: [

                    [{ border: [false, false, false, false], text: ``, alignment: 'center', bold: true }],

                  ],
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [250, 250],
                  body: [

                    [{ border: [false, false, false, false], text: `${this.gestor.usuario.nome}`, alignment: 'center', bold: true }, { border: [false, false, false, false], text: 'Rubens Ferreira de Lima', alignment: 'center', bold: true }],
                    [{ border: [false, false, false, false], text: `${this.gestor.usuario.nivel.nome} - ${this.gestor.usuario.unidade.nome} `, alignment: 'center' }, { border: [false, false, false, false], text: 'Gerente Administrativo Financeiro', alignment: 'center' }],
                  ],
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [500],
                  heights: [70],
                  body: [

                    [{ border: [false, false, false, false], text: ``, alignment: 'center', bold: true }],

                  ],
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [250, 250],
                  body: [

                    [{ border: [false, false, false, false], text: ` `, alignment: 'center', bold: true }, { border: [false, false, false, false], text: 'José Rodolpho Perazzolo', alignment: 'center', bold: true }],
                    [{ border: [false, false, false, false], text: ` `, alignment: 'center' }, { border: [false, false, false, false], text: 'Comissário Papal', alignment: 'center' }],
                  ],
                }
              },

            ]

          }
        } else {
          var docDefinition = {
            content: [
              {
                style: 'tableExample',
                table: {
                  widths: [100, 300, 100],
                  body: [
                    [{
                      image: `${imagem1}`,
                      border: [false, false, false, false],
                      width: 70,
                      height: 60,
                    },
                    {
                      text: 'Solicitação de Horas Extras',
                      bold: true,
                      fontSize: 16,
                      alignment: 'center',
                      border: [false, false, false, false],
                    },
                    {
                      image: `${imagem2}`,
                      border: [false, false, false, false],
                      width: 70,
                      height: 60,
                    },
                    ]
                  ]
                }
              },
              { text: `Solicitação Nr. ${this.hora.idhora} `, bold: true, fontSize: 18, alignment: 'center', style: 'header', margin: [0, 0, 0, 20], },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [300, '*'],
                  body: [
                    [{ text: 'Solicitante', bold: true }, { text: 'Departamento', bold: true }],
                    [{ text: `${this.hora.usuario.nome} ` },
                    { text: `${this.hora.unidade.nome}`, }]
                  ]
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [70, 200, 80, '*'],
                  body: [
                    [{ text: 'Cracha', bold: true }, { text: 'Colaborador', bold: true }, { text: 'Centro de Custo', bold: true }, { text: 'Departamento', bold: true }],
                    [{ text: `${this.hora.chapa} ` },
                    { text: `${this.hora.funcionario}` },
                    { text: `${this.hora.unidade.centrocusto}` },
                    { text: `${this.hora.unidade.nome}` }],
                  ]
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [120, 120, 90, '*'],
                  body: [
                    [{ text: 'Dia Inicial', bold: true }, { text: 'Dia Final', bold: true }, { text: 'Total de Horas', alignment: 'center', bold: true }, { text: 'Valor RH', bold: true, alignment: 'center' }],
                    [{ text: `${this.datainicio} ` },
                    { text: `${this.datafinal} ` },
                    { text: `${this.hora.qthoras} `, alignment: 'center' }, { text: '' }]
                  ]
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: ['*'],
                  heights: [90],
                  body: [
                    [{ text: `Motivo : ${this.hora.motivo} ` }]
                  ]
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [500],
                  heights: [70],
                  body: [

                    [{ border: [false, false, false, false], text: ``, alignment: 'center', bold: true }],

                  ],
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [250, 250],
                  body: [

                    [{ border: [false, false, false, false], text: `${this.gestor.usuario.nome}`, alignment: 'center', bold: true }, { border: [false, false, false, false], text: 'Rubens Ferreira de Lima', alignment: 'center', bold: true }],
                    [{ border: [false, false, false, false], text: `${this.gestor.usuario.nivel.nome} - ${this.gestor.usuario.unidade.nome} `, alignment: 'center' }, { border: [false, false, false, false], text: 'Gerente Administrativo Financeiro', alignment: 'center' }],
                  ],
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [500],
                  heights: [70],
                  body: [

                    [{ border: [false, false, false, false], text: ``, alignment: 'center', bold: true }],

                  ],
                }
              },
              {
                margin: [0, 0, 0, 5],
                style: 'tableExample',
                table: {
                  widths: [250, 250],
                  body: [

                    [{ border: [false, false, false, false], text: `Rodrigo Teixeira Conceição`, alignment: 'center', bold: true }, { border: [false, false, false, false], text: 'José Rodolpho Perazzolo', alignment: 'center', bold: true }],
                    [{ border: [false, false, false, false], text: `Diretor Pedagogico `, alignment: 'center' }, { border: [false, false, false, false], text: 'Comissário Papal', alignment: 'center' }],
                  ],
                }
              },

            ]

          }
        }
      }
      pdfmake.createPdf(docDefinition).open();
    }
    //    pdfmake.createPdf(docDefinition).open();
    await this.uiService.dismiss();
  }




}




