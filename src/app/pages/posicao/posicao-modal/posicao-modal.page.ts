import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../../services/ui-service.service';
import { PosicaoService } from '../../../services/posicao.service';
import { Posicao } from '../../../interfaces/posicao';
import { LoginService } from 'src/app/services/login.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-posicao-modal',
  templateUrl: './posicao-modal.page.html',
  styleUrls: ['./posicao-modal.page.scss'],
})

export class PosicaoModalPage implements OnInit {

  dataAtual = new Date;

  data1: Date = null;

  posicao: Posicao = {
    statuscompra: '',
    nome: '',
    status: '',
  };

  constructor(
    private posicaoService: PosicaoService,
    private uiService: UiServiceService,
    public modalController: ModalController,
    private loginService:LoginService
  ) { }

  ngOnInit() {

    this.consultaPosicao();
  }

  async consultaPosicao() {
    this.loginService.validaToken();
    this.posicao = this.posicaoService.posicao;
  }

  async gravar() {

    // async gravar() {

    await this.uiService.present({
      message: 'aguarde'
    });

    if (this.posicao.statuscompra == '') {
      await this.posicaoService.gravaPosicao(this.posicao);
    } else {
      await this.posicaoService.atualizaPosicao(this.posicao);
    }
    await this.uiService.dismiss();

    if (this.posicaoService.gravado.ok) {
      this.uiService.alertaInformativa(this.posicaoService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.posicaoService.gravado.mensagem);
    }
    this.posicaoService.consultaPosicaos();
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
    this.posicao.statuscompra = "";
    this.posicao.nome = '';
    this.posicao.status = '';
    await this.dismiss();
  }

  async apagar() {
    await this.uiService.present({
      message: 'aguarde'
    });
    await this.posicaoService.apagaPosicao(this.posicao);
    await this.uiService.dismiss();
    if (this.posicaoService.gravado.ok) {
      this.uiService.alertaInformativa(this.posicaoService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.posicaoService.gravado.mensagem);
    }
  }
}