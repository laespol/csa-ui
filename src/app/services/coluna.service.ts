import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Coluna } from '../interfaces/coluna';
import { NavController } from '@ionic/angular';
import { Usuariocoluna } from '../interfaces/usuariocoluna';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ColunaService {
  token: string = null;
  colunas: Coluna[];
  coluna: Coluna;
  selectedColumns: any[];

  usuariocoluna: Usuariocoluna;
  usuariocolunas: Usuariocoluna[];

  gravado = {
    ok: false,
    mensagem: ''
  }

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private loginService: LoginService
  ) { }



  async gravaColuna(selectedColumns , programa) {
    console.log(selectedColumns.length);
    const data = { selectedColumns };
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
        .post(`${URL}/coluna/${programa}`, data, httpOptions)
        .subscribe(async resp => {
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          this.coluna = resp['createColunas'];
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

  async consultaColunaDetail(coluna : Coluna) {
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
        .get(`${URL}/coluna/${coluna.programa}`, httpOptions)
        .subscribe(async resp => {
          this.colunas = resp['colunas'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
//          console.log("this.colunas " + this.colunas)
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
  async consultaColunaDetailUsuario(coluna : Coluna) {
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
        .get(`${URL}/coluna/usuario/${coluna.programa}`, httpOptions)
        .subscribe(async resp => {
          this.usuariocolunas = resp['colunas'];
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
