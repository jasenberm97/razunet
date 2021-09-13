import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginId: any;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) { }

  login(user: string, pass: string){
    return this.auth.signInWithEmailAndPassword(user, pass).then((userCredential)=>{
      this.loginId = userCredential.user.uid;
    });

  }

  register(form: any){
    return this.auth.createUserWithEmailAndPassword(form.value.email, form.value.pass)
    .then((userCredential)=>{
      this.loginId = userCredential.user.uid;
      
      this.db.database.ref('emprendimientos/' + this.loginId).set(
        {
          contrasenia: form.value.pass,
          correo: form.value.email,
          foto: "https://firebasestorage.googleapis.com/v0/b/razunetfashionug.appspot.com/o/emprendimientos%2F3.jpeg?alt=media&token=1ebb8d74-7f73-4681-8f2f-c83214508d49",
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
}
