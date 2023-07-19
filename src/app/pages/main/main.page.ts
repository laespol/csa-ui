import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/interfaces/login';



@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  registro: Registro;


  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.validaToken();
    this.registro = this.loginService.registro;




  }




}
