import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './cadenas/cadenas.component';
// import { CategoriasComponent } from './categorias/categorias.component';
import { PulserasComponent } from './pulseras/pulseras.component';
import { AretesComponent } from './aretes/aretes.component';
import { AnillosComponent } from './anillos/anillos.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { EmprendedoresComponent } from './emprendedores/emprendedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ArticulosComponent } from './articulos/articulos.component';


const routes: Routes = [

  {path:'dashboard', component: PagesComponent,
  children:[
    // {path: '', pathMatch: 'prefix', component: DashboardComponent, data:{titulo:'Dashboard'}},
    {path: 'usuario', component: UsuariosComponent, data:{titulo:'Usuario'}},
    {path: 'cadenas', component: ProductosComponent, data:{titulo:'Cadenas',}},
    // {path: 'categorias', component: CategoriasComponent, data:{titulo:'Categorias',}},
    {path: 'pulseras', component: PulserasComponent, data:{titulo:'Pulseras',}},
    {path: 'aretes', component: AretesComponent, data:{titulo:'Aretes',}},
    {path: 'articulos', component: ArticulosComponent, data:{titulo:'Articulos',}},
    {path: 'anillos', component: AnillosComponent, data:{titulo:'Anillos',}},
    //ADMINISTRADOR
    {path: 'solicitudes', component: SolicitudesComponent, data:{titulo:'Solicitudes',}},
    {path: 'emprendedores', component: EmprendedoresComponent, data:{titulo:'Emprendedores',}},
    {path: 'clientes', component: ClientesComponent, data:{titulo:'Clientes',}},
  ]}
  
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
