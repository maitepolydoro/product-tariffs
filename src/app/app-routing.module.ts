import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TariffsComponent } from './components/tariffs/tariffs.component';


const routes: Routes = [
  { path: '', component: TariffsComponent },
  { path: 'tarrifs', component: TariffsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
