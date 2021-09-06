import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


import { Cadena } from '../models/cadena';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CadenaService {

  cadenaList: AngularFireList<any>;
  cadenaSelect: Cadena = new Cadena();
  

  constructor(public angularFireStorage: AngularFireStorage, public angularFireDataBase: AngularFireDatabase){}

  //  OBTIENE TODAS LAS CADENAS DE LA BASE DE DATOS 
  getCadenas(uid: any){
    this.cadenaList = this.angularFireDataBase.list('cadena');
    return this.angularFireDataBase.database.ref('cadena').orderByChild('usuario').equalTo(uid);
  }

  //  CREA UNA NUEVA CADENA EN LA BASE DE DATOS
  createCadena(cadena: any){
    return this.cadenaList.push(cadena).key;
  }

  // ACTUALIZA UNA CADENA EXISTENTE
  updateCadena(id: any, cadena: any){
    this.cadenaList.update(id, cadena);
  }

  //  ELIMINA UNA CADENA EXISTENTE
  deleteCadena(id: any){
    this.cadenaList.remove(id);
  }

  //  SUBE UNA IMAGEN Y DEVUELVE LA RUTA DE ACCESO PUBLICO
  uploadImage(file: any): Promise<String>{
    return new Promise(resolve => {
      const id = Math.random().toString(36).substr(2);
      const filePath = `cadena/${id}`;
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
      const filePath = `cadenaFile/${id}`;
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
