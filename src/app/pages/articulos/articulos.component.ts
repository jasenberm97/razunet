import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Anillo } from 'src/app/models/anillo';
import { Arete } from 'src/app/models/arete';
import { Cadena } from 'src/app/models/cadena';
import { Pulsera } from 'src/app/models/pulsera';
import { AnilloService } from 'src/app/services/anilloService.service';
import { AreteService } from 'src/app/services/areteService.service';
import { ArticuloService } from 'src/app/services/articuloService.service';
import { AuthService } from 'src/app/services/auth.service';
import { CadenaService } from 'src/app/services/cadenaService.service';
import { PulseraService } from 'src/app/services/pulseraService.service';
import { SolicitudService } from 'src/app/services/solicitudService.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {


  public cadenas: Cadena[];
  public pulseras: Pulsera[];
  public anillos: Anillo[];
  public aretes: Arete[];
  public page: number = 0;
  cadena: any;
  user: any
  urlArchivo: String = null;
  urlImage: String = null;
  archivo: any = null;
  foto: any = null;

  constructor(public cadenaService: CadenaService, 
              private pulseraService: PulseraService,
              private anilloService: AnilloService,
              private areteService: AreteService,
              private authServ: AuthService,
              private articuloService: ArticuloService,
              private solicitudServ: SolicitudService) { 
           
              }

  //  LISTA TODOS MIS REGISTROS
  async ngOnInit() {
    this.user = await this.authServ.getCurrentUser();
    
    this.articuloService.getProductos(this.user.uid).on('value', (snapshot) => {
      this.cadenas = [];
      snapshot.forEach(item => {
        let x = item.toJSON();
        x['id'] = item.key;
        this.cadenas.push(x);
      });
    });



    console.log("cadehans"+this.cadenas)
  }


  //  CREA NUEVO REGISTRO
   onSubmit(formCadena: NgForm){
     
    var tipo = formCadena.value.tipo;

    this.cadena = new Cadena();
    this.cadena.nombre = formCadena.value.nombre;
    this.cadena.descripción = formCadena.value.descripcion;
    this.cadena.descripcion = formCadena.value.descripcion;
    this.cadena.precio = formCadena.value.precio;
    this.cadena.tipo = formCadena.value.tipo;
    this.cadena.modAR = "undefine";
    this.cadena.modARV = "undefine";
    this.cadena.foto = this.urlImage;
    this.cadena.prueba = "nulo";
    this.cadena.idEmprendimiento = this.user.uid;
    
    if (formCadena.value.id == null && this.urlImage != null && this.urlArchivo != null) {   
      console.log("nuevo registro")
      var id = this.articuloService.createProducto(this.cadena);
      if (1 == tipo) {
        this.cadenaService.createCadena(id, this.cadena);        
      }
      if (2 == tipo) {
        this.pulseraService.createPulsera(id, this.cadena);
      }
      if (3 == tipo) {
        this.anilloService.createAnillo(id, this.cadena);
      }
      if (4 == tipo) {
        this.areteService.createArete(id, this.cadena);
      }
      var modoAr = new Cadena();
      modoAr.usuario = this.user.uid;
      modoAr.modAR = this.urlArchivo;
      this.cadenaService.createModoAr(id, modoAr);
      this.onClearForm(formCadena);
      
    }

    if (formCadena.value.id != null && this.urlImage != null && this.urlArchivo != null) {      
      console.log("update con imagen");
      this.cadenaService.updateCadena(formCadena.value.id, this.cadena);
      if (1 == tipo) {
        this.cadenaService.updateCadena(formCadena.value.id, this.cadena);        
      }
      if (2 == tipo) {
        this.pulseraService.updatePulsera(formCadena.value.id, this.cadena);
      }
      if (3 == tipo) {
        this.anilloService.updateAnillo(formCadena.value.id, this.cadena);
      }
      if (4 == tipo) {
        this.areteService.updateArete(formCadena.value.id, this.cadena);
      }
      this.articuloService.updateProducto(formCadena.value.id ,this.cadena);
      
      this.onClearForm(formCadena);
    }
    
    if (formCadena.value.id != null && this.urlImage == null && this.urlArchivo == null) {
      this.cadena.foto = this.cadenaService.cadenaSelect.fotoUpdate;
      console.log("update sin imagen")      
      this.articuloService.updateProducto(formCadena.value.id ,this.cadena);
      this.cadenaService.updateCadena(formCadena.value.id, this.cadena);
      if (1 == tipo) {
        this.cadenaService.updateCadena(formCadena.value.id, this.cadena);        
      }
      if (2 == tipo) {
        this.pulseraService.updatePulsera(formCadena.value.id, this.cadena);
      }
      if (3 == tipo) {
        this.anilloService.updateAnillo(formCadena.value.id, this.cadena);
      }
      if (4 == tipo) {
        this.areteService.updateArete(formCadena.value.id, this.cadena);
      }
      
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
    this.cadenaService.cadenaSelect.descripción = producto.descripcion;
    this.cadenaService.cadenaSelect.descripcion = producto.descripcion;
    this.cadenaService.cadenaSelect.foto = "";
    this.cadenaService.cadenaSelect.precio = producto.precio;
    this.cadenaService.cadenaSelect.fotoUpdate = producto.foto;
    this.cadenaService.cadenaSelect.tipo = producto.tipo;

    console.log(this.cadenaService.cadenaSelect.fotoUpdate)
  }

  //  ELIMINA UN REGISTRO
  onDelete(id: any, tipo: any){
    if (1 == tipo) {
      console.log("entra cadena")
      this.cadenaService.deleteCadena(id);        
      
    }
    if (2 == tipo) {
      console.log("entra pulsera")
      this.pulseraService.deletePulsera(id);
    }
    if (3 == tipo) {
      console.log("entra anillo")
      this.anilloService.deleteAnillo(id);
    }
    if (4 == tipo) {
      console.log("entra arete")
      this.areteService.deleteArete(id);
    }
    this.solicitudServ.deleteSolicitud(id);
    this.articuloService.deleteProducto(id);

  }

  //  PAGINACION
  nextPage(){
    this.page += 2;
  }

  prevPage(){
    if (this.page > 0)  this.page -= 2;
  }

}
