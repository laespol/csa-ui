import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../../services/ui-service.service';
import { ImovelService } from '../../../services/imovel.service';
import { Imovel } from '../../../interfaces/imovel';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-imovel-modal',
  templateUrl: './imovel-modal.page.html',
  styleUrls: ['./imovel-modal.page.scss'],
})

export class ImovelModalPage implements OnInit {

  dataAtual = new Date;

  data1: Date = null;

  imovel: Imovel = {
    idimovel: 0,
    nome: '',
    status: ''
  };

  constructor(
    private imovelService: ImovelService,
    private uiService: UiServiceService,
    public modalController: ModalController,
    private loginService:LoginService
  ) { }

  ngOnInit() {

    this.consultaImovel();
  }

  async consultaImovel() {
    this.loginService.validaToken();
    this.imovel = this.imovelService.imovel;
  }

  async gravar() {

    // async gravar() {

    await this.uiService.present({
      message: 'aguarde'
    });

    if (this.imovel.idimovel == 0) {
      await this.imovelService.gravaImovel(this.imovel);
    } else {
      await this.imovelService.atualizaImovel(this.imovel);
    }
    await this.uiService.dismiss();

    if (this.imovelService.gravado.ok) {
      this.uiService.alertaInformativa(this.imovelService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.imovelService.gravado.mensagem);
    }
    this.imovelService.consultaImovels();
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
    this.imovel.idimovel = 0;
    this.imovel.nome = '';
    this.imovel.status = '';
    await this.dismiss();
  }

  async apagar() {
    await this.uiService.present({
      message: 'aguarde'
    });
    await this.imovelService.apagaImovel(this.imovel);
    await this.uiService.dismiss();
    if (this.imovelService.gravado.ok) {
      this.uiService.alertaInformativa(this.imovelService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.imovelService.gravado.mensagem);
    }
  }
}