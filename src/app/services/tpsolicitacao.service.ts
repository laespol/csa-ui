import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tpsolicitacao } from '../interfaces/tpsolicitacao';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TpsolicitacaoService {
  token: string = null;
  tpsolicitacaos: Tpsolicitacao[];
  tpsolicitacao: Tpsolicitacao;

  gravado = {
    ok: false,
    mensagem: ''
  }

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private loginService: LoginService
  ) { }

  async consultaTpsolicitacaos() {
    return new Promise(resolve => {


      this.http
        .get(`${URL}/tpsolicitacao`)
        .subscribe(async resp => {
          this.tpsolicitacaos = resp['tpsolicitacaos'];
  //        console.log('tpsolicitacaos = ' + this.tpsolicitacaos);
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
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

  async gravaTpsolicitacao(tpsolicitacao) {
    console.log(JSON.stringify(tpsolicitacao));
    const data = { tpsolicitacao };
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
        .post(`${URL}/tpsolicitacao`, data, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
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

  async apagaTpsolicitacao(tpsolicitacao) {
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
        .delete(`${URL}/tpsolicitacao/${tpsolicitacao.idtpsolicitacao}`, httpOptions)
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

  async atualizaTpsolicitacao(tpsolicitacao) {
    console.log(JSON.stringify(tpsolicitacao));
    const data = { tpsolicitacao };
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
        .put(`${URL}/tpsolicitacao/${tpsolicitacao.idtpsolicitacao}`, data, httpOptions)
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

  async consultaTpsolicitacaoDetail(tpsolicitacao : Tpsolicitacao) {
    console.log("tpsolicitacao = " + JSON.stringify(tpsolicitacao));
    return new Promise(resolve => {
      console.log("tpsolicitacao.idtpsolicitacao = " + tpsolicitacao.idtpsolicitacao);
      this.http
        .get(`${URL}/tpsolicitacao/${tpsolicitacao.idtpsolicitacao}`)
        .subscribe(async resp => {
          this.tpsolicitacao = resp['tpsolicitacao'];
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
