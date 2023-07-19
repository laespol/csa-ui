import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../../services/ui-service.service';
import { UnidadeService } from '../../../services/unidade.service';
import { Unidade } from '../../../interfaces/unidade';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Imovel } from 'src/app/interfaces/imovel';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-unidade-modal',
  templateUrl: './unidade-modal.page.html',
  styleUrls: ['./unidade-modal.page.scss'],
})

export class UnidadeModalPage implements OnInit {

  dataAtual = new Date;

  imovels : Imovel[];

  data1: Date = null;

  unidade: Unidade = {
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
  };

  constructor(
    private unidadeService: UnidadeService,
    private uiService: UiServiceService,
    public modalController: ModalController,
    private loginService:LoginService,
    private imovelService: ImovelService
  ) { }

  ngOnInit() {

    this.consultaUnidade();
  }

  async consultaUnidade() {
    this.loginService.validaToken();
    await this.imovelService.consultaImovels();
    this.imovels = this.imovelService.imovels;
    this.unidade = this.unidadeService.unidade;
  }

  async gravar() {

    // async gravar() {

    await this.uiService.present({
      message: 'aguarde'
    });

    if (this.unidade.idunidade == 0) {
      await this.unidadeService.gravaUnidade(this.unidade);
    } else {
      await this.unidadeService.atualizaUnidade(this.unidade);
    }
    await this.uiService.dismiss();

    if (this.unidadeService.gravado.ok) {
      this.uiService.alertaInformativa(this.unidadeService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.unidadeService.gravado.mensagem);
    }
    this.unidadeService.consultaUnidades();
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
    this.unidade.idunidade = 0;
    this.unidade.nome = '';
    this.unidade.status = '';
    this.unidade.idimovel = 0;
    this.unidade.centrocusto = '';
    await this.dismiss();
  }

  async apagar() {
    await this.uiService.present({
      message: 'aguarde'
    });
    await this.unidadeService.apagaUnidade(this.unidade);
    await this.uiService.dismiss();
    if (this.unidadeService.gravado.ok) {
      this.uiService.alertaInformativa(this.unidadeService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.unidadeService.gravado.mensagem);
    }
  }
}