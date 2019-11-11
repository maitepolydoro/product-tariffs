import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TariffsComponent } from './tariffs/tariffs.component';
import { AppRoutingModule } from '../app-routing.module';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidenavComponent,
    TariffsComponent
  ],
  exports: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CarouselModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    AppRoutingModule
  ]
})
export class ComponentsModule { }
