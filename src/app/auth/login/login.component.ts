import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
  
  }

  async onLogin(user:string, pass:string){
    try {
      await this.auth.login(user, pass);
      this.route.navigate(['dashboard/usuario']);
    } catch (e: any) {
      alert("El usuario o contraseña ingresados son incorrectos")
    }
  }
}
