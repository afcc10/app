import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../models/login";
import { Response } from '../models/response'
import { Usuario } from "../models/usuario";

const httpOption = {
    headers: new HttpHeaders({
      'Contend-Type': 'application/json'
    })
  };

@Injectable({ providedIn: 'root' })

export class ApiauthService {
    USUARIO_BASE_URL: string = environment.BASE_URL_API_USUARIO;    
    private usuarioSubject: BehaviorSubject<Usuario>;
    public usuar: Observable<Usuario>;

    public get usuarioData(): Usuario{
      return this.usuarioSubject.value;
    }

    constructor(private http: HttpClient) {
      this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
      this.usuar = this.usuarioSubject.asObservable();
     }

    login(login: Login): Observable<Response>{
        return this.http.post<Response>(this.USUARIO_BASE_URL,login,httpOption).pipe(
          map(res => {
            if(res.exito === 200){
              const user: Usuario = res.data;
              localStorage.setItem('usuario',JSON.stringify(user));
              this.usuarioSubject.next(user);
            }
            return res;
          })
        );
    }

    logout(){
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null);
    }
}