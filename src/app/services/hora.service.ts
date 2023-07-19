import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Hora } from '../interfaces/hora';
import { NavController } from '@ionic/angular';
import { LazyLoadEvent } from 'primeng/api';
import { Imovel } from '../interfaces/imovel';
import { Grouphoras } from '../interfaces/groupHoras';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class HoraService {

  idimovel: string = "0";

  posicao: LazyLoadEvent;

  dt22: string = '';

  token: string = null;

  imovels: Imovel[];

  totalRecords: number = 0;

  grouphoras: Grouphoras[];

  horas: Hora[];
  hora: Hora;

  gravado = {
    ok: false,
    mensagem: ''
  }

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private loginService: LoginService
  ) { }

  async consultaHoras(skip: number, take: number, sortField: string, sortOrder: number, globalFilter: string, filters: string) {
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
//      console.log("this.http ")
      this.http
        .get(`${URL}/hora/${skip}&${take}&${sortField}&${sortOrder}&${globalFilter}&${filters}&`, httpOptions)
        .subscribe(async resp => {
          this.totalRecords = resp['totalRecords'];
          this.horas = resp['horas'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
//          console.log(resp['horas']);
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

  async gravaHora(hora) {
    //    console.log(JSON.stringify(hora));
    const data = { hora };
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
        .post(`${URL}/hora`, data, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          this.hora = resp['createHora'];
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

  async apagaHora(hora) {
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
        .delete(`${URL}/hora/${hora.idhora}`, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
  //        console.log(this.gravado.ok);
          resolve(resp['ok']);
        },
          error => {
            this.gravado.ok = false;
            this.gravado.mensagem = 'Erro na Exclusão';
  //          console.log(this.gravado.ok);
            resolve(false);
          }
        );
    });
  }

  async atualizaHora(hora) {
    console.log(JSON.stringify(hora));
    const data = { hora };
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
        .put(`${URL}/hora/${hora.idhora}`, data, httpOptions)
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

  async consultaHoraDetail(hora: Hora) {
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
        .get(`${URL}/hora/${hora.idhora}`, httpOptions)
        .subscribe(async resp => {
          this.hora = resp['hora'];
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

  async getHoraGrafico(ano: number) {

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
        .get(`${URL}/hora/grafico/geral/${ano}`, httpOptions)
        .subscribe(async resp => {
          this.grouphoras = resp['result'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          console.log(JSON.stringify(this.grouphoras));
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
