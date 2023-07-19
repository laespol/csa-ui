import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NavController } from '@ionic/angular';
import { Solicitacao } from 'src/app/interfaces/solicitacao';
import { Tpsolicitacao } from 'src/app/interfaces/tpsolicitacao';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { TpsolicitacaoService } from 'src/app/services/tpsolicitacao.service';
import { UiServiceService } from '../../services/ui-service.service';
import { PopoverController } from '@ionic/angular';
import { Documentosol } from 'src/app/interfaces/documentosol';
import { DocumentosolService } from 'src/app/services/documentosol.service';
import { SendmailService } from 'src/app/services/sendmail.service';
import { Sendmail } from 'src/app/interfaces/sendmail';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Registro } from 'src/app/interfaces/login';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-solicitacaonovo',
  templateUrl: './solicitacaonovo.page.html',
  styleUrls: ['./solicitacaonovo.page.scss'],
})
export class SolicitacaonovoPage implements OnInit {

  anonymous: boolean = true;

  zoom: number = 1;

  rotation = 0;

  pdfSrc: string = '';

  sigilo: string = '';

  updatedAt: string;

  iduserupdatedAt: string;

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

  sendmail: Sendmail = {
    idsendmail: 0,
    destinatario: '',
    html: '',
    subject: '',
    status: ''
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

  documentosol: Documentosol;

  documentosols: Documentosol[];

  uploadedFiles: any[] = [];

  tpsolicitacao: Tpsolicitacao = {
    idtpsolicitacao: 0,
    descricao: '',
    status: ''
  };

  tpsolicitacaos: Tpsolicitacao[];

  consultaIcon: string = 'eye';

  solicitacao: Solicitacao = {
    idsolicitacao: 0,
    email: '',
    descricao: '',
    nome: '',
    telefone: '',
    sigilo: 0,
    status: '',
    idtpsolicitacao: 0,
    idusercreateAt: 0,
    createdAt: null,
    iduserupdatedAt: 0,
    updatedAt: null,
    tpsolicitacao: {
      idtpsolicitacao: 0,
      descricao: '',
      status: '',
    }
  };

  constructor(
    private navCtrl: NavController,
    private solicitcaoService: SolicitacaoService,
    private uiService: UiServiceService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private sendmailService: SendmailService,
    private tpsolicitacaoService: TpsolicitacaoService,
    public popoverController: PopoverController,
    private documentosolService: DocumentosolService
  ) { }

  ngOnInit() {
    this.loginService.validaToken();
    this.consulta();

  }

  async consulta() {
    await this.tpsolicitacaoBusca();
    this.registro = this.loginService.registro;
    this.solicitacao = this.solicitcaoService.solicitacao;
    this.sigilo = this.solicitacao.sigilo.toString();
    //   console.log("Sigilo = " + this.solicitacao.sigilo);
    if (this.solicitacao.iduserupdatedAt == null) {
      this.iduserupdatedAt = '';
    } else {
      this.usuario.idusuario = this.solicitacao.iduserupdatedAt;
      await this.usuarioService.consultaUsuarioDetail(this.usuario);
      this.iduserupdatedAt = this.usuarioService.usuario.nome;
    }

    if (this.solicitacao.idsolicitacao != 0) {
      await this.documentosolService.consultaDocumentosolDetail(this.solicitacao);
      this.documentosols = this.documentosolService.documentosols;

//      for (let file of this.documentosols) {
 //       console.log(JSON.stringify(file));
 //       this.uploadedFiles.push(file);
 //     }

//      this.uploadedFiles = this.documentosolService.documentosols;
//      this.documentosols = this.documentosolService.documentosols;
//      console.log("Entrada " + this.documentosolService.documentosols.length);
 //     for (let x = 0; x < this.documentosolService.documentosols.length; x++) {
 //       this.uploadedFiles.push(this.documentosolService.documentosols[x]);
//      }
//      console.log("arquivo = " + this.uploadedFiles.length);

    }

    if (this.solicitacao.updatedAt == null) {
      this.updatedAt = null;
    } else {
      this.updatedAt = new Date(this.solicitacao.updatedAt).toLocaleDateString();
    }
  }

  async verificaSigilo($event) {
    if ($event.detail.value == 2) {
      this.anonymous = false;
    } else {
      this.anonymous = true;
    }
  }

  async tpsolicitacaoBusca() {
    await this.tpsolicitacaoService.consultaTpsolicitacaos();
    this.tpsolicitacaos = this.tpsolicitacaoService.tpsolicitacaos;
  }

  async gravar() {
    await this.uiService.present({
      message: 'aguarde'
    });
    this.solicitacao.sigilo = Number(this.sigilo);

 //   console.log("idsolicitacao = " + this.solicitacao.idsolicitacao);

    if (this.solicitacao.idsolicitacao == 0 || this.solicitacao.idsolicitacao == null) {
      await this.solicitcaoService.gravaSolicitacaoSegura(this.solicitacao);
    } else {
      await this.solicitcaoService.atualizaSolicitacao(this.solicitacao);
    }

    //    await this.solicitcaoService.gravaSolicitacaoSegura(this.solicitacao);
    this.solicitacao = this.solicitcaoService.solicitacao;
    if (this.solicitcaoService.gravado.ok) {
      this.solicitacao = this.solicitcaoService.solicitacao;
      for (let file of this.uploadedFiles) {
        this.documentosolService.gravaDocumentosol(this.solicitacao, file);
      }

//      console.log('Idtpsolicitacao = ' + this.solicitacao.idtpsolicitacao);
      this.tpsolicitacao.idtpsolicitacao = this.solicitacao.idtpsolicitacao;
      await this.tpsolicitacaoService.consultaTpsolicitacaoDetail(this.tpsolicitacao);
 //     console.log('this.tpsolicitacaoService.tpsolicitacao.idtpsolicitacao = ' + this.tpsolicitacaoService.tpsolicitacao.idtpsolicitacao);
      this.tpsolicitacao = this.tpsolicitacaoService.tpsolicitacao;

      //      console.log('Resultado = ' +  this.tpsolicitacao.descricao );

      await this.geraemail();

      //      if (this.anonymous) {
      //        this.uiService.alertaInformativa('Gerado Solicitação Numero : ' + this.solicitacao.idsolicitacao + ' Enviado email para : ' + this.solicitacao.email);
      //      } else {
      //        this.uiService.alertaInformativa('Gerado Solicitação Numero : ' + this.solicitacao.idsolicitacao + ' Solicitação Anonimas não recebem email');
      //      }

      await this.clear();
    } else {
      this.uiService.alertaInformativa(this.solicitcaoService.gravado.mensagem);
    }

    await this.uiService.dismiss();

  }

  async voltar() { }

  async inputFileChange(demo: any) {
    for (let file of demo.files) {
      this.documentosols.push(file);
 //     this.uploadedFiles.push(file); 
    }
  }

  async clear() {
    this.solicitacao.email = '';
    this.solicitacao.descricao = '';
    this.solicitacao.nome = '';
    this.solicitacao.sigilo = 0;
    this.solicitacao.telefone = '';
    this.solicitacao.idtpsolicitacao = 0;
    this.uploadedFiles = [];
    this.navCtrl.navigateRoot('menu/relsolicitacao', { animated: true });
  }

  async geraemail() {

    console.log('geraemail = ');


    this.sendmail.destinatario = this.solicitacao.email;
    this.sendmail.html = `
    <h2><strong><span style="0color: #0000CD\&quot;;">Numero solicitação Ouvidoria : ${this.solicitacao.idsolicitacao}</span></strong></h2>
    <p>&nbsp;</p>
    <p>Email : ${this.solicitacao.email}</p>
    <p>Nome :  ${this.solicitacao.nome}</p>
    <p>Telefone : ${this.solicitacao.telefone}</p>
    <p>Tipo de Solicitação :  ${this.tpsolicitacao.descricao}</p>
    <p>&nbsp;</p>
    <p>Descrição : ${this.solicitacao.descricao}</p>
    <p>&nbsp;</p>

          `;

    this.sendmail.subject = 'Solicitação de Ouvidoria ' + this.solicitacao.idsolicitacao;

    await this.sendmailService.gravaSendmail(this.sendmail);
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

  async selecionadocumentosol(documentopdf) {
    this.pdfSrc = documentopdf;

  }

  async finalizar() {
    this.solicitacao.statussolicitacao = 'F';
    await this.gravar();
  }

}
