import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Chart, registerables } from 'chart.js'; import { Grouprequisicao } from "src/app/interfaces/groupRequisicao";
import { RequisicaoService } from "src/app/services/requisicao.service";
Chart.register(...registerables);

@Component({
  selector: 'app-graficorequisicao',
  templateUrl: './graficorequisicao.page.html',
  styleUrls: ['./graficorequisicao.page.scss'],
})

export class GraficorequisicaoPage implements AfterViewInit {

  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('barCanvas1') private barCanvas1: ElementRef;

  barChart: any;
  barChart1: any;

  datasets: any = [];
  data: any = [];
  data1: any = [];
  data2: any = [];
  total: any = [];
  label = '';
  label1 = '';
  label2 = '';
  statuscompra = '';

  ano: number = new Date().getFullYear();

  grouprequisicaos: Grouprequisicao[];

  constructor(private requisicaosService: RequisicaoService) { }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {

  }


  async barChartMethod() {

    await this.requisicaosService.getRequisicaoGrafico(this.ano);
    //    console.log(this.requisicaosService.grouprequisicaos);

    this.grouprequisicaos = this.requisicaosService.grouprequisicaos;

    this.datasets = [];
    this.label = '';
    this.data = [0, 0, 0];
    this.total = [0, 0, 0];

    for (let i = 0; i < this.grouprequisicaos.length; i++) {
      if (this.grouprequisicaos[i].status == 'C') {
        this.data[0] = this.grouprequisicaos[i].quantidade;
      }
      if (this.grouprequisicaos[i].status == 'A') {
        this.data[1] = this.grouprequisicaos[i].quantidade;
      }
      if (this.grouprequisicaos[i].status == 'R') {
        this.data[2] = this.grouprequisicaos[i].quantidade;
      }
    }
    //   console.log("data = " + this.data);
    this.datasets.push({ label: this.label, data: this.data });
    //    this.datasets.push({ label: 'Média', data: this.total, type: 'line' });
    //      console.log(this.datasets);

    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Aguardando', 'Aprovado', 'Reprovado'],
        datasets: this.datasets
      },

      options: {
        plugins: {
          title: {
            display: true,
            text: `Ano : ${this.ano}`
          },
        },
        onClick: function (e) {
          //          debugger;
          var activePointLabel = this.getElementsAtEvent(e)[0]._model.label;
          console.log(activePointLabel);
        },
        responsive: true,
      }
    });
  }

  async gerar() {
    if (this.barChart) {
      this.barChart.clear();
      this.barChart.destroy();
    }

    if (this.barChart1) {
      this.barChart1.clear();
      this.barChart1.destroy();
    }

    await this.barChartMethod();
    await this.barChartMethod1();
  }



  async barChartMethod1() {

    await this.requisicaosService.getRequisicaoGrafico1(this.ano);
    //    console.log(this.requisicaosService.grouprequisicaos);

    this.grouprequisicaos = this.requisicaosService.grouprequisicaos;

    this.datasets = [];
    this.label1 = 'Aprovado';
    this.label = 'Aguardando';
    this.label2 = 'Reprovado';
    this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < this.grouprequisicaos.length; i++) {
      if (this.grouprequisicaos[i].status === 'A') {
        this.data1[(this.grouprequisicaos[i].mes - 1)] = this.grouprequisicaos[i].valor;
      }
      if (this.grouprequisicaos[i].status === 'C') {
        this.data[(this.grouprequisicaos[i].mes - 1)] = this.grouprequisicaos[i].valor;

      }
      if (this.grouprequisicaos[i].status === 'R') {
        this.data2[(this.grouprequisicaos[i].mes - 1)] = this.grouprequisicaos[i].valor;
      }
    }
    //   console.log("data = " + this.data);
    this.datasets.push({ label: this.label, data: this.data });
    this.datasets.push({ label: this.label1, data: this.data1 });
    this.datasets.push({ label: this.label2, data: this.data2 });
    //    this.datasets.push({ label: 'Média', data: this.total, type: 'line' });
          console.log(this.datasets);

    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart1 = new Chart(this.barCanvas1.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: this.datasets
      },

      options: {
        plugins: {
          title: {
            display: true,
//            text: `Ano : ${this.ano}`
          },
        },
        onClick: function (e) {
          //          debugger;
          var activePointLabel = this.getElementsAtEvent(e)[0]._model.label;
          console.log(activePointLabel);
        },
        responsive: true,
      }
    });
  }


}