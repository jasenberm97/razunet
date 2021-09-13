import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [
    // {titulo: 'Tablero', icon:'nav-icon fas fa-tachometer-alt', url: '/dashboard'},
    {titulo: 'Usuario', icon: 'fa fa-user nav-icon', url: 'usuario'},
    // {titulo: 'Cadenas', icon: 'fas fa-link nav-icon', url: 'cadenas'},
    // {titulo: 'Pulseras', icon: 'fas fa-link nav-icon', url: 'pulseras'},
    // {titulo: 'Anillos', icon: 'fas fa-ring nav-icon', url: 'anillos'},
    {titulo: 'Articulos', icon: 'fas fa-ring nav-icon', url: 'articulos'},
    // {titulo: 'Aretes', icon: 'fas fa-gem nav-icon', url: 'aretes'}
    
  ];
  

  constructor() { }
}
