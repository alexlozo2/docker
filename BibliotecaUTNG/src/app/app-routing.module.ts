
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosListComponent } from './components/libros-list/libros-list.component';
import { LibrosFormComponent } from './components/libros-form/libros-form.component';
import { NewsComponent } from './components/news/news.component';
import { FacetimeComponent } from './components/streaming/streaming.component'
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
//import { TwitchService } from './services/twitch.service'

import { NotFGuard } from './guards/not-f.guard';
import { OnlyAdminGuard } from './guards/only-admin.guard';
import { AltaPrestamoComponent } from './components/alta-prestamo/alta-prestamo.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { MapaSitioComponent } from './components/mapa-sitio/mapa-sitio.component';
import { LibrosViewComponent } from './components/libros-view/libros-view.component';
import { LibrosUsuComponent } from './components/libros-usu/libros-usu.component';
import { ListaPComponent } from './components/lista-p/lista-p.component';
import { TextoComponent } from './components/texto/texto.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path:'nuevaC',component:ForgotComponent},
  {path:'mapa', component:MapaSitioComponent},
  {path:'vistaL', component:LibrosViewComponent},
  {path:'nosotros', component:TextoComponent},
  {
    path:'misLibros',component:LibrosUsuComponent,
    canActivate: [NotFGuard],
    data: {
      title: 'Mis libros',
      breadcrumb: [
        {
          label: 'Libros',
          url:'/libros'

        },
        {
          label: 'Mis libros',
          url:''
        }
      ]
    }
  },
  {
    path:'listaP', component:ListaPComponent,
    canActivate: [OnlyAdminGuard],
    data: {
      title: 'Lista Prestamo',
      breadcrumb: [
        {
          label: 'Libros',
          url:'/libros'

        },
        {
          label: 'Lista Prestamo',
          url:''
        }
      ]
    }
  },
  {
    path: 'reservar/:id', component: AltaPrestamoComponent,
    canActivate: [NotFGuard],
    data: {
      title: 'Reserva',
      breadcrumb: [
        {
          label: 'Libros',
          url:'/libros'

        },
        {
          label: 'Reserva',
          url:''
        }
      ]
    }
  },
  {
    path: 'libros', component: LibrosListComponent,
    //Si el rol es usuario lo deja entrar
    canActivate: [NotFGuard],
    data: {
      litle: 'Libros',
      breadcrumb: [
        {
          label: 'Libros',
          url: ''
        }
      ]
    }
  },
  {
    path: 'libros/add', component: LibrosFormComponent,
    //Si el rol es igual a admin lo deja entran
    canActivate: [OnlyAdminGuard],
    data: {
      title: 'Añadir libro',
      breadcrumb: [
        {
          label: 'Libros',
          url:'/libros'

        },
        {
          label: 'Añadir libro',
          url:''
        }
      ]
    }
  },
  {
    path: 'libros/edit/:id', component: LibrosFormComponent,
    //Si el rol es igual a admin lo deja entran
    canActivate: [OnlyAdminGuard],
    data: {
      title: 'Editar libro',
      breadcrumb: [
        {
          label: 'Libros',
          url:'/libros'

        },
        {
          label: 'Editar libro',
          url:''
        }
      ]
    }
  },
  {
    path: 'noticias', component: NewsComponent,
    //Si el rol es usuario lo deja entrar
    //data: { breadcrumb: 'Noticias' }
  },
  {
    path: 'streaming', component: FacetimeComponent,
    //Si el rol es usuario lo deja entrar
    //data: { breadcrumb: 'Streaming' }
  },
  { path: 'errorPage', component: ErrorPageComponent },
  { path: '**', redirectTo: 'errorPage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
