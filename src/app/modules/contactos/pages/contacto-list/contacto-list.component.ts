import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
// import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

import Swal from 'sweetalert2'
import { ContactoAddModalComponent } from '../../modals/contacto-add-modal/contacto-add-modal.component';
import { ContactoEditModalComponent } from '../../modals/contacto-edit-modal/contacto-edit-modal.component';
@Component({
  selector: 'app-contacto-list',
  templateUrl: './contacto-list.component.html',
  styleUrls: ['./contacto-list.component.scss']
})
export class ContactoListComponent implements OnInit {
  public contactos: Array<Contacto>;
  // sortedData: Contacto[];
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  public permiso: Permiso;
  separateDialCode = false;
	// SearchCountryField = SearchCountryField;
	// TooltipLabel = TooltipLabel;
	// CountryISO = CountryISO;
	// preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	
  constructor(
    private contactoService: ContactoService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
    // private paginatorp: MatPaginatorIntl
  ) { 
    this.contactos = [];
    this.permiso = new Permiso();
    this.busqueda = "";
    // this.paginatorp.itemsPerPageLabel = ""
    this.advancePage = 1;
    this.per_page = 5;
  }

  // changePreferredCountries() {
	// 	this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	// }

  ngOnInit() {
    this.spinner.show();
    let p1 = this.getContactos();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide())
      .catch(error => this.spinner.hide());
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show();
      this.getContactos().then(
        res => this.spinner.hide(),
        err => this.spinner.hide(),
      );
    }
  }

  onSearch(event:any = null){
    let qs = "";
    if(this.busqueda != ''){
      console.log("bus",this.busqueda);
      this.spinner.show();
      qs += `&busqueda=${this.busqueda}`;
      
    }
    if (event != null) {
      qs += `&page=${event}`;
    }

    this.getContactos(qs).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    );
  }

  getContactos(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.contactoService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          console.log(res);
          this.contactos = res.data;
          this.collectionSize = res.total;
          console.log(this.collectionSize);
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
      title: '¿Está seguro de activar este canal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.contactoService.delete(canal.id).subscribe(
          (res: Array<any>) => {
            canal.status = 'A';
            this.spinner.hide();
            Swal.fire(
              '¡Activado!',
              'El canal ha sido activado',
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
        console.log("permiso",res);
      }, 
      err => {

      }
    )
  }

  onChangePage(event){
    this.spinner.show();
    this.getContactos(event).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    )
  }

  onDelete(contacto: Contacto) {
    Swal.fire({
      title: '¿Está seguro de eliminar este contacto?',
      text: "¡No podrá revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.contactoService.delete(contacto.id).subscribe(
          (res: Array<any>) => {
            contacto.status = 'I';
            this.spinner.hide();
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
    // modalRef.dismiss.then(
    //   res => this.onSearch(),
    // );
  }

  onEdit(contacto: Contacto){
    const modalRef = this.modalService.open(ContactoEditModalComponent, { size: 'lg' });
    modalRef.componentInstance.contacto = contacto;
    modalRef.result.then(
      res => this.onSearch(),
    );

    // modalRef.componentInstance.sendRespuesta.subscribe(result => {
    //   console.log(result);
    //   if(result) {

    //   }
    // });
    

  }
}
