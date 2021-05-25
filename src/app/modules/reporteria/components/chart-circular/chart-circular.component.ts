import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
@Component({
  selector: 'app-chart-circular',
  templateUrl: './chart-circular.component.html',
  styleUrls: ['./chart-circular.component.scss']
})
export class ChartCircularComponent implements OnInit {
  @Input() id: string;
  @Input() datos: Array<any>;

  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: Chart.ChartType = 'doughnut';
  public chartColors: any[] = [{ backgroundColor: ["#11c15b", "#ff5252", "#4680ff", "#ffa21d", "#00ACC1"] }];
  public data: Array<number>;
  public labels: Array<string>;
  public myChart:Chart;
  
  public  options= {
    legend: {
        display: false,
        position: "top",
        fullWidth: true,
        labels: {
          boxWidth: 5,
          fontSize: 14
        }
      },
      tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
              footer: function (tooltipItem, data) {
                  let total = 0;
                  return 15 + " %   ";
              }
          }
      }
  };

  @ViewChild('myCanvas', {static:true}) canvasRef: ElementRef;
  public datasets: Array<any>;
  constructor() { 
    
    this.data = [0,0];
    this.labels = [];
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
  }

  updateDataChart(datos) {
    this.data = [];
    datos.forEach(e => {
      this.data.push(e.cantidad);  
     
      this.labels.push(e.nombre);
    });
  }

  drawChart(data, labels) {
    var ctx = this.canvasRef.nativeElement;
    
    this.myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          datasets: [{
              data: [1,2,3],
          }],
          labels: labels,
      },
      options: {
        legend: {
          display: true,
          position: "top",
          fullWidth: true,
          labels: {
            boxWidth: 15,
            fontSize: 14
          }
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            footer: function (tooltipItem, data) {
                let total = 0;
                data.datasets[0].data.forEach(value => total += parseFloat(value));
                return (15) + " %   ";
            }
          }
        }
      }
    });
  }

  

}
