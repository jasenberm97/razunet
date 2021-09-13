import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cadena } from 'src/app/models/cadena';
import { AuthService } from 'src/app/services/auth.service';

import { CadenaService } from 'src/app/services/cadenaService.service';

@Component({
  selector: 'app-cadenas',
  templateUrl: './cadenas.component.html',
  styleUrls: ['./cadenas.component.css']
})
export class ProductosComponent implements OnInit {

  public cadenas: Cadena[];
  public page: number = 0;
  cadena: any;
  user: any
  urlArchivo: String = null;
  archivo: any = null;
  foto: any = null;
  urlImage: String = null;

  constructor(public cadenaService: CadenaService, private authServ: AuthService) { }

  //  LISTA TODOS MIS REGISTROS
  async ngOnInit() {
    // this.cadenaService.getCadenas()
    //   .snapshotChanges()
    //   .subscribe(item => {
    //     this.cadenas = [];
    //     item.forEach(element => {
    //       let x = element.payload.toJSON();
    //       x['id'] = element.key;
    //       this.cadenas.push(x);
    //     });
    //   });

    this.user = await this.authServ.getCurrentUser();

    // this.cadenaService.getCadenas(this.user.uid).on('value', (snapshot) =>{
    //   this.cadenas = [];
    //   snapshot.forEach(item => {
    //     let x = item.toJSON();
    //     x['id'] = item.key;
    //     this.cadenas.push(x);
    //   })
    // });

  }

  onSave(): void{
    
  }

  //  CREA NUEVO REGISTRO
   onSubmit(formCadena: NgForm){

     this.cadena = new Cadena();
     this.cadena.nombre = formCadena.value.nombre;
     this.cadena.descripcion = formCadena.value.descripcion;
     this.cadena.precio = formCadena.value.precio;
     this.cadena.modAR = "undefine";
     this.cadena.foto = this.urlImage;
     this.cadena.usuario = this.user.uid;

    if (formCadena.value.id == null && this.urlImage != null) {   
      console.log("nuevo registro")
      // var id = this.cadenaService.createCadena(this.cadena);
      var modoAr = new Cadena();
      modoAr.usuario = this.user.uid;
      modoAr.modAR = this.urlArchivo;
      // this.cadenaService.createModoAr(id, modoAr);
      this.onClearForm(formCadena);
      
    }

    if (formCadena.value.id != null && this.urlImage != null) {      
      console.log("update con imagen")
      this.cadenaService.updateCadena(formCadena.value.id, this.cadena);
      this.onClearForm(formCadena);
    }
    
    if (formCadena.value.id != null && this.urlImage == null) {
      this.cadena.foto = this.cadenaService.cadenaSelect.fotoUpdate;
      console.log("update sin imagen")
      this.cadenaService.updateCadena(formCadena.value.id, this.cadena);
      this.onClearForm(formCadena);
    }
    
  }

  //  LIMPIA EL FORMULARIO 
  onClearForm(formCadena?: NgForm){
    if (formCadena != null) {
      formCadena.reset();
      formCadena.resetForm();    
    }

    this.cadenaService.cadenaSelect = new Cadena();
    this.urlImage = null;
    this.urlArchivo = null;
    this.foto = null;   
  }

  //  EVENTO QUE CARGA IMAGEN Y OBTIENE URL 
  async fileEvent(event){
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        const reader = new FileReader;
        reader.readAsDataURL(file);
        
        reader.onload = function load(){
          this.foto = reader.result;
        }.bind(this);
        
        this.foto = file;

        this.urlImage = await this.cadenaService.uploadImage(this.foto);
      }else{
        console.log("a ocurrido un error");
      }
    }
  }

  // EVENTO QUE CARGA ARCHIVO COMPRIMIDO Y OBTIENE URL
  async fileEventWr(event){
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.name.split('.')[1] === 'rar') {
        const reader = new FileReader;
        reader.readAsDataURL(file);
        
        reader.onload = function load(){
          this.foto = reader.result;
        }.bind(this);
        
        this.foto = file;

        this.urlArchivo = await this.cadenaService.uploadFile(this.foto);
      } else {
        alert('Por favor ingrese un archivo de tipo ".rar"')
        this.cadenaService.cadenaSelect.wr = '';
      }
    }
  }

  //  EDITA UN REGISTRO
  onEdit(producto: any){
    this.cadenaService.cadenaSelect.id = producto.id;
    this.cadenaService.cadenaSelect.nombre = producto.nombre;
    this.cadenaService.cadenaSelect.descripcion = producto.descripcion;
    this.cadenaService.cadenaSelect.foto = "";
    this.cadenaService.cadenaSelect.precio = producto.precio;
    this.cadenaService.cadenaSelect.fotoUpdate = producto.foto;

    console.log(this.cadenaService.cadenaSelect.fotoUpdate)
  }

  //  ELIMINA UN REGISTRO
  onDelete(id: any){
    this.cadenaService.deleteCadena(id);
  }

  //  PAGINACION
  nextPage(){
    this.page += 2;
  }

  prevPage(){
    if (this.page > 0)  this.page -= 2;
  }

}