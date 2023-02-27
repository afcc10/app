import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiauthService } from 'src/app/services/api-auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  /*public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });*/

  public loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });


  constructor(public apiAuth: ApiauthService, private route: Router, private fb: FormBuilder) {
    /*if(this.apiAuth.usuarioData){
      this.route.navigate(['/']);
    }*/
   }

  ngOnInit(): void {
  }

  login(){
    const login: Login = {
      email : this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.apiAuth.login(login).subscribe(response =>{
      if(response.exito === 200){
        this.route.navigate(['/']);
      }
    })
  }

}
