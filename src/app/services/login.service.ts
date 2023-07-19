import { Injectable } from '@angular/core';
//import { Storage } from '@capacitor/storage';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Registro } from '../interfaces/login';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  registro: Registro;

  url: string = '';

  token: string = null;

  gravado = {
    ok: false,
    mensagem: ''
  }

  voltar: string = '';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) { }

  login(email: string, senha: string) {

    const data = { email, senha };
//    console.log(email, senha);
    return new Promise(resolve => {

      this.http.post(`${URL}/login`, data).subscribe(async resp => {
        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          this.registro = resp['registro'];
//          this.url = 'entrei no ok'
          resolve(true);
        } else {
//          this.url = 'entrei no  nao ok'
          this.token = null;
//          Storage.clear();
          resolve(false);
        }
      },
        error => {
          this.url = JSON.stringify( error);
          this.token = null;
//          Storage.clear();
          resolve(false);
        }
      )
    });
  }

  logout() {
    this.token = null;
//    Storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  async guardarToken(token: string) {
    this.token = token;
//    Storage.set({
//      key: 'token',
//      value: token
//    });
    await this.validaToken();
  }

  async cargarToken() {
 //   const token = await Storage.get({ key: 'token' });
 //   this.token = token.value || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };

      this.http.get(`${URL}/usuario`, httpOptions).subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      },
        error => {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      );
    });
  }


  async trocasenha(idusuario: number, novasenha: string) {
    const usuario = { idusuario, novasenha }

    const data = { usuario };

    return new Promise(resolve => {
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
        .post(`${URL}/login/trocasenha`, data, httpOptions)
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
}
class Map<T> {
  private items: { [key: string]: T };

  public constructor() {
      this.items = Object.create(null);
  }

  public set(key: string, value: T): void {
      this.items[key] = value;
  }

  public get(key: string): T {
      return this.items[key];
  }

  public remove(key: string): T {
      let value = this.get(key);
      delete this.items[key];
      return value;
  }
}

function getMainImageUrl(images: Map<string>): string {
  return images.get("main");
}