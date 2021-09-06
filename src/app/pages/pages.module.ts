import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductosComponent } from './cadenas/cadenas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';
// import { CategoriasComponent } from './categorias/categorias.component';
import { PulserasComponent  } from './pulseras/pulseras.component';
import { FiltroPipe } from './cadenas/filtro.pipe';
import { AnillosComponent } from './anillos/anillos.component';
import { AretesComponent } from './aretes/aretes.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { EmprendedoresComponent } from './emprendedores/emprendedores.component';
import { ClientesComponent } from './clientes/clientes.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    PagesComponent,
    // CategoriasComponent,
    PulserasComponent,
    FiltroPipe,
    AretesComponent,
    AnillosComponent,
    SolicitudesComponent,
    EmprendedoresComponent,
    ClientesComponent
  ],

  exports:[
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PagesModule { }
