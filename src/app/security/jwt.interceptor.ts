import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiauthService } from "../services/api-auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private apiAuthService: ApiauthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const usuario = this.apiAuthService.usuarioData;

        if(usuario){
            request = request.clone({
                setHeaders: {
                    Autorization: `Bearer ${usuario.token}`
                }
            });
        }

        return next.handle(request);
    }
}