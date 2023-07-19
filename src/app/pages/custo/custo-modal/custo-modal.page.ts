import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../../services/ui-service.service';
import { CustoService } from '../../../services/custo.service';
import { Custo } from '../../../interfaces/custo';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Imovel } from 'src/app/interfaces/imovel';
import { ImovelService } from 'src/app/services/imovel.service';
 
@Component({
  selector: 'app-custo-modal',
  templateUrl: './custo-modal.page.html',
  styleUrls: ['./custo-modal.page.scss'],
})

export class CustoModalPage implements OnInit {

  dataAtual = new Date;

  data1: Date = null;

  imovels : Imovel[];

  custo : Custo = {
    idcusto: 0,
    nome: '',
    idimovel : 0,
    status: '',
    imovel : {
      idimovel: 0,
      nome: '',
      status: ''
    }
};

  constructor(
    private custoService: CustoService,
    private uiService: UiServiceService,
    public modalController: ModalController,
    private loginService:LoginService,
    private imovelService: ImovelService
  ) { }

  ngOnInit() {

    this.consultaCusto();
  }

  async consultaCusto() {
    this.loginService.validaToken();
    await this.imovelService.consultaImovels();
    this.imovels = this.imovelService.imovels;
    this.custo = this.custoService.custo;
  }

  async gravar() {

    // async gravar() {

    await this.uiService.present({
      message: 'aguarde'
    });

    if (this.custo.idcusto == 0) {
      await this.custoService.gravaCusto(this.custo);
    } else {
      await this.custoService.atualizaCusto(this.custo);
    }
    await this.uiService.dismiss();

    if (this.custoService.gravado.ok) {
      this.uiService.alertaInformativa(this.custoService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.custoService.gravado.mensagem);
    }
    this.custoService.consultaCustos();
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
    this.custo.idcusto = 0;
    this.custo.nome = '';
    this.custo.status = '';
    await this.dismiss();
  }

  async apagar() {
    await this.uiService.present({
      message: 'aguarde'
    });
    await this.custoService.apagaCusto(this.custo);
    await this.uiService.dismiss();
    if (this.custoService.gravado.ok) {
      this.uiService.alertaInformativa(this.custoService.gravado.mensagem);
      await this.voltar();
    } else {
      this.uiService.alertaInformativa(this.custoService.gravado.mensagem);
    }
  }
}