import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Arete } from '../models/arete';

@Injectable({
  providedIn: 'root'
})
export class AreteService {

  areteList: AngularFireList<any>;
  areteSelect: Arete = new Arete()

  constructor(public angularFireStorage: AngularFireStorage, public angularFireDataBase: AngularFireDatabase){
    this.areteList = this.angularFireDataBase.list('arete');
    
  }
  
  //  OBTIENE TODAS LAS CADENAS DE LA BASE DE DATOS 
  getAretes(uid: any){
    return this.angularFireDataBase.database.ref('arete').orderByChild('usuario').equalTo(uid);
  }

  //  CREA UNA NUEVA CADENA EN LA BASE DE DATOS
  // createArete(arete: any){
  //   return this.areteList.push(arete).key;
  // }

  createArete(id: any, arete: any){    
      return this.angularFireDataBase.database.ref('arete').child(id).set(arete);
    }

  // ACTUALIZA UNA CADENA EXISTENTE
  updateArete(id: any, arete: any){
    this.areteList.update(id, arete);
  }

  //  ELIMINA UNA CADENA EXISTENTE
  deleteArete(id: any){
    this.areteList.remove(id);
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
  createModoAr(id: any, arete: any){    
    return this.angularFireDataBase.database.ref('productoAr').child(id).set(arete);
  }

  // ELIMINAR IMAGENES
  deleteImage(){

  }
}
