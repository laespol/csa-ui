import { getLocaleDayNames } from "@angular/common";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Chart, registerables } from 'chart.js'; import { Grouphoras } from "src/app/interfaces/groupHoras";
import { HoraService } from "src/app/services/hora.service";
Chart.register(...registerables);

@Component({
  selector: 'app-graficohora',
  templateUrl: './graficohora.page.html',
  styleUrls: ['./graficohora.page.scss'],
})

export class GraficohoraPage implements AfterViewInit {

  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;

  datasets: any = [];
  data: any = [];
  total: any = [];
  label = '';
  idunidade = 0;

  ano: number = new Date().getFullYear();

  grouphoras: Grouphoras[];

  constructor(private horasService: HoraService) { }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {

  }

  async barChartMethod() {

    await this.horasService.getHoraGrafico(this.ano);
//    console.log(this.horasService.grouphoras);

    this.grouphoras = this.horasService.grouphoras;

    this.datasets = [];
    this.label ='';
    this.data = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.total = [0,0,0,0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < this.grouphoras.length; i++) {
      console.log("mes = " + this.total[this.grouphoras[i].mes])
      if (this.idunidade === 0) {
        this.idunidade = this.grouphoras[i].idunidade;
        this.data[(this.grouphoras[i].mes -1)] = this.grouphoras[i].qthoras;
//        this.total[this.grouphoras[i].mes] = this.total[this.grouphoras[i].mes] + this.grouphoras[i].qthoras;
        this.label = this.grouphoras[i].unidade;
      } else {
        if (this.idunidade === this.grouphoras[i].idunidade) {
          this.data[(this.grouphoras[i].mes -1)] = this.grouphoras[i].qthoras;
//          this.total[this.grouphoras[i].mes] = this.total[this.grouphoras[i].mes] + this.grouphoras[i].qthoras;
        } else {
          this.datasets.push({ label: this.label, data: this.data });
          this.data = [0,0,0,0,0,0,0,0,0,0,0,0];
          this.idunidade = this.grouphoras[i].idunidade;
          this.label = this.grouphoras[i].unidade;
          this.data[(this.grouphoras[i].mes -1)] = this.grouphoras[i].qthoras;
//          this.total[this.grouphoras[i].mes] = this.total[this.grouphoras[i].mes] + this.grouphoras[i].qthoras;
        }
      }
    }
    this.datasets.push({ label: this.label, data: this.data });
//    this.datasets.push({ label: 'Média', data: this.total, type: 'line' });
    console.log(this.datasets);

    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        //        datasets: datasets,
        datasets: this.datasets
      },

      options: {
        plugins: {
          title: {
            display: true,
            text: `Ano : ${this.ano}`
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }

  async gerar() {
    if (this.barChart) {
      this.barChart.clear();
      this.barChart.destroy();
    }

    this.barChartMethod();
  }


}