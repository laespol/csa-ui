import { NivelService } from './../../../services/nivel.service';
import { MenuService } from './../../../services/menu.service';
import { Nivel } from './../../../interfaces/nivel';
import { LoginService } from 'src/app/services/login.service';
import { Menu } from './../../../interfaces/menu';
import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../../services/ui-service.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { Unidade } from '../../../interfaces/unidade';
import { UnidadeService } from 'src/app/services/unidade.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.page.html',
  styleUrls: ['./usuario-modal.page.scss'],
})

export class UsuarioModalPage implements OnInit {
  unidades: Unidade[];
  nivels: Nivel[];
  menus: Menu[];

  dataAtual = new Date;

  data1: Date = null;

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

  constructor(
    private usuarioService: UsuarioService,
    private nivelService: NivelService,
    private menuService: MenuService,
    private uiService: UiServiceService,
    public modalController: ModalController,
    private unidadeService: UnidadeService,
    private loginService: LoginService,

  ) { }

  ngOnInit() {

    this.consultaUsuario();

  }

  async consultaUsuario() {
    this.loginService.validaToken();
    await this.consultaNivel();
    await this.consultaUnidade();
    await this.consultaMenu();
    this.usuario = this.usuarioService.usuario;
  }

  async consultaNivel() {
    await this.nivelService.consultaNivels();
    this.nivels = this.nivelService.nivels;
  }

  async consultaUnidade() {
    await this.unidadeService.consultaUnidades();
    this.unidades = this.unidadeService.unidades;
  }

  async consultaMenu() {
    await this.menuService.consultaMenus();
    this.menus = this.menuService.menus;
    console.log(JSON.stringify(this.menus))
  }

  async gravar() {
    await this.uiService.present({
      message: 'aguarde'
    });

    if (this.usuario.idusuario == 0) {
      this.usuario.senha = 'Mudar@123';
      console.log("Usuario = " + JSON.stringify(this.usuario));
      await this.usuarioService.gravaUsuario(this.usuario);
    } else {
      if (this.usuario.trocasenha) {
        this.usuario.senha = 'Mudar@123';
      }
      await this.usuarioService.atualizaUsuario(this.usuario);
    }
    await this.uiService.dismiss();

    if (this.usuarioService.gravado.ok) {
      this.uiService.alertaInformativa(this.usuarioService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.usuarioService.gravado.mensagem);
    }
    this.usuarioService.consultaUsuarios();
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
    console.log('voltar');
    this.usuario.idusuario = 0;
    this.usuario.nome = '';
    this.usuario.email = '';
    this.usuario.cpf = '';
    this.usuario.dtnascimento = null;
    this.usuario.sexo = '';
    this.usuario.status = '';
    this.usuario.idnivel = 0;
    this.usuario.idunidade = 0;
    this.usuario.trocasenha = true;
    this.usuario.idunidade = 0;
    this.usuario.senha = '';
    this.usuario.ramaln = '';
    this.usuario.celular = '';
    this.usuario.chatid = '';
    this.usuario.idmenu = 0;
    this.usuario.ti = false;
    this.usuario.contratost = false;
    this.usuario.vtodoscontratos= false;
    this.usuario.vtodoshoraextra= false;
    this.usuario.ccontratos= false;
    this.usuario.choraextra= false;

    await this.dismiss();
  }

  async apagar() {
    await this.uiService.present({
      message: 'aguarde'
    });
    await this.usuarioService.apagaUsuario(this.usuario);
    await this.uiService.dismiss();
    if (this.usuarioService.gravado.ok) {
      this.uiService.alertaInformativa(this.usuarioService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.usuarioService.gravado.mensagem);
    }
  }

}