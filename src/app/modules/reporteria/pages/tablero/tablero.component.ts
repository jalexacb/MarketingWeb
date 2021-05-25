import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { CanalService } from 'src/app/core/services/canal.service';
import { InteresService } from 'src/app/core/services/interes.service';
import { ChartCircularComponent } from '../../components/chart-circular/chart-circular.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  @ViewChild('chartCanales', {static:true}) chartCanales: ChartCircularComponent;
  @ViewChild('chartIntereses', {static:true}) chartIntereses: ChartCircularComponent;
  public totales: any;
  
  public campania = {
    detalle: {

    },
    totales: [1,2,4
    ]
  };
  public totalCanales: number;
  public totalIntereses: number;
  public canalesUltimaCampania: Array<any>;
  public campanias: Array<any>;
  public mensajes = {
    totales: 1042,
    sms: "20%",
    whatsapp: "80%",
  };

  public ultimaCampania: any = new Object();

  public canalesTotales:Array<any>;
  public interesesTotales:Array<any>;
  public idChartCanal:string = "idChartCanales";
  public idChartInteres:string = "idChartIntereses";
  constructor(
    private campaniaService: CampaniaService,
    private canalService: CanalService,
    private interesService: InteresService,
    private spinner: NgxSpinnerService,
  ) { 
    
    this.totales = {
      campanias_ejecutadas: 0,
      campanias_programadas: 0,
      contactos: 0,
      mensajes_respondidos: 0,
      mensajes_rebotados: 0,
      mensajes_enviados: 0,
    }
    this.totalCanales = 0;
    this.totalIntereses = 0;
    
    
    
    
    this.canalesTotales = [];
    this.interesesTotales = [];
    this.canalesUltimaCampania = [];
    this.campanias = [];
    
  }

  ngOnInit() {
    this.spinner.show();
    let p1 = this.getTotales();
    let p2 = this.getUltimaCampania();
    let p3 = this.getCanalesPorcentaje();
    let p4 = this.getInteresesPorcentaje();
    let p5 = this.getCampanias();
    Promise.all([p1, p2,p3,p4,p5])
      .then(result => this.spinner.hide())
      .catch(error => this.spinner.hide());
  }

  getPorcentaje(dividendo:number = 0, divisor:number = 0) {
    let porcentaje = 0;
    if( divisor > 0){
      porcentaje = (dividendo / divisor)*100;
    }
    return Math.round(porcentaje * 100) / 100;;
  }

  getTotales(){
    return new Promise((resolve, reject)=>{
      this.campaniaService.getTotales().subscribe(
        res => {
          this.totales = res;
          resolve(true);
        }, err => {
          reject();
        }
      )
    });
    
  }

  getUltimaCampania(){
    return new Promise((resolve, reject)=>{
      this.campaniaService.getUltimaCampania().subscribe(
        res => {
          this.ultimaCampania = res['campania'];
          this.canalesUltimaCampania = res ['canales'];
          
          resolve(true);
        }, err => {
          reject();
        }
      )
    });
    
  }

  getCampanias(){
    return new Promise((resolve, reject)=>{
      this.campaniaService.getReporteSeguimiento().subscribe(
        (res:any) => {
          this.campanias = res;
          
          
          resolve(true);
        }, err => {
          reject();
        }
      )
    });
    
  }

  getCanalesPorcentaje(){
    return new Promise((resolve, reject)=>{
      this.canalService.getCanalesPorcentaje().subscribe(
        (res:any) => {
          this.canalesTotales = res['canales'];
          this.totalCanales = res['total'];
          this.chartCanales.updateDataChart(this.canalesTotales);
          
          
          resolve(true);
        }, err => {
          reject();
        }
      )
    });
    
  }

  getInteresesPorcentaje(){
    return new Promise((resolve, reject)=>{
      this.interesService.getInteresesPorcentaje().subscribe(
        (res:any) => {
          this.interesesTotales = res['intereses'];
          this.totalIntereses = res['total'];
          this.chartIntereses.updateDataChart(this.interesesTotales);
          
         
          resolve(true);
        }, err => {
          reject();
        }
      )
    });
    
  }

  getInteresesNombre(){
    let intereses = [];
    
  }

}
