import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
})
export class SolicitacaoPage implements OnInit {

  anonymous: boolean = true;

  sendmail: Sendmail = {
    idsendmail: 0,
    destinatario: '',
    html: '',
    subject: '',
    status: ''
  };

  documentosol: Documentosol;

  uploadedFiles: any[] = [];

  tpsolicitacao: Tpsolicitacao = {
    idtpsolicitacao: 0,
    descricao: '',
    status: ''
  };

  tpsolicitacaos: Tpsolicitacao[];

  consultaIcon: string = 'eye';

  solicitacao: Solicitacao = {
    email: '',
    descricao: '',
    nome: '',
    telefone: '',
    sigilo: 0,
    status: '',
    idtpsolicitacao: 0,
    tpsolicitacao: {
      idtpsolicitacao: 0,
      descricao: '',
      status: '',
    }
  };

  get email() {
    return this.loginForm.get('email');
  }
  get nome() {
    return this.loginForm.get('nome');
  }
  get descricao() {
    return this.loginForm.get('descricao');
  }
  get telefone() {
    return this.loginForm.get('telefone');
  }
  get sigilo() {
    return this.loginForm.get('sigilo');
  }
  get tpsol() {
    return this.loginForm.get('tpsol');
  }

  public errorMessages = {
    email: [
      //      { type: 'required', message: 'email requerido' },
      { type: 'email', message: 'email Invalido' }
    ],
    descricao: [
      { type: 'required', message: 'Descrição requerido' },
      { type: 'minlength', message: 'Minimo 10 caracteres' },
      { type: 'maxlength', message: 'Maximo 3000 caracteres' }
    ],
    nome: [
      //      { type: 'required', message: 'Descrição requerido' },
      { type: 'minlength', message: 'Minimo 5 caracteres' },
      { type: 'maxlength', message: 'Maximo 60 caracteres' }
    ],
    telefone: [
      //      { type: 'required', message: 'Descrição requerido' },
      { type: 'maxlength', message: 'Maximo 14 caracteres' },
    ],
    sigilo: [
      { type: 'required', message: 'Sigilo requerido' },
    ],
    tpsol: [
      { type: 'required', message: 'Sigilo requerido' },
    ]
  };

  constructor(
    private navCtrl: NavController,
    private solicitcaoService: SolicitacaoService,
    private uiService: UiServiceService,
    private formBuilder: FormBuilder,
    private sendmailService: SendmailService,
    private tpsolicitacaoService: TpsolicitacaoService,
    public popoverController: PopoverController,
    private documentosolService: DocumentosolService
  ) { }

  ngOnInit() {
    this.tpsolicitacaoBusca();
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

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email]],
    descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    nome: ['', [Validators.minLength(5), Validators.maxLength(60)]],
    telefone: ['', [Validators.maxLength(14)]],
    sigilo: ['', [Validators.required]],
    tpsol: ['', [Validators.required]]
  })

  async submit() {

    await this.uiService.present({
      message: 'aguarde'
    });

    this.solicitacao.email = this.loginForm.value.email;
    this.solicitacao.nome = this.loginForm.value.nome;
    this.solicitacao.telefone = this.loginForm.value.telefone;
    this.solicitacao.sigilo = Number(this.loginForm.value.sigilo);
    this.solicitacao.tpsolicitacao.idtpsolicitacao = Number(this.loginForm.value.tpsol);
//    console.log(this.tpsolicitacao);



  //  console.log(this.solicitacao.tpsolicitacao);


    this.solicitacao.descricao = this.loginForm.value.descricao;
    await this.solicitcaoService.gravaSolicitacao(this.solicitacao);
    this.solicitacao = this.solicitcaoService.solicitacao;
    if (this.solicitcaoService.gravado.ok) {
      this.solicitacao = this.solicitcaoService.solicitacao;
      for (let file of this.uploadedFiles) {
        this.documentosolService.gravaDocumentosol(this.solicitacao, file);
      }

 //     console.log('Idtpsolicitacao = ' +   Number(this.loginForm.value.tpsol));

      this.tpsolicitacao.idtpsolicitacao = Number(this.loginForm.value.tpsol);
  
      await this.tpsolicitacaoService.consultaTpsolicitacaoDetail(this.tpsolicitacao);
  
      this.tpsolicitacao = this.tpsolicitacaoService.tpsolicitacao;
  
//      console.log('Resultado = ' +  this.tpsolicitacao.descricao );

      await this.geraemail();

      if (this.anonymous) {
        this.uiService.alertaInformativa('Gerado Solicitação Numero : ' + this.solicitacao.idsolicitacao + ' Enviado email para : ' + this.solicitacao.email);
      } else {
        this.uiService.alertaInformativa('Gerado Solicitação Numero : ' + this.solicitacao.idsolicitacao + ' Solicitação Anonimas não recebem email');
      }

      await this.clear();
    } else {
      this.uiService.alertaInformativa(this.solicitcaoService.gravado.mensagem);
    }

    await this.uiService.dismiss();

  }

  async voltar() { }

  async inputFileChange(demo: any) {
    for (let file of demo.files) {
      this.uploadedFiles.push(file);
    }
  }

  async clear() {
    this.loginForm.reset;
    console.log('cheguei no clear');
    this.loginForm.value.email = '';
    this.loginForm.value.descricao = '';
    this.loginForm.value.nome = '';
    this.loginForm.value.sigilo = '';
    this.loginForm.value.telefone = '';
    this.loginForm.value.tpsol = '';
    this.solicitacao.email = '';
    this.solicitacao.descricao = '';
    this.solicitacao.nome = '';
    this.solicitacao.sigilo = 0;
    this.solicitacao.telefone = '';
    this.solicitacao.idtpsolicitacao = 0;
    this.uploadedFiles = [];
    this.navCtrl.navigateRoot('', { animated: true });
  }

  async geraemail() {

    console.log('geraemail = ' );


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



}
