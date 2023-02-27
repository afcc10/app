import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiauthService } from './services/api-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  usuario: Usuario;

  constructor(public apiAuth: ApiauthService,
              private route: Router){
      this.apiAuth.usuar.subscribe(response =>{
        this.usuario = response;
        console.log('Cambio ' + response);
      });
  }

  logout(){
    this.apiAuth.logout();
    this.route.navigate(['/login']);
  }
}
