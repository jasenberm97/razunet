import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Anillo } from '../models/anillo';

@Injectable({
  providedIn: 'root'
})
export class AnilloService {

  anilloList: AngularFireList<any>;
  anilloSelect: Anillo = new Anillo()

  constructor(public angularFireStorage: AngularFireStorage, public angularFireDataBase: AngularFireDatabase){}

  //  OBTIENE TODAS LAS CADENAS DE LA BASE DE DATOS 
  getAnillos(uid: any){
    this.anilloList = this.angularFireDataBase.list('anillo');
    return this.angularFireDataBase.database.ref('anillo').orderByChild('usuario').equalTo(uid);
  }

  //  CREA UNA NUEVA CADENA EN LA BASE DE DATOS
  createAnillo(anillo: any){
    return this.anilloList.push(anillo).key;
  }

  // ACTUALIZA UNA CADENA EXISTENTE
  updateAnillo(id: any, anillo: any){
    this.anilloList.update(id, anillo);
  }

  //  ELIMINA UNA CADENA EXISTENTE
  deleteAnillo(id: any){
    this.anilloList.remove(id);
  }

  //  SUBE UNA IMAGEN Y DEVUELVE LA RUTA DE ACCESO PUBLICO
  async uploadImage(file: any): Promise<String>{
    return await new Promise(resolve => {
      const id = Math.random().toString(36).substr(2);
      const filePath = `anillo/${id}`;
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
      const filePath = `anilloFile/${id}`;
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
  createModoAr(id: any, anillo: any){
    
    return this.angularFireDataBase.database.ref('productoAr').child(id).set(anillo);
  }

  // ELIMINAR IMAGENES
  deleteImage(){
    
  }
}
