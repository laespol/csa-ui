import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { LoginService } from 'src/app/services/login.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { ModalController, NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Unidade } from 'src/app/interfaces/unidade';
import { Contrato } from 'src/app/interfaces/contrato';
import * as FileSaver from 'file-saver';
import { ImovelService } from 'src/app/services/imovel.service';
import { Imovel } from 'src/app/interfaces/imovel';
import { Documento } from 'src/app/interfaces/documento';
import { DocumentoService } from 'src/app/services/documento.service';
import { Registro } from 'src/app/interfaces/login';
import { Custo } from 'src/app/interfaces/custo';
import { CustoService } from 'src/app/services/custo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { isCPF, isCNPJ } from 'validation-br';
import { validate, mask } from 'validation-br/dist/cnpj';
import * as cnpj from 'validation-br/dist/cnpj';
import * as cpf from 'validation-br/dist/cpf';

import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload/fileupload';
const reader = new FileReader();



@Component({
  selector: 'app-contratonovo',
  templateUrl: './contratonovo.page.html',
  styleUrls: ['./contratonovo.page.scss'],
})
export class ContratonovoPage implements OnInit {

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
//  @ViewChild('fileUpload') fileUpload: any;

  cpnj_error: string = '';

  documentopdf: string = '';

  zoom: number = 1;
  rotation = 0;
  dt22: string = '';

  dtviginicio: string;
  dtvigfinal: string;
  dtasscont: string;
  dtrecdoc: string;
  updatedAt: string;

  iduserupdatedAt: string;

  dateExample: string = '';
  dateExample1: string = '';

  minDate: any = (new Date()).getFullYear() - 5;
  maxData: any = (new Date()).getFullYear() + 5;

  pdfSrc: string = '';

  mostra: Boolean = false;

  unidades: Unidade[];

  imovels: Imovel[];

  custos: Custo[];

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

  custo: Custo = {
    idcusto: 0,
    nome: '',
    idimovel: 0,
    status: '',
    imovel: {
      idimovel: 0,
      nome: '',
      status: ''
    }
  };

  documento: Documento = {
    iddocumento: 0,
    idcontrato: 0,
    documentopdf: null,
    idusercreateAt: 0,
    createdAt: null,
    iduserupdatedAt: 0,
    updatedAt: null,
    status: '',
  };

  contrato: Contrato = {
    idcontrato: 0,
    razaosocial: '',
    cnpj: '',
    descricao: '',
    dtviginicio: null,
    dtvigfinal: null,
    idunidade: 0,
    correcao: '',
    valorproposta: 0,
    localizacao: '',
    idusercreateAt: 0,
    createdAt: null,
    iduserupdatedAt: 0,
    status: '',
    statuscontrato: '',
    aditivo: false,
    dtasscont: null,
    dtrecdoc: null,
    aprovado: false,
    periodo: '',
    tipopagamento: '',
    idcusto: 0,
    numeroparcelas: 0,
    renovauto: false,
    custo: {
      idcusto: 0,
      nome: '',
      idimovel: 0,
      status: '',
      imovel: {
        idimovel: 0,
        nome: '',
        status: ''
      }
    },
  };


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
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private documentoService: DocumentoService,
    public modalController: ModalController,
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private datePipe: DatePipe,

  ) { }


  ngOnInit() {
    this.consultaContrato();
  }

  async consultaContrato() {

    this.loginService.validaToken();
    this.registro = this.loginService.registro;

    await this.consultaUnidade();
    await this.consultaImovel();

    if (this.contratoService.contrato.idcontrato == 0) {
      await this.clear();
    } else {
      await this.consultaCusto(this.contratoService.contrato.custo.idimovel);

      this.contrato = this.contratoService.contrato;

      if (this.contrato.iduserupdatedAt == null) {
        this.iduserupdatedAt = '';
      } else {
        this.usuario.idusuario = this.contrato.iduserupdatedAt;
        await this.usuarioService.consultaUsuarioDetail(this.usuario);
        this.iduserupdatedAt = this.usuarioService.usuario.nome;
      }

      if (this.contrato.updatedAt == null) {
        this.updatedAt = null;
      } else {
        this.updatedAt = new Date(this.contrato.updatedAt).toLocaleDateString();
      }

      if (this.contrato.dtviginicio == null) {
        this.dtviginicio = null;
      } else {
        this.dtviginicio = new Date(this.contrato.dtviginicio).toLocaleDateString();
      }

      if (this.contrato.dtvigfinal == null) {
        this.dtvigfinal = "Indeterminado";
      } else {
        this.dtvigfinal = new Date(this.contrato.dtvigfinal).toLocaleDateString();
      }

      if (this.contrato.dtasscont == null) {
        this.dtasscont = null;
      } else {
        this.dtasscont = new Date(this.contrato.dtasscont).toLocaleDateString();
      }

      if (this.contrato.dtrecdoc == null) {
        this.dtrecdoc = null;
      } else {
        this.dtrecdoc = new Date(this.contrato.dtrecdoc).toLocaleDateString();
      }

      await this.uiService.present({
        message: 'aguarde'
      });
      await this.documentoService.consultaDocumentoDetail(this.contrato);
      this.documento = this.documentoService.documento;
      if (this.documento != null) {
        this.pdfSrc = this.documentoService.documento.documentopdf;
        //       this.documentoService.documento.documentopdf = null;
      }
      await this.uiService.dismiss();
      await this.dismiss();
    }

  }

  async consultaUnidade() {
    await this.unidadeService.consultaUnidades();
    this.unidades = this.unidadeService.unidades;
    //   console.log(this.unidades);
  }


  async consultaImovel() {
    await this.imovelService.consultaImovels();
    this.imovels = this.imovelService.imovels;
    console.log(JSON.stringify(this.imovels));
  }

  async consultaCusto(idimovel) {
    //    console.log("idimovel " + idimovel)
    this.custo.idimovel = idimovel;
    await this.custoService.consultaCustoDetail(this.custo);
    this.custos = this.custoService.custos;
  }

  async carrega() {
    this.mostra = true;
    this.pdfSrc = this.documentopdf;
  }

  async inputFileChange(demo: any) {
    const formData = new FormData();
    if (demo.files && demo.files[0]) {
      //     console.log(demo.files[0]);
      this.documentopdf = demo.files[0];
      let reader = new FileReader();
      reader.addEventListener("load", result => {
        this.pdfSrc = reader.result.toString();
        //      console.log(`Teste #2: ${reader.result}`)
      })
      reader.readAsDataURL(demo.files[0]);

    //  this.fileUpload.clear();


      //    console.log(`Teste #1: ${reader.result}`)


      //      this.pdfSrc = formData.get().toString;
      // await this.gravaPDF(documentopdf);
    }
  }

  async gravar() {

    await this.uiService.present({
      message: 'aguarde'
    });

    if (this.dtviginicio != null) {
      var arrDataExclusao = this.dtviginicio.split('/');
      var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
        arrDataExclusao[2];
      this.contrato.dtviginicio = new Date(stringFormatada);
    } else {
      this.contrato.dtviginicio = null;
    }

    if (this.dtvigfinal != null) {
      var arrDataExclusao = this.dtvigfinal.split('/');
      var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
        arrDataExclusao[2];
      this.contrato.dtvigfinal = new Date(stringFormatada);
    } else {
      this.contrato.dtvigfinal = null;
    }

    if (this.dtasscont != null) {
      var arrDataExclusao = this.dtasscont.split('/');
      var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
        arrDataExclusao[2];
      this.contrato.dtasscont = new Date(stringFormatada);
    } else {
      this.contrato.dtasscont = null;
    }

    if (this.dtrecdoc != null) {
      var arrDataExclusao = this.dtrecdoc.split('/');
      var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
        arrDataExclusao[2];
      this.contrato.dtrecdoc = new Date(stringFormatada);
    } else {
      this.contrato.dtrecdoc = null;
    }

 //   if (this.contrato.renovauto) {
//      this.contrato.dtvigfinal = null;
//    }

    if (this.contrato.idcontrato == 0) {
      this.contrato.statuscontrato = 'A';
      await this.contratoService.gravaContrato(this.contrato);
      this.contrato = this.contratoService.contrato;
      if (this.documentopdf != '') {
        await this.documentoService.gravaDocumento(this.contrato, this.documentopdf);
      }
    } else {
      await this.contratoService.atualizaContrato(this.contrato);
      if (this.documentopdf != '') {
        await this.documentoService.gravaDocumento(this.contrato, this.documentopdf);
      }
    }

    await this.uiService.dismiss();
    if (this.contratoService.gravado.ok) {
      this.uiService.alertaInformativa(this.contratoService.gravado.mensagem);
      await this.clear();
      await this.dismiss();
      await this.clear();
    } else {
      this.uiService.alertaInformativa(this.contratoService.gravado.mensagem);
      await this.dismiss();
      await this.clear();
    }
    await this.dismiss();
    await this.clear();

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async gravaPDF(documentopdf) {
    await this.uiService.present({
      message: 'aguarde'
    });

    //    console.log(documentopdf);
    await this.documentoService.gravaDocumento(this.contrato, documentopdf);
    this.mostra = false;
    await this.documentoService.consultaDocumentoDetail(this.contrato);
    //    await this.documentoService.consultaDocumentoDetail(this.documento)
    //   console.log(JSON.stringify(this.documentoService.documento.iddocumento));

    this.pdfSrc = this.documentopdf;

    this.documentoService.documento.documentopdf = null;

    await this.uiService.dismiss();
    await this.dismiss();
  }

  async voltar() {
    this.contratoService.contrato.idcontrato = 0;
    this.contrato.idcontrato = 0;
    this.contrato.razaosocial = '';
    this.contrato.cnpj = '';
    this.contrato.descricao = '';
    this.contrato.dtviginicio = null;
    this.contrato.dtvigfinal = null;
    this.contrato.idunidade = 0;
    this.contrato.correcao = '';
    this.contrato.valorproposta = 0;
    this.contrato.localizacao = '';
    this.contrato.status = '';
    this.contrato.statuscontrato = '';
    this.contrato.aditivo = false;
    this.contrato.dtasscont = null;
    this.contrato.dtrecdoc = null;
    this.contrato.aprovado = false;
    this.contrato.periodo = '';
    this.contrato.tipopagamento = '';
    this.contrato.idcusto = 0;
    this.contrato.numeroparcelas = 0;
    this.contrato.renovauto = false;
    this.contrato.iduserupdatedAt = 0;
    this.pdfSrc = '';

    this.documentopdf = '';
    this.navCtrl.navigateRoot('menu/contrato', { animated: true });

  }

  async clear() {
    this.contrato.idcontrato = 0;
    this.contrato.razaosocial = '';
    this.contrato.custo.idimovel = 0;
    this.contrato.cnpj = '';
    this.contrato.descricao = '';
    this.contrato.dtviginicio = null;
    this.contrato.dtvigfinal = null;
    this.contrato.idunidade = 0;
    this.contrato.correcao = '';
    this.contrato.valorproposta = 0;
    this.contrato.localizacao = '';
    this.contrato.status = '';
    this.contrato.statuscontrato = '';
    this.contrato.aditivo = false;
    this.contrato.dtasscont = null;
    this.contrato.dtrecdoc = null;
    this.contrato.aprovado = false;
    this.contrato.periodo = '';
    this.contrato.tipopagamento = '';
    this.contrato.idcusto = 0;
    this.contrato.numeroparcelas = 0;
    this.contrato.renovauto = false;
    this.contrato.iduserupdatedAt = 0;
    this.pdfSrc = '';
    this.documentopdf = '';
  }

  subtractZoom() {
    if (this.zoom > 0) {
      this.zoom -= 0.5;
    }
  }

  addZoom() {
    this.zoom += 0.5;
  }

  rotateDoc() {
    this.rotation += 90;
  }

  async verificaCNPJ() {
    if (this.contrato.cnpj.length >= 14) {
    if (isCNPJ(this.contrato.cnpj)) {
      this.contrato.cnpj = cnpj.mask(this.contrato.cnpj);
      this.cpnj_error = '';
    } else {
      this.cpnj_error = 'CNPJ Inváido';
      console.log('Não cnpj');
    }
  } else {
    if (isCPF(this.contrato.cnpj)) {
      this.contrato.cnpj = cpf.mask(this.contrato.cnpj);
      this.cpnj_error = '';
    } else {
      this.cpnj_error = 'CPF Inváido';
      console.log('Não cpf');
    }
  }
  }

}
