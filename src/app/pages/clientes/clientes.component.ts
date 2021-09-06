import { Component, OnInit } from '@angular/core';
import { EmprendedorService } from 'src/app/services/emprendedor.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente: any;
  public page: number = 0;

  constructor(public listUsersService: EmprendedorService) { }

  ngOnInit(): void {
    this.listUsersService.getClientes()
      .snapshotChanges()
      .subscribe(item => {
        this.cliente = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['id'] = element.key;
          this.cliente.push(x);
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
