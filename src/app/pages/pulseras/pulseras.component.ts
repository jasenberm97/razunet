import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pulsera } from 'src/app/models/pulsera';
import { AuthService } from 'src/app/services/auth.service';
import { PulseraService } from 'src/app/services/pulseraService.service';

@Component({
  selector: 'app-pulseras',
  templateUrl: './pulseras.component.html',
  styleUrls: ['./pulseras.component.css']
})
export class PulserasComponent implements OnInit {

  pulseras: Pulsera[]
  pulsera: any;
  urlImage: String = null;
  foto: any = null;
  user: any
  urlArchivo: String = null;
  archivo: any = null;
  public page: number = 0;


  constructor(public pulseraService: PulseraService, private authServ: AuthService) { }

  //  LISTA TODOS MIS REGISTROS
  async ngOnInit() {
    // this.pulseraService.getCadenas()
    //   .snapshotChanges()
    //   .subscribe(item => {
    //     this.pulseras = [];
    //     item.forEach(element => {
    //       let x = element.payload.toJSON();
    //       x['id'] = element.key;
    //       this.pulseras.push(x);
    //     });
    //   });

    this.user = await this.authServ.getCurrentUser();

    this.pulseraService.getPulseras(this.user.uid).on('value', (snapshot) =>{
      this.pulseras = [];
      snapshot.forEach(item => {
        let x = item.toJSON();
        x['id'] = item.key;
        this.pulseras.push(x);
      })
    });

  }

  //  CREA NUEVO REGISTRO
  onSubmit(formPulsera: NgForm){

    this.pulsera = new Pulsera();
    this.pulsera.nombre = formPulsera.value.nombre;
    this.pulsera.descripcion = formPulsera.value.descripcion;
    this.pulsera.precio = formPulsera.value.precio;
    this.pulsera.modAR = "undefine";
    this.pulsera.foto = this.urlImage;
    this.pulsera.usuario = this.user.uid;

    if (formPulsera.value.id == null && this.urlImage != null) {   
      console.log("nuevo registro")
      var id = this.pulseraService.createPulsera(this.pulsera);
      var modoAr = new Pulsera();
      modoAr.usuario = this.user.uid;
      modoAr.modAR = this.urlArchivo;
      this.pulseraService.createModoAr(id, modoAr);
      this.onClearForm(formPulsera);
      
    }

    if (formPulsera.value.id != null && this.urlImage != null) {      
      console.log("update con imagen")
      this.pulseraService.updatePulsera(formPulsera.value.id, this.pulsera);
      this.onClearForm(formPulsera);
    }
    
    if (formPulsera.value.id != null && this.urlImage == null) {
      this.pulsera.foto = this.pulseraService.pulseraSelect.fotoUpdate;
      console.log("update sin imagen")
      this.pulseraService.updatePulsera(formPulsera.value.id, this.pulsera);
      this.onClearForm(formPulsera);
    }
  }

  //  LIMPIA EL FORMULARIO 
  onClearForm(formPulsera?: NgForm){
    if (formPulsera != null) {
      formPulsera.reset();
      formPulsera.resetForm();    
    }

    this.pulseraService.pulseraSelect = new Pulsera();
    this.urlImage = null;
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

        this.urlImage = await this.pulseraService.uploadImage(this.foto);
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

        this.urlArchivo = await this.pulseraService.uploadFile(this.foto);
      } else {
        alert('Por favor ingrese un archivo de tipo ".rar"')
        this.pulseraService.pulseraSelect.wr = '';
      }
    }
  }

  //  EDITA UN REGISTRO
  onEdit(producto: any){
    this.pulseraService.pulseraSelect.id = producto.id;
    this.pulseraService.pulseraSelect.nombre = producto.nombre;
    this.pulseraService.pulseraSelect.descripcion = producto.descripcion;
    this.pulseraService.pulseraSelect.foto = "";
    this.pulseraService.pulseraSelect.precio = producto.precio;
    this.pulseraService.pulseraSelect.fotoUpdate = producto.foto;

    console.log(this.pulseraService.pulseraSelect.fotoUpdate)
  }

  //  ELIMINA UN REGISTRO
  onDelete(id: any){
    this.pulseraService.deletePulsera(id);
  }

  //  PAGINACION
  nextPage(){
    this.page += 2;
  }

  prevPage(){
    if (this.page > 0)  this.page -= 2;
  }
}
