import { Component, OnInit } from '@angular/core';
import { EmprendedorService } from 'src/app/services/emprendedor.service';

@Component({
  selector: 'app-emprendedores',
  templateUrl: './emprendedores.component.html',
  styleUrls: ['./emprendedores.component.css']
})
export class EmprendedoresComponent implements OnInit {

  emprendedores: any;
  public page: number = 0;

  constructor(public listUsersService: EmprendedorService) { }

  ngOnInit(): void {
    this.listUsersService.getEmprendedores()
      .snapshotChanges()
      .subscribe(item => {
        this.emprendedores = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['id'] = element.key;
          this.emprendedores.push(x);
          
        });
      });
      
  }

  onDelete(id: any){
    this.listUsersService.deleteEmprendedor(id);
  }

  //  PAGINACION
  nextPage(){
    this.page += 2;
  }

  prevPage(){
    if (this.page > 0)  this.page -= 2;
  }

}
