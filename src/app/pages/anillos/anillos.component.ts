import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Anillo } from 'src/app/models/anillo';
import { AnilloService } from 'src/app/services/anilloService.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-anillos',
  templateUrl: './anillos.component.html',
  styleUrls: ['./anillos.component.css']
})
export class AnillosComponent implements OnInit {

  user: any;
  anillos: Anillo[]
  anillo: any;
  urlImage: String = null;
  urlArchivo: String = null;
  foto: any = null;
  archivo: any = null;
  public page: number = 0;
  


  constructor(public anilloService: AnilloService, private authServ: AuthService) { }

  //  LISTA TODOS MIS REGISTROS
  async ngOnInit() {
    // this.anilloService.getCadenas()
    //   .snapshotChanges()
    //   .subscribe(item => {
    //     this.anillos = [];
    //     item.forEach(element => {
    //       let x = element.payload.toJSON();
    //       x['id'] = element.key;
    //       this.anillos.push(x);
    //     });
    //   });
    this.user = await this.authServ.getCurrentUser();

    this.anilloService.getAnillos(this.user.uid).on('value', (snapshot) =>{
      this.anillos = [];
      snapshot.forEach(item => {
        let x = item.toJSON();
        x['id'] = item.key;
        this.anillos.push(x);
      })
    });


  }

  //  CREA NUEVO REGISTRO
  onSubmit(formCadena: NgForm){

    this.anillo = new Anillo();
    this.anillo.nombre = formCadena.value.nombre;
    this.anillo.descripcion = formCadena.value.descripcion;
    this.anillo.precio = formCadena.value.precio;
    this.anillo.modAR = "undefine";
    this.anillo.foto = this.urlImage;
    this.anillo.usuario = this.user.uid;


    if (formCadena.value.id == null  && this.urlImage != null && this.urlArchivo != null) {   
      console.log("nuevo registro")
      // var id = this.anilloService.createAnillo(this.anillo);
      var modoAr = new Anillo();
      modoAr.usuario = this.user.uid;
      modoAr.modAR = this.urlArchivo;
      // this.anilloService.createModoAr(id, modoAr);
      this.onClearForm(formCadena);
      
    }

    if (formCadena.value.id != null && this.urlImage != null && this.urlArchivo != null) {      
      console.log("update con imagen")
      this.anilloService.updateAnillo(formCadena.value.id, this.anillo);
      this.onClearForm(formCadena);
    }
    
    if (formCadena.value.id != null && this.urlImage == null && this.urlArchivo == null) {
      this.anillo.foto = this.anilloService.anilloSelect.fotoUpdate;
      console.log("update sin imagen")
      this.anilloService.updateAnillo(formCadena.value.id, this.anillo);
      this.onClearForm(formCadena);
    }
  }

  //  LIMPIA EL FORMULARIO 
  onClearForm(formCadena?: NgForm){
    if (formCadena != null) {
      formCadena.reset();
      formCadena.resetForm();    
    }

    this.anilloService.anilloSelect = new Anillo();
    this.urlImage = null;
    this.urlArchivo = null;
    this.foto = null;   
  }

  //  EVENTO QUE CARGA IMAGEN Y OBTIENE URL 
  async fileEventImage(event){
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        const reader = new FileReader;
        reader.readAsDataURL(file);
        
        reader.onload = function load(){
          this.archivo = reader.result;
        }.bind(this);
        
        this.archivo = file;

        this.urlImage = await this.anilloService.uploadImage(this.archivo);
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

        this.urlArchivo = await this.anilloService.uploadFile(this.foto);
      } else {
        alert('Por favor ingrese un archivo de tipo ".rar"')
        this.anilloService.anilloSelect.wr = '';
      }
    }
  }

  //  EDITA UN REGISTRO
  onEdit(producto: any){
    this.anilloService.anilloSelect.id = producto.id;
    this.anilloService.anilloSelect.nombre = producto.nombre;
    this.anilloService.anilloSelect.descripcion = producto.descripcion;
    this.anilloService.anilloSelect.foto = "";
    this.anilloService.anilloSelect.precio = producto.precio;
    this.anilloService.anilloSelect.fotoUpdate = producto.foto;
    

    // console.log(this.anilloService.anilloSelect.fotoUpdate)
  }

  //  ELIMINA UN REGISTRO
  onDelete(id: any){
    this.anilloService.deleteAnillo(id);
  }

  //  PAGINACION
  nextPage(){
    this.page += 2;
  }

  prevPage(){
    if (this.page > 0)  this.page -= 2;
  }

}
