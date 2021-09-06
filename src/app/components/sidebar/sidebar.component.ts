import { Component, OnInit } from '@angular/core';


import { AuthService } from 'src/app/services/auth.service';
import { EmprendedorService } from 'src/app/services/emprendedor.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SidebarAdminService } from 'src/app/services/sidebarAdmin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuItemsAdmin: any[];
  user: any;
  emprendedor: any;
  admin: any;

  constructor(private sidebarService: SidebarService,
              private sidebarAdminService: SidebarAdminService,
              private authServ: AuthService,
              private emprendedorServ: EmprendedorService) { 
    this.menuItems = sidebarService.menu;
    this.menuItemsAdmin = sidebarAdminService.menu;
  }

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
        this.emprendedor = snapshot.val().nombre;
        this.admin = snapshot.val().rol;
      });
  }

}
