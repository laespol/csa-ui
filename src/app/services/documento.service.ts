import { Injectable } from '@angular/core';
import { LoginService } from './../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { Documento } from '../interfaces/documento';
import { Contrato } from '../interfaces/contrato';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

   token: string = null;
    documentos: Documento[];
    documento: Documento;

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
  
    async consultaDocumentos() {
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
          .get(`${URL}/documento`, httpOptions)
          .subscribe(async resp => {
            this.documentos = resp['documentos'];
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
  
    async gravaDocumento( contrato, documentopdf: string) {
      console.log(documentopdf);

      const formData = new FormData();
      formData.append('documentopdf', documentopdf);

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
          .post(`${URL}/documento/${contrato.idcontrato}`, formData, httpOptions)
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
  
    async apagaDocumento(documento) {
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
          .delete(`${URL}/documento/${documento.idcontrato}`, httpOptions)
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
  
    async atualizaDocumento(documento) {
      console.log(JSON.stringify(documento));
      const data = { documento };
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
          .put(`${URL}/documento/${documento.idcontrato}`, data, httpOptions)
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
  
    async consultaDocumentoDetail(contrato) {

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
          .get(`${URL}/documento/${contrato.idcontrato}`, httpOptions)
          .subscribe(async resp => {
            this.documento = resp['documento'];
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
  