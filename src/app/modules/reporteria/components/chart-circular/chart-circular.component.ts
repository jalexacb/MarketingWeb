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
  // public doughnutChartType: Chart.ChartType = 'doughnut';
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
                  // data.datasets[0].data.forEach(value => total += parseFloat(value));
                  // let porcent = (parseFloat(data.datasets[0].data[tooltipItem[0].index]) / total) * 100;
                  // let totalValor = data.modo=='monedas'?("$ " + number(data.datasets[0].data[tooltipItem[0].index]).format('0,0.00')): (numeral(data.datasets[0].data[tooltipItem[0].index]).format('0,0')+ " uds" );
                  return 15 + " %   ";
              }
          }
      }
  };
  @ViewChild('myCanvas', {static:true}) canvasRef: ElementRef;
  public datasets: Array<any>;
  constructor() { 
    // this.id = "chartId"
    this.data = [0,0];
    this.labels = [];
  }

 ngOnInit() {
      // this.title = this.order=='ASC'?'menos':'más';
      // this.id = this.order=='ASC'?'cvsProductosMenosVendidos':'cvsProductosMasVendidos';
      this.initChart();
  }

  initChart() {
    // this.periodo = periodo ? periodo : this.periodo;

    // this.loading = true;
    // this.data = [1,2];
    // this.labels = ['sms','whatsapp'];
    // this.drawChart(data, labels);
    // this.getData().then(
    //     res => {
    //         let data = [];
    //         let labels = [];

    //         this.drawChart(data, labels);
    //         this.loading = false;
    //     },
    //     err => {
    //         this.loading = false;
    //     }
    // );
  }

  updateDataChart(datos) {
    console.log("info",datos);
    this.data = [];
    datos.forEach(e => {
      this.data.push(e.cantidad);  
     
      this.labels.push(e.nombre);
    });
    console.log("info",this.data);
    // this.data = data;
    // this.myChart.data.datasets[0].data = this.data;
    // this.myChart.data.labels = this.labels;
    // // this.myChart.data.modo = this.modo;
    // this.myChart.update();

       
  }

  drawChart(data, labels) {
        // Chart.defaults.global.legend.labels.usePointStyle = true;
        // Chart.defaults.global.legend.display = false;
        console.log(this.id);
        
        var ctx = this.canvasRef.nativeElement;
        console.log(ctx);
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
                          // let porcent = (parseFloat(data.datasets[0].data[tooltipItem[0].index]) / total) * 100;
                          // let totalValor = data.modo=='monedas'?("$ " + number(data.datasets[0].data[tooltipItem[0].index]).format('0,0.00')): (numeral(data.datasets[0].data[tooltipItem[0].index]).format('0,0')+ " uds" );
                          return (15) + " %   ";
                      }
                  }
              }
          }
      });
      console.log(this.myChart);
    //   console.log(this.myChart);
    }

  

}
