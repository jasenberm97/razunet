import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Cadena } from '../models/cadena';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  cadenaList: AngularFireList<any>;
  cadenaSelect: Cadena = new Cadena();
  

  constructor(public angularFireStorage: AngularFireStorage, public angularFireDataBase: AngularFireDatabase){
    this.cadenaList = this.angularFireDataBase.list('productos');
    
  }
  
  //  OBTIENE TODAS LAS CADENAS DE LA BASE DE DATOS 
  getProductos(uid: any){
    console.log("usuaroi"+uid);
    return this.angularFireDataBase.database.ref('productos').orderByChild('idEmprendimiento').equalTo(uid);
  }

  //  CREA UNA NUEVA CADENA EN LA BASE DE DATOS
  createProducto(cadena: any){
    return this.cadenaList.push(cadena).key;
  }

  // ACTUALIZA UNA CADENA EXISTENTE
  updateProducto(id: any, cadena: any){
    this.cadenaList.update(id, cadena);
  }

  //  ELIMINA UNA CADENA EXISTENTE
  deleteProducto(id: any){
    this.cadenaList.remove(id);
  }

  //  SUBE UNA IMAGEN Y DEVUELVE LA RUTA DE ACCESO PUBLICO
  uploadImage(file: any): Promise<String>{
    return new Promise(resolve => {
      const id = Math.random().toString(36).substr(2);
      const filePath = `producto/${id}`;
      const ref = this.angularFireStorage.ref(filePath);
      const task = this.angularFireStorage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const urlDownload = res;
            resolve(urlDownload);
            return;
          })
        })
      ).subscribe();
    });
  }

  //  SUBE UNA ARCHIVO Y DEVUELVE LA RUTA DE ACCESO PUBLICO
  async uploadFile(file: any): Promise<String>{
    return await new Promise(resolve => {
      const id = Math.random().toString(36).substr(2);
      const filePath = `productoFile/${id}`;
      const ref = this.angularFireStorage.ref(filePath);
      const task = this.angularFireStorage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const urlDownload = res;
            resolve(urlDownload);
            return;
          })
        })
      ).subscribe();
    });
  }

  //  CREAR REFERENCIA DEL MODO AR
  createModoAr(id: any, cadena: any){    
    return this.angularFireDataBase.database.ref('productoAr').child(id).set(cadena);
  }


  // ELIMINAR IMAGENES
  deleteImage(){

  }
}
