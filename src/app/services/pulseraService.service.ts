import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { Pulsera } from '../models/pulsera';

@Injectable({
  providedIn: 'root'
})
export class PulseraService {

  pulseraList: AngularFireList<any>;
  pulseraSelect: Pulsera = new Pulsera()
  

  constructor(public angularFireStorage: AngularFireStorage, public angularFireDataBase: AngularFireDatabase){

  }

  //  OBTIENE TODAS LAS CADENAS DE LA BASE DE DATOS 
  getPulseras(uid: any){
    this.pulseraList = this.angularFireDataBase.list('pulsera');
    return this.angularFireDataBase.database.ref('pulsera').orderByChild('usuario').equalTo(uid);
  }

  //  CREA UNA NUEVA CADENA EN LA BASE DE DATOS
  createPulsera(cadena: any){
    return this.pulseraList.push(cadena).key;
  }

  // ACTUALIZA UNA CADENA EXISTENTE
  updatePulsera(id: any, cadena: any){
    this.pulseraList.update(id, cadena);
  }

  //  ELIMINA UNA CADENA EXISTENTE
  deletePulsera(id: any){
    this.pulseraList.remove(id);
  }

  //  SUBE UNA IMAGEN Y DEVUELVE LA RUTA DE ACCESO PUBLICO
  uploadImage(file: any): Promise<String>{
    return new Promise(resolve => {
      const id = Math.random().toString(36).substr(2);
      const filePath = `pulsera/${id}`;
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
      const filePath = `pulseraFile/${id}`;
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
  createModoAr(id: any, pulsera: any){
    
    return this.angularFireDataBase.database.ref('productoAr').child(id).set(pulsera);
  }

  // ELIMINAR IMAGENES
  deleteImage(){

  }
}
