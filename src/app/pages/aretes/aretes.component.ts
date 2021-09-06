import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Arete } from 'src/app/models/arete';
import { AreteService } from 'src/app/services/areteService.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aretes',
  templateUrl: './aretes.component.html',
  styleUrls: ['./aretes.component.css']
})
export class AretesComponent implements OnInit {

  aretes: Arete[]
  arete: any;
  urlImage: String = null;
  user: any
  urlArchivo: String = null;
  archivo: any = null;
  foto: any = null;
  public page: number = 0;


  constructor(public areteService: AreteService, private authServ: AuthService) { }

  //  LISTA TODOS MIS REGISTROS
  async ngOnInit() {
    // this.areteService.getCadenas()
    //   .snapshotChanges()
    //   .subscribe(item => {
    //     this.aretes = [];
    //     item.forEach(element => {
    //       let x = element.payload.toJSON();
    //       x['id'] = element.key;
    //       this.aretes.push(x);
    //     });
    //   });

    this.user = await this.authServ.getCurrentUser();

    this.areteService.getAretes(this.user.uid).on('value', (snapshot) =>{
      this.aretes = [];
      snapshot.forEach(item => {
        let x = item.toJSON();
        x['id'] = item.key;
        this.aretes.push(x);
      })
    });

  }

  //  CREA NUEVO REGISTRO
  onSubmit(formArete: NgForm){

    this.arete = new Arete();
    this.arete.nombre = formArete.value.nombre;
    this.arete.descripcion = formArete.value.descripcion;
    this.arete.precio = formArete.value.precio;
    this.arete.modAR = "undefine";
    this.arete.foto = this.urlImage;
    this.arete.usuario = this.user.uid;

    if (formArete.value.id == null && this.urlImage != null && this.urlArchivo != null) {   
      console.log("nuevo registro")
      var id = this.areteService.createArete(this.arete);
      var modoAr = new Arete();
      modoAr.usuario = this.user.uid;
      modoAr.modAR = this.urlArchivo;
      this.areteService.createModoAr(id, modoAr);
      this.onClearForm(formArete);
      
    }

    if (formArete.value.id != null && this.urlImage != null && this.urlArchivo != null) {      
      console.log("update con imagen")
      this.areteService.updateArete(formArete.value.id, this.arete);
      this.onClearForm(formArete);
    }
    
    if (formArete.value.id != null && this.urlImage == null && this.urlArchivo == null) {
      this.arete.foto = this.areteService.areteSelect.fotoUpdate;
      console.log("update sin imagen")
      this.areteService.updateArete(formArete.value.id, this.arete);
      this.onClearForm(formArete);
    }
  }

  //  LIMPIA EL FORMULARIO 
  onClearForm(formArete?: NgForm){
    if (formArete != null) {
      formArete.reset();
      formArete.resetForm();    
    }

    this.areteService.areteSelect = new Arete();
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

        this.urlImage = await this.areteService.uploadImage(this.foto);
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

        this.urlArchivo = await this.areteService.uploadFile(this.foto);
      } else {
        alert('Por favor ingrese un archivo de tipo ".rar"')
        this.areteService.areteSelect.wr = '';
      }
    }
  }

  //  EDITA UN REGISTRO
  onEdit(producto: any){
    this.areteService.areteSelect.id = producto.id;
    this.areteService.areteSelect.nombre = producto.nombre;
    this.areteService.areteSelect.descripcion = producto.descripcion;
    this.areteService.areteSelect.foto = "";
    this.areteService.areteSelect.precio = producto.precio;
    this.areteService.areteSelect.fotoUpdate = producto.foto;

    console.log(this.areteService.areteSelect.fotoUpdate)
  }

  //  ELIMINA UN REGISTRO
  onDelete(id: any){
    this.areteService.deleteArete(id);
  }

  //  PAGINACION
  nextPage(){
    this.page += 2;
  }

  prevPage(){
    if (this.page > 0)  this.page -= 2;
  }

}
