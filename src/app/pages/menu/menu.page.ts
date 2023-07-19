import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/interfaces/login';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  registro: Registro;

  page: any;

  pages1 = [
    {
      title: 'main',
      url: '/menu/main',
      icon: 'home'
    },
    {
      title: 'Grafico',
      open: false,
      children: [
        {
          title: 'Tipo Mes',
          url: '/menu/tipo-mes',
          icon: 'stats-chart-outline'
        }
      ]
    },
    {
      title: 'Operacao',
      open: false,
      children: [
        {
          title: 'Entrega',
          url: '/menu/entrega',
          icon: 'cart-outline'
        },
        {
          title: 'Motorista',
          url: '/menu/motorista',
          icon: 'car-outline'
        },
        {
          title: 'Erros WMS',
          url: '/menu/wms',
          icon: 'car-outline'
        }
      ]
    },
    {
      title: 'Cadastros Basicos',
      open: false,
      children: [
        {
          title: 'Programacao',
          url: '/menu/programacao',
          icon: 'calendar-outline'
        },
        {
          title: 'P&L',
          url: '/menu/pl',
          icon: 'calendar-outline'
        },
        {
          title: 'P&L Table',
          url: '/menu/pltable',
          icon: 'calendar-outline'
        },
        {
          title: 'Cidade',
          url: '/menu/cidade',
          icon: 'newspaper-outline'
        },
        {
          title: 'Estado',
          url: '/menu/estado',
          icon: 'earth-outline'
        },
        {
          title: 'Terminal',
          url: '/menu/terminal',
          icon: 'airplane-outline'
        },
        {
          title: 'Usuario',
          url: '/menu/user',
          icon: 'person-outline'
        },
        {
          title: 'controle recebimento',
          url: '/menu/controle-recebimento',
          icon: 'person-outline'
        },
        {
          title: 'Apoio',
          url: '/menu/apoio',
          icon: 'alarm-outline'
        }
      ]
    },
    {
      title: 'Sair',
      url: '/login',
      icon: 'exit-outline'
    }
  ]

  pages2 = [{ title: 'main', url: '/menu/main', icon: 'home' }, { title: 'Operacao', open: false, children: [{ title: 'Erros WMS', url: '/menu/wms', icon: 'car-outline' }] }, { title: 'Sair', url: '/login', icon: 'exit-outline' }]


  constructor(
    private loginService: LoginService,
    private contratoService: ContratoService,
    private screenOrientation: ScreenOrientation,
    public platform: Platform,
  ) {
    this.platform = platform;
    if (this.platform.is('android')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    if (this.platform.is('ios')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    
  }

  ngOnInit() {
    this.constroi();
  }

  async constroi() {
    this.contratoService.posicao = null;
    this.contratoService.dt22 = '';
    this.contratoService.idimovel = '0';

    // await this.usuarioService.consultaMenu();
    this.registro = this.loginService.registro;
    //  console.log("menu = " + JSON.stringify(this.registro));
    this.page = this.registro.menu.Menuitem;
    //    if (this.menu.tpmenu == 1) {
    //      console.log("menu1 = " + JSON.stringify(this.menu.tpmenu));
    //     this.page = this.pages1;
    //      this.page = JSON.stringify(this.menu.tpmenu);
    //    } else {
    //      console.log("menu2 = " + JSON.stringify(this.menu.tpmenu));
    //      this.page = this.pages1;
    //    }
    await this.loginService.validaToken();
  }

}
