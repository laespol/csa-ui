import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Solicitacao } from '../interfaces/solicitacao';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  token: string = null;
  solicitacaos: Solicitacao[];
  solicitacao: Solicitacao;

  gravado = {
    ok: false,
    mensagem: ''
  }

  totalRecords: number = 0;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private loginService: LoginService
  ) { }

  async consultaSolicitacaos(skip: number, take: number, sortField: string, sortOrder: number, globalFilter: string, filters: string) {
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
        .get(`${URL}/solicitacao/${skip}&${take}&${sortField}&${sortOrder}&${globalFilter}&${filters}&`, httpOptions)
        .subscribe(async resp => {
          this.totalRecords = resp['totalRecords'];
          this.solicitacaos = resp['solicitacaos'];
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

  async gravaSolicitacao(solicitacao) {
    console.log(JSON.stringify(solicitacao));
    const data = { solicitacao };
    return new Promise(resolve => {
      this.http
        .post(`${URL}/solicitacao`, data)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.solicitacao = resp['createSolicitacao'];
          this.gravado.mensagem = resp['message'];
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

  async gravaSolicitacaoSegura(solicitacao) {
    console.log(JSON.stringify(solicitacao));
    const data = { solicitacao };
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
        .post(`${URL}/solicitacao/segura/`, data, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.solicitacao = resp['createSolicitacao'];
          this.gravado.mensagem = resp['message'];
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


  async apagaSolicitacao(solicitacao) {
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
        .delete(`${URL}/solicitacao/${solicitacao.idsolicitacao}`, httpOptions)
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

  async atualizaSolicitacao(solicitacao) {
    console.log(JSON.stringify(solicitacao));
    const data = { solicitacao };
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
        .put(`${URL}/solicitacao/${solicitacao.idsolicitacao}`, data, httpOptions)
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

  async consultaSolicitacaoDetail(solicitacao : Solicitacao) {
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
        .get(`${URL}/solicitacao/${solicitacao.idsolicitacao}`, httpOptions)
        .subscribe(async resp => {
          this.solicitacao = resp['solicitacao'];
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


}
