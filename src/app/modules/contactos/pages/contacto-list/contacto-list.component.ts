import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import { Permiso } from 'src/app/theme/shared/models/Permiso';


import Swal from 'sweetalert2'
import { ContactoAddModalComponent } from '../../modals/contacto-add-modal/contacto-add-modal.component';
import { ContactoEditModalComponent } from '../../modals/contacto-edit-modal/contacto-edit-modal.component';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-contacto-list',
  templateUrl: './contacto-list.component.html',
  styleUrls: ['./contacto-list.component.scss']
})
export class ContactoListComponent implements OnInit {
  public contactos: Array<Contacto>;
  
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  public permiso: Permiso;
  separateDialCode = false;
  public contactos_xml: Array<Contacto>;
  data: any = [];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

  wopts: XLSX.WritingOptions = { bookType: "xlsx", type: "array" };
  fileName: string = "SheetJS.xlsx";
	spinner1 = 'sp_page';
  constructor(
    private contactoService: ContactoService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
    
  ) { 
    this.contactos = [];
    this.permiso = new Permiso();
    this.busqueda = "";
    
    this.advancePage = 1;
    this.per_page = 5;
    this.contactos_xml = [];
  }
  
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error("Cannot use multiple files");
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.data.forEach(element => {
        let contacto = new Contacto();
        contacto.nombres = element[0];
        contacto.celular = element[1];
        this.contactos_xml.push(contacto);
      });
      
    };
    reader.readAsBinaryString(target.files[0]);
  }

  ngOnInit() {
    this.spinner.show(this.spinner1);
    let p1 = this.getContactos();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide(this.spinner1))
      .catch(error => this.spinner.hide(this.spinner1));
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show(this.spinner1);
      this.getContactos().then(
        res => this.spinner.hide(this.spinner1),
        err => this.spinner.hide(this.spinner1),
      );
    }
  }

  onSearch(event:any = null){
    let qs = "";
    this.spinner.show(this.spinner1);
    if(this.busqueda != ''){
      
      
      qs += `&busqueda=${this.busqueda}`;
      
    }
    if (event != null) {
      qs += `&page=${event}`;
    }

    this.getContactos(qs).then(
      res => this.spinner.hide(this.spinner1),
      err => this.spinner.hide(this.spinner1),
    );
  }

  getContactos(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.contactoService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          
          this.contactos = res.data;
          this.collectionSize = res.total;
          
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  onActivar(canal){
    Swal.fire({
      title: '¿Está seguro de activar este contacto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.contactoService.delete(canal.id).subscribe(
          (res: Array<any>) => {
            canal.status = 'A';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Activado!',
              'El contacto ha sido activado',
              'success'
            )
            
          }
          ,err => {
    
          }
        );
       
      }
    });
  }

  getPermiso(){
    let usuario:any = this.loginService.getUsuarioIdentificado();
    let rol_id = usuario.rol_id;
    let qs = "?usuario_id="+localStorage.getItem('usuario_id')+"&menu_id="+localStorage.getItem('menu_id')+"&rol_id="+rol_id;
    this.permisoService.getPermisoByFilter(qs).subscribe(
      (res:Permiso) => {
        this.permiso = res;
        
      }, 
      err => {

      }
    )
  }

  onChangePage(event){
    
    this.onSearch(event);
  }

  onDelete(contacto: Contacto) {
    Swal.fire({
      title: '¿Está seguro de eliminar este contacto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.contactoService.delete(contacto.id).subscribe(
          (res: Array<any>) => {
            contacto.status = 'I';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Eliminado!',
              'El contacto ha sido eliminado',
              'success'
            )
            
          }
          ,err => {
    
          }
        );
       
      }
    });
   
  }

  onCreate(){
    const modalRef = this.modalService.open(ContactoAddModalComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(
      res => this.onSearch(),
    );
  }

  onEdit(contacto: Contacto){
    const modalRef = this.modalService.open(ContactoEditModalComponent, { size: 'lg' });
    modalRef.componentInstance.contacto = contacto;
    modalRef.result.then(
      res => this.onSearch(),
    );
  }
}
