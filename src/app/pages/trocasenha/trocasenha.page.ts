import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-trocasenha',
  templateUrl: './trocasenha.page.html',
  styleUrls: ['./trocasenha.page.scss'],
})
export class TrocasenhaPage implements OnInit {

  showPassword: boolean = false;

  passwordToggleIcon: string = 'eye';

  get senhanova() {
    return this.trocarsenhaForm.get('senhanova');
  }
  get rsenhanova() {
    return this.trocarsenhaForm.get('rsenhanova');
  }

  public errorMessages = {

    senhanova: [
      { type: 'required', message: 'Senha requerido' },
      { type: 'minlength', message: 'Minimo 8 caracteres' }
    ],
    rsenhanova: [
      { type: 'required', message: 'Senha requerido' },
      { type: 'minlength', message: 'Minimo 8 caracteres' }
    ]
  };

  ngOnInit() {

  }

  trocarsenhaForm = this.formBuilder.group({
    senhanova: ['', [Validators.required, Validators.minLength(8)]],
    rsenhanova: ['', [Validators.required, Validators.minLength(8)]],
  })

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private formBuilder: FormBuilder,
  ) { }

  async submit() {
    if (this.trocarsenhaForm.value.senhanova != this.trocarsenhaForm.value.rsenhanova) {
      this.uiService.alertaInformativa('Senhas digitadas diferentes');
      this.navCtrl.navigateForward('/trocasenha', { animated: true });

    } else {
      await this.uiService.present({
        message: 'aguarde'
      });

      //    console.log ("trocasenha " + this.loginService.registro.idusuario, ) ;
      //       this.uiService.presentLoading('Aguarde');
      const valido = await this.loginService.trocasenha(
        this.loginService.registro.idusuario,
        this.trocarsenhaForm.value.senhanova
      );

      await this.uiService.dismiss();

      this.navCtrl.navigateRoot('/login', { animated: true });
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
