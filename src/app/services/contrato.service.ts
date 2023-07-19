import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contrato } from '../interfaces/contrato';
import { NavController } from '@ionic/angular';
import { LazyLoadEvent } from 'primeng/api';
import { Imovel } from '../interfaces/imovel';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  idimovel: string = "0";

  posicao: LazyLoadEvent;

  dt22: string = '';

  token: string = null;

  imovels: Imovel[];

  totalRecords: number = 0;

  contratos: Contrato[];
  contrato: Contrato;

  gravado = {
    ok: false,
    mensagem: ''
  }

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private loginService: LoginService
  ) { }

  async consultaContratos(skip: number, take: number, sortField: string, sortOrder: number, globalFilter: string, filters: string) {
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
        .get(`${URL}/contrato/${skip}&${take}&${sortField}&${sortOrder}&${globalFilter}&${filters}&`, httpOptions)
        .subscribe(async resp => {
          this.totalRecords = resp['totalRecords'];
          this.contratos = resp['contratos'];
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

  async gravaContrato(contrato) {
    //    console.log(JSON.stringify(contrato));
    const data = { contrato };
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
        .post(`${URL}/contrato`, data, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          this.contrato = resp['createContrato'];
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

  async apagaContrato(contrato) {
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
        .delete(`${URL}/contrato/${contrato.idcontrato}`, httpOptions)
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

  async atualizaContrato(contrato) {
    console.log(JSON.stringify(contrato));
    const data = { contrato };
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
        .put(`${URL}/contrato/${contrato.idcontrato}`, data, httpOptions)
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

  async consultaContratoDetail(contrato: Contrato) {
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
        .get(`${URL}/contrato/${contrato.idcontrato}`, httpOptions)
        .subscribe(async resp => {
          this.contrato = resp['contrato'];
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

  async getContratogeral() {
    //    console.log('getContratogeral');
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
        .get(`${URL}/contrato/relatorio/geral`, httpOptions)
        .subscribe(async resp => {
          this.contratos = resp['contratos'];
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

  async postContratoPesquisageral(event: LazyLoadEvent) {
    return new Promise(resolve => {

      if (event != null) {
        const data = { event };
        console.log("data = " + data)

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
          .post(`${URL}/contrato/pesquisa/geral`, data, httpOptions)
          .subscribe(async resp => {
            this.totalRecords = resp['totalRecords'];
            this.contratos = resp['contratos'];
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
      }
    });

  }

}
