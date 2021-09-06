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
      
      this.db.database.ref('emprendedor/' + this.loginId).set(
        {
          nombre: form.value.name,
          celular: form.value.mobile,
          correo: form.value.email,
          contrasenia: form.value.pass
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
    return this.db.database.ref('emprendedor/' + uid).get().then((value) => value.val().rol);
    
  }
}
