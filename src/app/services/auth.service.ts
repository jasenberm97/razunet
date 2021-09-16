import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginId: any;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, public angularFireStorage: AngularFireStorage) { }

  login(user: string, pass: string){
    return this.auth.signInWithEmailAndPassword(user, pass).then((userCredential)=>{
      this.loginId = userCredential.user.uid;
    });

  }

  register(form: any, url: any){
    return this.auth.createUserWithEmailAndPassword(form.value.email, form.value.pass)
    .then((userCredential)=>{
      this.loginId = userCredential.user.uid;
      
      this.db.database.ref('emprendimientos/' + this.loginId).set(
        {
          contrasenia: form.value.pass,
          correo: form.value.email,
          foto: url,
          marca: form.value.marca,
          nombre: form.value.name,
          telefono: form.value.mobile,          
        }
      )
    });
  }

  logout(){
    return this.auth.signOut();
  }

  getCurrentUser(){
    return this.auth.authState.pipe(first()).toPromise();
  }

  async currentUserId(){
    var uid = await this.auth.authState.pipe(first()).toPromise().then((value)=>value.uid);
    return this.db.database.ref('emprendimientos/' + uid).get().then((value) => value.val().rol);
    
  }

   //  SUBE UNA ARCHIVO Y DEVUELVE LA RUTA DE ACCESO PUBLICO
   async uploadFile(file: any): Promise<String>{
    return await new Promise(resolve => {
      const id = Math.random().toString(36).substr(2);
      const filePath = `EmprendimientoFace/${id}`;
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
