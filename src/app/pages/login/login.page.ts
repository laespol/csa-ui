import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { ActivatedRoute } from '@angular/router';
import { Registro } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  idhistorico: string = null;
  idhistoricodir: string = null;

  url : string = '';

  registro: Registro = {
    idusuario: 0,
    nome: '',
    email: '',
    idnivel: 0,
    nivel: {
      idnivel: 0,
      nome: '',
    },
    senha: 0,
    ti: false,
    contratost: false,
    contrato: false,
    vtodoscontratos: false,
    vtodoshoraextra: false,
    ccontratos: false,
    choraextra: false,
    trocasenha: '',
    menu: {
      idmenu: 0,
      nome: '',
      Menuitem: [{
        idmenuitem: 0,
        idmenu: 0,
        seq: 0,
        titulo: '',
        url: '',
        icon: '',

      }]
    },
    unidade: {
      idunidade: 0,
      nome: '',
    }
  };

  showPassword: boolean = false;

  passwordToggleIcon: string = 'eye';

  get email() {
    return this.loginForm.get('email');
  }
  get senha() {
    return this.loginForm.get('senha');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'email requerido' }
    ],
    senha: [
      { type: 'required', message: 'Senha requerido' },
      { type: 'minlength', message: 'Minimo 8 caracteres' }
    ]
  };

  ngOnInit() {

  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.idhistorico = params['zhr'];
      this.idhistoricodir = params['zhp'];
     });
  }

  async submit() {

    await this.uiService.present({
      message: 'aguarde'
    });
    //    this.uiService.presentLoading('Aguarde');
    const valido = await this.loginService.login(
      this.loginForm.value.email,
      this.loginForm.value.senha
    );
    this.url = this.loginService.url;
    await this.uiService.dismiss();
    //   this.uiService.dismissLoading();
    if (valido) {

      if (this.loginService.registro.trocasenha) {
        this.navCtrl.navigateForward('/trocasenha', { animated: true });
      } else {
        this.navCtrl.navigateRoot('/menu', { animated: true });
      }
    } else {
      this.loginForm.value.senha = '';
      this.uiService.alertaInformativa('Usuario ou Senha Incorreta.');
    }
  }

  togglePassord(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordToggleIcon = 'eye-off'
    } else {
      this.passwordToggleIcon = 'eye'
    }
  }
}

