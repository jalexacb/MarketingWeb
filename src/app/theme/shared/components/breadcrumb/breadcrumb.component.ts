import {Component, Input, OnInit} from '@angular/core';
import {NavigationItem} from '../../../layout/admin/navigation/navigation';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { MenuService } from 'src/app/core/services/menu.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() type: string;

  public navigation: any;
  breadcrumbList: Array<any> = [];
  public navigationList: Array<any> = [];

  constructor(
    private route: Router, 
    public nav: NavigationItem, 
    public menuService: MenuService,
    public loginService: LoginService,
    private titleService: Title
    ) {

      
      this.getMenus().then(
        res => {
          this.type = 'theme2';
          this.setBreadcrumb();
          let routerUrl: string;
          routerUrl = this.route.url;
          if (routerUrl && typeof routerUrl === 'string') {
            this.filterNavigation(routerUrl);
          }
        }
      )
      // this.navigation = this.nav.get();
      
  }

  ngOnInit() {
    
    
  }
  getMenus(){
    // return new Promise((resolve, reject) => {
    //   this.menuService.getAll().subscribe( res => {
    //     this.navigation = res;
    //     console.log(res);
    //   });
    // });
    // this.spinner.show();
    return new Promise((resolve, reject) => {
      let qs = "?usuario_id="+localStorage.getItem('usuario_id');
      
      this.menuService.getAllPermisos(qs).subscribe( (res:any) => {
        
        if(res.length > 0){
          this.navigation = res;
          resolve(true);
        }else{
          
          let usuario:any = this.loginService.getUsuarioIdentificado();
          let rol_id = usuario.rol_id;
          let qs = "?rol_id="+rol_id;
          this.menuService.getAllPermisos(qs).subscribe( res => {
            this.navigation = res;
            resolve(true);
          });
          
        }
        // console.log(res);
        // this.spinner.hide();
      });
    });
  }

  setBreadcrumb() {
    let routerUrl: string;
    this.route.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        const activeLink = router.url;
        this.filterNavigation(activeLink);
      }
    });
  }

  filterNavigation(activeLink) {
    let result = [];
    let title = 'Bienvenido';
    this.navigation.forEach((a) => {
      if (a.type === 'item' && 'url' in a && a.url === activeLink) {
        result = [
          {
            url: ('url' in a) ? a.url : false,
            title: a.title,
            breadcrumbs: ('breadcrumbs' in a) ? a.breadcrumbs : true,
            type: a.type,
            menu_id: a.id,
          }
        ];
        title = a.title;
      } else 
        if (a.type === 'group' && 'children' in a) {
          a.children.forEach((b) => {
            if (b.type === 'item' && 'url' in b && b.url === activeLink) {
              result = [
                {
                  url: ('url' in b) ? b.url : false,
                  title: b.title,
                  breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                  type: b.type,
                  menu_id: b.id,
                }
              ];
              title = b.title;
            } else {
              if (b.type === 'collapse' && 'children' in b) {
                b.children.forEach((c) => {
                  if (c.type === 'item' && 'url' in c && c.url === activeLink) {
                    result = [
                      {
                        url: ('url' in b) ? b.url : false,
                        title: b.title,
                        breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                        type: b.type,
                        menu_id: b.id,
                      },
                      {
                        url: ('url' in c) ? c.url : false,
                        title: c.title,
                        breadcrumbs: ('breadcrumbs' in c) ? c.breadcrumbs : true,
                        type: c.type,
                        menu_id: c.id,
                      }
                    ];
                    title = c.title;
                  } else {
                    if (c.type === 'collapse' && 'children' in c) {
                      c.children.forEach((d) => {
                        if (d.type === 'item' && 'url' in d && d.url === activeLink) {
                          result = [
                            {
                              url: ('url' in b) ? b.url : false,
                              title: b.title,
                              breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                              type: b.type,
                              menu_id: b.id,
                            },
                            {
                              url: ('url' in c) ? c.url : false,
                              title: c.title,
                              breadcrumbs: ('breadcrumbs' in c) ? c.breadcrumbs : true,
                              type: c.type,
                              menu_id: c.id,
                            },
                            {
                              url: ('url' in d) ? d.url : false,
                              title: d.title,
                              breadcrumbs: ('breadcrumbs' in c) ? d.breadcrumbs : true,
                              type: d.type,
                              menu_id: d.id,
                            }
                          ];
                          title = d.title;
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        
      }else {
        result = [
          {
            url: '',
            title: '',
            breadcrumbs: false,
            type: '',
            menu_id: '',
          }
        ];
      }
    });
    this.navigationList = result;
    // console.log(this.navigationList);
    this.titleService.setTitle(title + ' | NextCampañas');
    // console.log("menu_idbread",this.navigationList[this.navigationList.length-1].menu_id);
    if(this.navigationList[this.navigationList.length-1]){
      localStorage.setItem('menu_id',this.navigationList[this.navigationList.length-1].menu_id);
    }
    

  }

}
