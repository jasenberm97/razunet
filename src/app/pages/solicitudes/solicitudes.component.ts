import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitudService.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  solicitudes: any = [];
  productos: any = [];
  ids: any;
  archivo: any;
  urlArchivo: any;
  solicitud: any;
  public page: number = 0;

  constructor(public solicitudService: SolicitudService) { }

  async ngOnInit() {
    this.getAr();

  }

  async getAr(){
    this.solicitudService.getSolicitudes().on('value', snapshot =>{
      snapshot.forEach(element =>{        

        let id = element.key;
        let x = element.toJSON();

        this.solicitudService.getPulsera(id).then((snapshot) => {
          if (snapshot.exists()) {
            x['id'] = id;
            x['nombre'] = snapshot.val().nombre;
            x['descripcion'] = snapshot.val().descripcion;
            x['foto'] = snapshot.val().foto;
            x['tipo'] = "pulsera";
            this.solicitudes.push(x);
            
          } else {
            this.solicitudService.getCadena(id).then((snapshot) => {
              if (snapshot.exists()) {
                x['id'] = id;
                x['nombre'] = snapshot.val().nombre;
                x['descripcion'] = snapshot.val().descripcion;
                x['foto'] = snapshot.val().foto;
                x['tipo'] = "cadena";
                this.solicitudes.push(x);
              } else {
                this.solicitudService.getArete(id).then((snapshot) => {
                  if (snapshot.exists()) {
                    x['id'] = id;
                    x['nombre'] = snapshot.val().nombre;
                    x['descripcion'] = snapshot.val().descripcion;
                    x['foto'] = snapshot.val().foto;
                    x['tipo'] = "arete";
                    this.solicitudes.push(x);
                  } else {
                    this.solicitudService.getAnillo(id).then((snapshot) => {
                      if (snapshot.exists()) {
                        x['id'] = id;
                        x['nombre'] = snapshot.val().nombre;
                        x['descripcion'] = snapshot.val().descripcion;
                        x['foto'] = snapshot.val().foto;
                        x['tipo'] = "anillo";
                        this.solicitudes.push(x);
                      } else {
                        console.log("No data available");
                      }
                    })
                  }
                })
              }
            })
          }
        });
      });
    });    
  }

  async fileEventImage(event){
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.name.split('.')[1] === 'glb') {        
        const reader = new FileReader;
        reader.readAsDataURL(file);
        
        reader.onload = function load(){
          this.archivo = reader.result;
        }.bind(this);
        
        this.archivo = file;
        
        this.urlArchivo = await this.solicitudService.uploadImage(this.archivo);
      
      }else{
        console.log("a ocurrido un error");
      }
    }
  }

   //  LIMPIA EL FORMULARIO 
   onClearForm(formCadena?: NgForm){
    if (formCadena != null) {
      formCadena.reset();
      formCadena.resetForm();    
    }

    this.solicitudService.solicitudSelect = new Solicitud();
    this.urlArchivo = null;
    
      
  }

  onSubmit(formSolicitud: NgForm){
    this.solicitud = new Solicitud();
    this.solicitud.modARV = this.urlArchivo;
    this.solicitud.modAR = formSolicitud.value.urlAR;
    
    if (formSolicitud.value.id != null && this.urlArchivo != null && formSolicitud.value.urlAR != null) {   
      console.log("nuevo registro")
      console.log(formSolicitud.value.tipo)
      this.solicitudService.updateProducto(formSolicitud.value.id, formSolicitud.value.tipo, this.solicitud);
      this.solicitudService.deleteSolicitud(formSolicitud.value.id); 
      this.onClearForm(formSolicitud);
      
    }

  }

  onEdit(producto: any){
    this.solicitudService.solicitudSelect.id = producto.id;
    this.solicitudService.solicitudSelect.tipo = producto.tipo;
    this.solicitudService.solicitudSelect.nombre = producto.nombre;
    this.solicitudService.solicitudSelect.descripcion = producto.descripcion;

  }

  //  ELIMINA UN REGISTRO
  onDelete(id: any){
    this.solicitudService.deleteSolicitud(id);
  }

   //  PAGINACION
   nextPage(){
    this.page += 2;
  }

  prevPage(){
    if (this.page > 0)  this.page -= 2;
  }

}
