import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmprendedorService } from 'src/app/services/emprendedor.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public emprendedor: any;
  public user: any;

  constructor(private authServ: AuthService,
              private emprendedorServ: EmprendedorService) { }

  async ngOnInit() {
    
    this.user = await this.authServ.getCurrentUser();
    if (this.user) {
      var uid = this.user.uid;
      
      this.getEmprendedor(uid);
    }        
  }
  
  getEmprendedor(id: any){
    this.emprendedorServ.getEmprendedor(id)
      .on('value', (snapshot) => {
        this.emprendedor = {
          name: snapshot.val().nombre,
          email: snapshot.val().correo,
          mobile: snapshot.val().telefono,
          marca: snapshot.val().marca,
          rol: snapshot.val().rol
        };
      });
  }

}
