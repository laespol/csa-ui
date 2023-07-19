import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Requisicao } from '../interfaces/requisicao';
import { NavController } from '@ionic/angular';
import { LazyLoadEvent } from 'primeng/api';
import { Imovel } from '../interfaces/imovel';
import { Grouprequisicao } from '../interfaces/grouprequisicao';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  idimovel: string = "0";

  grouprequisicaos: Grouprequisicao[];

  posicao: LazyLoadEvent;

  dt22: string = '';

  token: string = null;

  imovels: Imovel[];

  totalRecords: number = 0;

  requisicaos: Requisicao[];
  requisicao: Requisicao;

  gravado = {
    ok: false,
    mensagem: ''
  }

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private loginService: LoginService
  ) { }

  async consultaRequisicaos(skip: number, take: number, sortField: string, sortOrder: number, globalFilter: string, filters: string) {
    return new Promise(resolve => {


      this.token = this.loginService.token;
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve('');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };
      this.http
        .get(`${URL}/requisicao/${skip}&${take}&${sortField}&${sortOrder}&${globalFilter}&${filters}&`, httpOptions)
        .subscribe(async resp => {
          this.totalRecords = resp['totalRecords'];
          this.requisicaos = resp['requisicaos'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          console.log(resp['length']);
          resolve(true);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na consulta';
            resolve(false);
          }
        );
    });
  }

  async gravaRequisicao(requisicao) {
    //    console.log(JSON.stringify(requisicao));
    const data = { requisicao };
    return new Promise(resolve => {
      this.token = this.loginService.token;
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve('');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };

      this.http
        .post(`${URL}/requisicao`, data, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          this.requisicao = resp['createRequisicao'];
          resolve(resp['ok']);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na Gravação';
            resolve(false);
          }
        );
    });
  }

  async apagaRequisicao(requisicao) {
    return new Promise(resolve => {
      this.token = this.loginService.token;
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve('');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };

      this.http
        .delete(`${URL}/requisicao/${requisicao.idrequisicao}`, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          console.log(this.gravado.ok);
          resolve(resp['ok']);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na Exclusão';
            console.log(this.gravado.ok);
            resolve(false);
          }
        );
    });
  }

  async atualizaRequisicao(requisicao) {
    console.log(JSON.stringify(requisicao));
    const data = { requisicao };
    return new Promise(resolve => {
      this.token = this.loginService.token;
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve('');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };

      this.http
        .put(`${URL}/requisicao/${requisicao.idrequisicao}`, data, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          resolve(resp['ok']);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na Atualização';
            resolve(false);
          }
        );
    });
  }

  async consultaRequisicaoDetail(requisicao: Requisicao) {
    return new Promise(resolve => {
      this.token = this.loginService.token;
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve('');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };
      this.http
        .get(`${URL}/requisicao/${requisicao.idrequisicao}`, httpOptions)
        .subscribe(async resp => {
          this.requisicao = resp['requisicao'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          resolve(true);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na Consulta';
            resolve(false);
          }
        );
    });
  }

  async getRequisicaogeral() {
//    console.log('getRequisicaogeral');
    return new Promise(resolve => {
      this.token = this.loginService.token;
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve('');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };
      this.http
        .get(`${URL}/requisicao/relatorio/geral`, httpOptions)
        .subscribe(async resp => {
          this.requisicaos = resp['requisicaos'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          console.log(resp['length']);
          resolve(true);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na consulta';
            resolve(false);
          }
        );
    });
  }

  async getRequisicaoGrafico(ano: number) {

    return new Promise(resolve => {
      this.token = this.loginService.token;
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve('');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };
 //     var ano = 2023;
      this.http
        .get(`${URL}/requisicao/grafico/geral/${ano}`, httpOptions)
        .subscribe(async resp => {
          this.grouprequisicaos = resp['result'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
//          console.log(JSON.stringify(this.grouprequisicaos));
          resolve(true);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na Consulta';
            resolve(false);
          }
        );
    });
  }

  async getRequisicaoGrafico1(ano: number) {

    return new Promise(resolve => {
      this.token = this.loginService.token;
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve('');
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };
 //     var ano = 2023;
      this.http
        .get(`${URL}/requisicao/grafico/RequisicaoGrafico/${ano}`, httpOptions)
        .subscribe(async resp => {
          this.grouprequisicaos = resp['result'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
//          console.log(JSON.stringify(this.grouprequisicaos));
          resolve(true);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na Consulta';
            resolve(false);
          }
        );
    });
  }

}
