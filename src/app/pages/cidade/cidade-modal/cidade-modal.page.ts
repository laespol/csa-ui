import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../../services/ui-service.service';

import { ModalController } from '@ionic/angular';
import { Hora } from 'src/app/interfaces/hora';
import { HoraService } from 'src/app/services/hora.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-cidade-modal',
  templateUrl: './cidade-modal.page.html',
  styleUrls: ['./cidade-modal.page.scss'],
})
export class CidadeModalPage implements OnInit {

  dataAtual = new Date;


  datafinal: string;
  datainicio: string;

  usuario: Usuario;

  data1: Date = null;

  horas: Hora[];
  horas1: Hora[];


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
        imagem2 : null,
        centrocusto: '',
        imovel : {
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
    private usuarioService: UsuarioService,
    public modalController: ModalController
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
    if (this.hora.idhora == 0) {
      this.hora = this.horaService.hora;
      //      await this.usuarioService.consultaUsuarioDetail(this.usuario);
      //     this.hora.usuario = this.usuarioService.usuario;
    }
  //  console.log(JSON.stringify(this.hora.usuario));
    await this.usuarioService.consultaUsuarioDetail(this.hora.usuario);
    this.hora.usuario = this.usuarioService.usuario;

  }

  async gravar() {

    // async gravar() {

    await this.uiService.present({
      message: 'aguarde'
    });

    if (this.datainicio != null) {
      var arrDataExclusao = this.datainicio.split('/');
      var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
        arrDataExclusao[2];
      this.hora.datainicio = new Date(stringFormatada);
    } else {
      this.hora.datainicio = null;
    }

    if (this.datafinal != null) {
      var arrDataExclusao = this.datafinal.split('/');
      var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
        arrDataExclusao[2];
      this.hora.datafinal = new Date(stringFormatada);
    } else {
      this.hora.datafinal = null;
    }



    if (this.hora.idhora == 0) {
      await this.horaService.gravaHora(this.hora);
    } else {
      await this.horaService.atualizaHora(this.hora);
    }
    await this.uiService.dismiss();

    if (this.horaService.gravado.ok) {
      this.uiService.alertaInformativa(this.horaService.gravado.mensagem);
      await this.voltar();
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
    this.hora.motivo = '';
    this.hora.qthoras = 0;
    this.hora.status = '';
    await this.dismiss();
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
}