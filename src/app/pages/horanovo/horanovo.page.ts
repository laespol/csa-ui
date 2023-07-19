import { Component, OnInit } from '@angular/core';
import { Hora } from 'src/app/interfaces/hora';
import { HoraService } from 'src/app/services/hora.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController, NavController } from '@ionic/angular';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from 'src/app/interfaces/funcionario';
import { LoginService } from 'src/app/services/login.service';
import { Unidade } from 'src/app/interfaces/unidade';
import { UnidadeService } from 'src/app/services/unidade.service';
import { Tphora } from 'src/app/interfaces/tphora';
import { TphoraService } from 'src/app/services/tphora.service';

@Component({
  selector: 'app-horanovo',
  templateUrl: './horanovo.page.html',
  styleUrls: ['./horanovo.page.scss'],
})
export class HoranovoPage implements OnInit {

  dataAtual = new Date;

  completa: boolean = false;

  funcionario: Funcionario = {
    idfuncionario: 0,
    chapa: '',
    nome: '',
    departamento: '',
    centrocusto: '',
    idusercreateAt: 0,
    createdAt: null,
    iduserupdatedAt: 0,
    updatedAt: null,
    status: '',
  };

  funcionarios: Funcionario[];


  datafinal: string;
  datainicio: string;

  dtcompfim: string;
  dtcompini: string;

  usuario: Usuario;

  tphoras: Tphora[];
  
  tphora : Tphora = {
    idtphora: 0,
    nome: '', 
  }

  data1: Date = null;

  horas: Hora[];
  horas1: Hora[];

  unidades  : Unidade[];

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
    dtcompfim: null,
    dtcompini: null,
    hrcomp: 0,
    idtphora: 0,
    tphora: {
      idtphora: 0,
      nome: '',    
    },
    unidade: {
      idunidade: 0,
      nome: '',
      status: '',
      idimovel: 0,
      imagem1: null,
      imagem2: null,
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
        imovel: {
          idimovel: 0,
          nome: '',
          status: ''
        }
      }
    }
  }

  constructor(
    private horaService: HoraService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private loginService: LoginService,
    public modalController: ModalController,
    private usuarioService: UsuarioService,
    private funcionarioService: FuncionarioService,
    private unidadeService: UnidadeService,
    private tphoraService: TphoraService,
    ) { } 

  ngOnInit() {
    this.consultaCidade();
  }
  async consultaCidade() {
    this.hora = this.horaService.hora;

    if (this.hora.datainicio == null) {
      this.datainicio = "";
    } else {
      this.datainicio = new Date(this.hora.datainicio).toLocaleDateString();
    }
    if (this.hora.datafinal == null) {
      this.datafinal = "";
    } else {
      this.datafinal = new Date(this.hora.datafinal).toLocaleDateString();
    }
    if (this.hora.dtcompini == null) {
      this.dtcompini = "";
    } else {
      this.dtcompini = new Date(this.hora.dtcompini).toLocaleDateString();
    }
    if (this.hora.dtcompfim == null) {
      this.dtcompfim = "";
    } else {
      this.dtcompfim = new Date(this.hora.dtcompfim).toLocaleDateString();
    }
    if (this.hora.idhora == 0) {
      this.hora = this.horaService.hora;
      //      await this.usuarioService.consultaUsuarioDetail(this.usuario);
      //     this.hora.usuario = this.usuarioService.usuario;
    }
    //  console.log(JSON.stringify(this.hora.usuario));
    await this.usuarioService.consultaUsuarioDetail(this.hora.usuario);
    this.hora.usuario = this.usuarioService.usuario;

    await this.tphoraService.consultaTphoras();
    this.tphoras = this.tphoraService.tphoras;
    this.hora.idtphora = 1;

    await this.usuarioService.consultaUnidade(this.hora.usuario);

    this.hora.unidade = this.hora.usuario.unidade;
    
    this.unidades = this.usuarioService.unidades;

  }

  async gravar() {

    await this.uiService.present({
      message: 'aguarde'
    });

    //   console.log(this.datainicio);
    /*    if (this.datainicio != null) {
          var arrDataExclusao = this.datainicio.split('/');
          var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
            arrDataExclusao[2];
          this.hora.datainicio = new Date(stringFormatada);
          console.log(this.hora.datainicio);
        } else {
          this.hora.datainicio = null;
        }
        console.log(this.datafinal);
        if (this.datafinal != null) {
          var arrDataExclusao = this.datafinal.split('/');
          var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
            arrDataExclusao[2];
          this.hora.datafinal = new Date(stringFormatada);
          console.log(this.hora.datafinal);
        } else {
          this.hora.datafinal = null;
        }
    */
    this.hora.datainicio = new Date(this.datainicio);
    this.hora.datafinal = new Date(this.datafinal);
    this.hora.dtcompini = new Date(this.dtcompini);
    this.hora.dtcompfim = new Date(this.dtcompfim);

    this.hora.funcionario = this.funcionario.nome;
    this.hora.chapa = this.funcionario.chapa;
    this.hora.centrocusto = this.funcionario.centrocusto;
    this.hora.departamento = this.funcionario.departamento;
    this.hora.idunidade = this.hora.unidade.idunidade;

    //    console.log(this.hora.datafinal);

    if (this.hora.idhora == 0) {
      await this.horaService.gravaHora(this.hora);
    } else {
      await this.horaService.atualizaHora(this.hora);
    }
    await this.uiService.dismiss();

    if (this.horaService.gravado.ok) {
      this.uiService.alertaInformativa(this.horaService.gravado.mensagem);
      this.hora.idhora = 0;
      this.hora.funcionario = '';
      this.hora.chapa = '';
      this.hora.datafinal = null;
      this.hora.datainicio = null;
      this.hora.centrocusto = '';
      this.hora.departamento = '';
      this.datafinal = '';
      this.datainicio = '';
      this.hora.motivo = '';
      this.hora.qthoras = 0;
      this.hora.status = '';
      this.hora.idunidade = 0;
      this.funcionario.chapa = '';
      this.funcionario.nome = '';
      this.funcionario.centrocusto = '';
      this.funcionario.departamento = '';
      this.completa = false;
      this.hora.dtcompfim = null;
      this.hora.datainicio = null;
      this.hora.hrcomp = 0;
      this.hora.idtphora = 1;
      //      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.horaService.gravado.mensagem);
    }
    await this.dismiss();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async voltar() {
    this.hora.idhora = 0;
    this.hora.funcionario = '';
    this.hora.chapa = '';
    this.hora.datafinal = null;
    this.hora.datainicio = null;
    this.hora.centrocusto = '';
    this.hora.departamento = '';
    this.hora.motivo = '';
    this.hora.qthoras = 0;
    this.hora.status = '';
    this.hora.idunidade = 0;
    this.funcionario.centrocusto = '';
    this.funcionario.nome = '';
    this.funcionario.chapa = '';
    this.funcionario.departamento = '';
    this.completa = false;
    this.hora.dtcompfim = null;
    this.hora.datainicio = null;
    this.hora.hrcomp = 0;
    this.hora.idtphora = 0;
    this.navCtrl.navigateRoot('menu/cidade', { animated: true });
  }

  async apagar() {
    await this.uiService.present({
      message: 'aguarde'
    });
    await this.horaService.apagaHora(this.hora);
    await this.uiService.dismiss();
    if (this.horaService.gravado.ok) {
      this.uiService.alertaInformativa(this.horaService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.horaService.gravado.mensagem);
    }
  }

  async pesquisaChapa() {

    this.loginService.validaToken();
    if (this.funcionario.chapa.length >= 5) {
      await this.uiService.present({
        message: 'aguarde'
      });
      await this.funcionarioService.consultaFuncionarioDetail(this.funcionario);

      if (this.funcionarioService.gravado.ok) {
        this.funcionario = this.funcionarioService.funcionario;
 //       console.log("funcionario = " + JSON.stringify(this.funcionario));
        await this.uiService.dismiss();
      } else {
        await this.uiService.dismiss();
        this.funcionario.centrocusto = '';
        this.funcionario.nome = '';
        this.funcionario.departamento = '';
        this.uiService.alertaInformativa(this.funcionarioService.gravado.mensagem);

      }
    }

  }

  async pesquisaNome() {
    this.loginService.validaToken();
    
    if (this.funcionario.nome.length > 3 && this.funcionario.chapa == '') {
//      await this.uiService.present({
//        message: 'aguarde'
 //     });

      this.completa = true;
      await this.funcionarioService.consultaFuncionarioDetailNome(this.funcionario);
      this.funcionarios = this.funcionarioService.funcionarios;
//      console.log(JSON.stringify(this.funcionarioService.funcionarios));

//      await this.uiService.dismiss();
    }

  }

  async selecionaFuncionario(chapa) {
//    console.log(chapa);
    this.completa = false;
    await this.uiService.present({
      message: 'aguarde'
    });
    this.funcionario.chapa = chapa;
    await this.funcionarioService.consultaFuncionarioDetail(this.funcionario);
    if (this.funcionarioService.gravado.ok) {
      this.funcionario = this.funcionarioService.funcionario;
//      console.log("funcionario = " + JSON.stringify(this.funcionario));
      await this.uiService.dismiss();
    } else {
      await this.uiService.dismiss();
      this.funcionario.centrocusto = '';
      this.funcionario.nome = '';
      this.funcionario.departamento = '';
      this.uiService.alertaInformativa(this.funcionarioService.gravado.mensagem);

    }

  }
}