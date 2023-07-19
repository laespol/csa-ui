import { Injectable } from '@angular/core';
import { LoginService } from './../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { Documentosol } from '../interfaces/documentosol';
import { Contrato } from '../interfaces/contrato';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DocumentosolService {

  token: string = null;
  documentosols: Documentosol[];
  documentosol: Documentosol;

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

  async consultaDocumentosols() {
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
        .get(`${URL}/documentosol`, httpOptions)
        .subscribe(async resp => {
          this.documentosols = resp['documentosols'];
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

  async gravaDocumentosol(solicitacao, documentosolpdf: Blob) {
    console.log(solicitacao);
    console.log(documentosolpdf);

    const formData = new FormData();
    formData.append('documentopdf', documentosolpdf);

    return new Promise(resolve => {
      /*        this.token = this.loginService.token;
              if (!this.token) {
                this.navCtrl.navigateRoot('/login');
                return Promise.resolve('');
              }
              const httpOptions = {
                headers: new HttpHeaders({
                  'Authorization': 'Bearer ' + this.token
                })
              };
        */
      this.http
        .post(`${URL}/documentosol/${solicitacao.idsolicitacao}`, formData)
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

  async gravaDocumentosolSegura(solicitacao, documentosolpdf: Blob) {
    console.log(solicitacao);
    console.log(documentosolpdf);

    const formData = new FormData();
    formData.append('documentopdf', documentosolpdf);

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
        .post(`${URL}/documentosol/segura/${solicitacao.idsolicitacao}`, formData, httpOptions)
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

  async apagaDocumentosol(documentosol) {
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
        .delete(`${URL}/documentosol/${documentosol.idcontrato}`, httpOptions)
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

  async atualizaDocumentosol(documentosol) {
    console.log(JSON.stringify(documentosol));
    const data = { documentosol };
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
        .put(`${URL}/documentosol/${documentosol.idcontrato}`, data, httpOptions)
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

  async consultaDocumentosolDetail(solicitacao) {

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
        .get(`${URL}/documentosol/${solicitacao.idsolicitacao}`, httpOptions)
        .subscribe(async resp => {
          this.documentosols = resp['documentosols'];
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
