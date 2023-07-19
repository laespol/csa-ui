import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Geradospdf } from '../interfaces/geradospdf';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GeradospdfService {
  token: string = null;
  geradospdfs: Geradospdf[];
  geradospdf: Geradospdf;

  gravado = {
    ok: false,
    mensagem: ''
  }

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private loginService: LoginService
  ) { }


  async consultaGeradospdfDetail(geradospdf : Geradospdf) {
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
        .get(`${URL}/geradospdf/${geradospdf.programa}`, httpOptions)
        .subscribe(async resp => {
          this.geradospdf = resp['geradospdf'];
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
