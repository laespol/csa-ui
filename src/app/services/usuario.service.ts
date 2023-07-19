import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { NavController } from '@ionic/angular';
import { Gestor } from '../interfaces/gestor';
import { Unidade } from '../interfaces/unidade';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;
  usuarios: Usuario[];
  usuario: Usuario;
  gestor: Gestor;
  unidades : Unidade[];

  gravado = {
    ok: false,
    mensagem: ''
  }

  length : number = 0;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private loginService: LoginService
  ) { }

  async consultaUsuarios() {
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
        .get(`${URL}/usuario`, httpOptions)
        .subscribe(async resp => {
          this.usuarios = resp['usuarios'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
          this.length = resp['length'];
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

  async gravaUsuario(usuario) {
    console.log(JSON.stringify(usuario));
    const data = { usuario };
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
        .post(`${URL}/usuario`, data, httpOptions)
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

  async apagaUsuario(usuario) {
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
        .delete(`${URL}/usuario/${usuario.idunidade}`, httpOptions)
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

  async atualizaUsuario(usuario) {
    console.log(JSON.stringify(usuario));
    const data = { usuario };
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
        .put(`${URL}/usuario/${usuario.idusuario}`, data, httpOptions)
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

  async consultaUsuarioDetail(usuario : Usuario) {
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
        .get(`${URL}/usuario/${usuario.idusuario}`, httpOptions)
        .subscribe(async resp => {
          this.usuario = resp['usuario'];
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
  async consultaUnidade(usuario: Usuario) {
 //   console.log(JSON.stringify(usuario));
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
        .get(`${URL}/usuario/unidades/${usuario.idusuario}`, httpOptions)
        .subscribe(async resp => {
          this.unidades = resp['unidades'];
          this.gravado.ok = resp['ok'];
          this.gravado.mensagem = resp['message'];
//          console.log("resp[gestor] = " + JSON.stringify(this.unidades));
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

  async consultaGestor(unidade:Unidade) {
    //   console.log(JSON.stringify(usuario));
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
           .get(`${URL}/usuario/gestor/${unidade.idunidade}`, httpOptions)
           .subscribe(async resp => {
             this.gestor = resp['gestor'];
             this.gravado.ok = resp['ok'];
             this.gravado.mensagem = resp['message'];
    //         console.log("resp[gestor] = " + JSON.stringify(this.gestor))
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

}
