import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  solicitudList: AngularFireList<any>;
  solicitudSelect: Solicitud = new Solicitud();

  constructor(public angularFireStorage: AngularFireStorage, public angularFireDataBase: AngularFireDatabase) { }

  //  OBTENER PRODUCTOS DE SOLICITUD
  getSolicitudes(){
    this.solicitudList = this.angularFireDataBase.list('productoAr');
    return this.angularFireDataBase.database.ref('productoAr');
  }

  getCadena(id: any){
    return this.angularFireDataBase.database.ref('cadena').child(id).get();
  }

  getPulsera(id: any){
    return this.angularFireDataBase.database.ref('pulsera').child(id).get();
  }

  getAnillo(id: any){
    return this.angularFireDataBase.database.ref('anillo').child(id).get();
  }

  getArete(id: any){
    return this.angularFireDataBase.database.ref('arete').child(id).get();
  }

  // RESUELVE LA SOLICITUD
  updateProducto(id: any, articulo: any, solicitud: any){
    this.angularFireDataBase.database.ref(''+articulo).child(id).update(solicitud);
  }

  // ELIMINA LA SOLICITUD RESULETA
  deleteSolicitud(id: any){
    this.solicitudList.remove(id);
  }

  //  SUBE UNA IMAGEN Y DEVUELVE LA RUTA DE ACCESO PUBLICO
  async uploadImage(file: any): Promise<String>{
    return await new Promise(resolve => {
      const id = Math.random().toString(36).substr(2);
      const filePath = `ProductoAr/${id}`;
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

}
