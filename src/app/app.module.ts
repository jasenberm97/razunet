import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'; 
import { AngularFireAuthModule } from '@angular/fire/auth'

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AppComponent } from './components/app/app.component';
import { FoundComponent } from './nopage-found/nopage-found/found.component';
import { AuthModule } from './auth/auth.module';
import { CadenaService } from './services/cadenaService.service';
import { environment } from '../environments/environment';
import { AreteService } from './services/areteService.service';
import { AnilloService } from './services/anilloService.service';
import { PulseraService } from './services/pulseraService.service';
import { SolicitudService } from './services/solicitudService.service';

@NgModule({
  declarations: [
    AppComponent,
    FoundComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [    
    CadenaService,
    AreteService,
    PulseraService,
    AnilloService,
    SolicitudService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
