import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavContentComponent } from './navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavLeftComponent } from './nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './configuration/configuration.component';

import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AdminComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,


    BrowserModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    
    NgbDropdownModule,
    // NgbTooltipModule,
    // NgbButtonsModule,
    // NgbTabsetModule,
    // HttpClientModule,
    // FormsModule,
    NgxSpinnerModule,
  ]
})
export class AdminModule { }
