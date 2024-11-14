import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LibrosFormComponent } from './components/libros-form/libros-form.component';
import { LibrosListComponent } from './components/libros-list/libros-list.component';
import { NabvarComponent } from './nabvar/nabvar.component';
import { NewsComponent } from './components/news/news.component';
import { FacetimeComponent } from './components/streaming/streaming.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AltaPrestamoComponent } from './components/alta-prestamo/alta-prestamo.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";
import { ForgotComponent } from './components/forgot/forgot.component';
import { MapaSitioComponent } from './components/mapa-sitio/mapa-sitio.component';
import { LibrosViewComponent } from './components/libros-view/libros-view.component';
import { LibrosUsuComponent } from './components/libros-usu/libros-usu.component';
import { ListaPComponent } from './components/lista-p/lista-p.component';
import { SecundarioNavComponent } from './components/secundario-nav/secundario-nav.component';
import { TextoComponent } from './components/texto/texto.component';




//import { TwitchService } from './services/twitch.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LibrosFormComponent,
    LibrosListComponent,
    NabvarComponent,
    NewsComponent,
    FacetimeComponent,
    FooterComponent,
    HomeComponent,
    ErrorPageComponent,
    AltaPrestamoComponent,
    ForgotComponent,
    MapaSitioComponent,
    LibrosViewComponent,
    LibrosUsuComponent,
    ListaPComponent,
    SecundarioNavComponent,
    TextoComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgDynamicBreadcrumbModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
