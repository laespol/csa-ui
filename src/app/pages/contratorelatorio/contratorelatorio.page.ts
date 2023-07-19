import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Contrato } from 'src/app/interfaces/contrato';
import { Custo } from 'src/app/interfaces/custo';
import { Imovel } from 'src/app/interfaces/imovel';
import { Registro } from 'src/app/interfaces/login';
import { Unidade } from 'src/app/interfaces/unidade';
import { ContratoService } from 'src/app/services/contrato.service';
import { CustoService } from 'src/app/services/custo.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { ImovelService } from 'src/app/services/imovel.service';
import { LoginService } from 'src/app/services/login.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import * as FileSaver from 'file-saver';


import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ColunaService } from 'src/app/services/coluna.service';
import { Coluna } from 'src/app/interfaces/coluna';
import { Usuario } from 'src/app/interfaces/usuario';
import { element } from 'protractor';

@Component({
  selector: 'app-contratorelatorio',
  templateUrl: './contratorelatorio.page.html',
  styleUrls: ['./contratorelatorio.page.scss'],
})
export class ContratorelatorioPage implements OnInit {

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

  colunas: Coluna[];
  usuario: Usuario = {
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
  };
  selectedColumns: Coluna[];
  selectedImovels: Imovel[];
  selectedUnidade: Unidade[];
  cols: Coluna[];
  aditivo: string = '';

  lista: any = [];
  Heading: any = []
  cabec: string[] = [];
  linha: string[] = [];
  renovauto: string;
  aprovado: string;
  periodo: string;
  iddocumento: string;

  imovel: Imovel;
  unidade: Unidade;
  imovels: Imovel[];
  unidades: Unidade[];
  custo: Custo;
  custos: Custo[];
  contrato: Contrato;
  contratos: Contrato[];

  statuscontrato: string = '';

  dtvigfinal: string;

  dtviginicio: string;
  dtasscont: string;
  dtrecdoc: string;
  createdAt: string;
  updatedAt: string;

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

  constructor(
    private uiService: UiServiceService,
    private unidadeService: UnidadeService,
    private imovelService: ImovelService,
    private custoService: CustoService,
    private contratoService: ContratoService,
    private loginService: LoginService,
    private documentoService: DocumentoService,
    public modalController: ModalController,
    private colunaService: ColunaService,
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.consultaContrato();
  }

  async consultaContrato() {

    this.loginService.validaToken();
    this.registro = this.loginService.registro;

    await this.consultaUnidade();
    await this.consultaImovel();
    await this.consultaColuna();
    // await this.exportExcel();

  }
  async consultaUnidade() {
    await this.unidadeService.consultaUnidades();
    this.unidades = this.unidadeService.unidades;
    this.selectedUnidade = this.unidades;
    //   console.log(this.unidades);
  }

  async consultaColuna() {
    this.coluna.programa = 'contrato';
    await this.colunaService.consultaColunaDetail(this.coluna);
    //    console.log("Colunas = " + JSON.stringify(this.colunaService.colunas));
    this.cols = this.colunaService.colunas;
    this.selectedColumns = this.colunaService.colunas;
  }

  async consultaImovel() {
    await this.imovelService.consultaImovels();
    this.imovels = this.imovelService.imovels;
    this.selectedImovels = this.imovels;
  }

  async consultaCusto(idimovel) {
    //    console.log("idimovel " + idimovel)
    this.custo.idimovel = idimovel;
    await this.custoService.consultaCustoDetail(this.custo);
    this.custos = this.custoService.custos;
  }

  async exportExcel() {

    

    await this.contratoService.getContratogeral();
    this.contratos = this.contratoService.contratos;
    var santoamerico = '';

    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    this.cabec = [];
    this.linha = [];
    this.Heading = [];
    this.linha = [];

    for (let x = 0; x < this.selectedColumns.length; x++) {
      this.cabec[x] = this.selectedColumns[x].header;
    }
    this.Heading.push(this.cabec);

    for (let i = 0; i < this.contratos.length; i++) {
      this.linha = [];
      for (let x = 0; x < this.selectedColumns.length; x++) {

        if (this.selectedColumns[x].type == 'string') {
          this.linha[x] = this.contratos[i][this.selectedColumns[x].field];
        }
        if (this.selectedColumns[x].type == 'soma') {
          this.linha[x] = this.contratos[i][this.selectedColumns[x].agregado2].replace('.',',');
        }
        if (this.selectedColumns[x].type == 'date') {
          if (this.contratos[i][this.selectedColumns[x].field] == null) {
            this.dtviginicio = '';
          } else {
            this.dtviginicio = new Date(this.contratos[i][this.selectedColumns[x].field]).toLocaleDateString();
          }
          this.linha[x] = this.dtviginicio;
        }
        console.log('Data = ' + this.selectedColumns[x].type + ' - ' + this.contratos[i][this.selectedColumns[x].field]);
        if (this.selectedColumns[x].type == 'date1') {
          console.log('Data = ' + this.contratos[i][this.selectedColumns[x].field]);
          if (this.contratos[i][this.selectedColumns[x].field] == null || this.contratos[i][this.selectedColumns[x].field] == '') {
            this.dtviginicio = '';
          } else {
            this.dtviginicio = new Date(this.contratos[i][this.selectedColumns[x].field]).toLocaleDateString();
          }
          this.linha[x] = this.dtviginicio;
        }
        if (this.selectedColumns[x].type == 'agregate1') {
          this.linha[x] = this.contratos[i][this.selectedColumns[x].field][this.selectedColumns[x].agregado1];
        }
        if (this.selectedColumns[x].type == 'agregate2') {
          this.linha[x] = this.contratos[i][this.selectedColumns[x].field][this.selectedColumns[x].agregado1][this.selectedColumns[x].agregado2];
        }
        if (this.selectedColumns[x].type == 'status') {
          if (this.contratos[i][this.selectedColumns[x].field]) {
            this.linha[x] = 'Sim';
          } else {
            this.linha[x] = 'Não';
          }
        }
        if (this.selectedColumns[x].type == 'stcontrato') {
          if (this.contratos[i][this.selectedColumns[x].field]) {
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
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Contratos');
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `contratos`);
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

}
