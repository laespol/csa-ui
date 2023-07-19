import { Component, OnInit, ViewChild } from '@angular/core';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { LoginService } from 'src/app/services/login.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { ModalController, NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Unidade } from 'src/app/interfaces/unidade';
import { Requisicao } from 'src/app/interfaces/requisicao';
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



@Component({
  selector: 'app-requisicaonovo',
  templateUrl: './requisicaonovo.page.html',
  styleUrls: ['./requisicaonovo.page.scss'],
})
export class RequisicaonovoPage implements OnInit {

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

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


  requisicao: Requisicao = {
    idrequisicao: 0,
    descricao: '',
    idunidade: 0,
    correcao: '',
    valorproposta: 0,
    idusercreateAt: 0,
    createdAt: null,
    iduserupdatedAt: 0,
    status: '',
    statusrequisicao: '',
    aditivo: false,
    aprovado: false,
    periodo: 0,
    tipopagamento: '',
    idcusto: 0,
    numeroparcelas: 0,
    renovauto: false,
    justificativa: '',
    vigencia: '',
    outros: '',
    prazo : '',
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
    private requisicaoService: RequisicaoService,
    private loginService: LoginService,
    private documentoService: DocumentoService,
    public modalController: ModalController,
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private datePipe: DatePipe,

  ) { }

  ngOnInit() {
    this.consultaRequisicao();
  }


  async consultaRequisicao() {

    this.loginService.validaToken();
    this.registro = this.loginService.registro;

    await this.consultaUnidade();
    await this.consultaImovel();

    if (this.requisicaoService.requisicao.idrequisicao == 0) {
      await this.clear();
    } else {
      await this.consultaCusto(this.requisicaoService.requisicao.custo.idimovel);

      this.requisicao = this.requisicaoService.requisicao;

      if (this.requisicao.iduserupdatedAt == null) {
        this.iduserupdatedAt = '';
      } else {
        this.usuario.idusuario = this.requisicao.iduserupdatedAt;
        await this.usuarioService.consultaUsuarioDetail(this.usuario);
        this.iduserupdatedAt = this.usuarioService.usuario.nome;
      }

      if (this.requisicao.updatedAt == null) {
        this.updatedAt = null;
      } else {
        this.updatedAt = new Date(this.requisicao.updatedAt).toLocaleDateString();
      }


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
  }

  async consultaCusto(idimovel) {
    //    console.log("idimovel " + idimovel)
    this.custo.idimovel = idimovel;
    await this.custoService.consultaCustoDetail(this.custo);
    this.custos = this.custoService.custos;
  }


  async inputFileChange(event) {
    if (event.files && event.files[0]) {
      const documentopdf = event.files[0];
      await this.gravaPDF(documentopdf);
    }
  }

  async gravar() {

    await this.uiService.present({
      message: 'aguarde'
    });


    if (this.requisicao.idrequisicao == 0) {
      this.requisicao.statusrequisicao = 'C';
      await this.requisicaoService.gravaRequisicao(this.requisicao);
      this.requisicao = this.requisicaoService.requisicao;

    } else {
      await this.requisicaoService.atualizaRequisicao(this.requisicao);
    }

    await this.uiService.dismiss();
    if (this.requisicaoService.gravado.ok) {
      this.uiService.alertaInformativa(this.requisicaoService.gravado.mensagem);
      await this.clear();
      await this.dismiss();
      await this.clear();
    } else {
      this.uiService.alertaInformativa(this.requisicaoService.gravado.mensagem);
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
    await this.documentoService.gravaDocumento(this.requisicao, documentopdf);
    this.mostra = false;
    await this.documentoService.consultaDocumentoDetail(this.requisicao);
    //    await this.documentoService.consultaDocumentoDetail(this.documento)
    //   console.log(JSON.stringify(this.documentoService.documento.iddocumento));

    this.pdfSrc = this.documentoService.documento.documentopdf;
    this.documentoService.documento.documentopdf = null;

    await this.uiService.dismiss();
    await this.dismiss();
  }

  async voltar() {
    this.requisicaoService.requisicao.idrequisicao = 0;
    this.requisicao.idrequisicao = 0;
    this.requisicao.descricao = '';
    this.requisicao.idunidade = 0;
    this.requisicao.correcao = '';
    this.requisicao.valorproposta = 0;
    this.requisicao.status = '';
    this.requisicao.statusrequisicao = '';
    this.requisicao.aditivo = false;
    this.requisicao.aprovado = false;
    this.requisicao.periodo = 0;
    this.requisicao.tipopagamento = '';
    this.requisicao.idcusto = 0;
    this.requisicao.numeroparcelas = 0;
    this.requisicao.renovauto = false;
    this.requisicao.justificativa = '';
    this.requisicao.vigencia = '';
    this.requisicao.outros = '';
    this.requisicao.prazo = '';


    this.navCtrl.navigateRoot('menu/requisicao', { animated: true });

  }

  async clear() {
    this.requisicao.idrequisicao = 0;
    this.requisicao.descricao = '';
    this.requisicao.idunidade = 0;
    this.requisicao.correcao = '';
    this.requisicao.valorproposta = 0;
    this.requisicao.status = '';
    this.requisicao.statusrequisicao = '';
    this.requisicao.aditivo = false;
    this.requisicao.aprovado = false;
    this.requisicao.periodo = 0;
    this.requisicao.tipopagamento = '';
    this.requisicao.idcusto = 0;
    this.requisicao.numeroparcelas = 0;
    this.requisicao.renovauto = false;
    this.requisicao.justificativa = '';
    this.requisicao.vigencia = '';
    this.requisicao.outros = '';
    this.requisicao.prazo = '';
  }

}
