import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarAdminService {

  menu: any [] = [
    //ADMINISTRADOR
    {titulo: 'Solicitudes', icon: 'fas fa-link nav-icon', url: 'solicitudes'},
    {titulo: 'Emprendedores', icon: 'fas fa-ring nav-icon', url: 'emprendedores'},
    {titulo: 'Clientes', icon: 'fas fa-gem nav-icon', url: 'clientes'}
  ]

  constructor() { }
}
