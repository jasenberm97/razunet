import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {

  emprendedorList: AngularFireList<any>;
  clienteList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {    
  }

  getEmprendedor(id: any){
    return this.db.database.ref('emprendimientos/' + id);

  }

  getEmprendedores(){
    return this.emprendedorList = this.db.list('emprendimientos');
    
  }

  getClientes(){
    return this.clienteList = this.db.list('Usuario');
  }

  deleteEmprendedor(id: any){
    this.emprendedorList.remove(id);
  }

  deleteCliente(id: any){
    this.clienteList.remove(id);
  }

}
