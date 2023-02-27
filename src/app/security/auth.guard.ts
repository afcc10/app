import { Injectable } from "@angular/core";
import { Router,CanActivate,ActivatedRouteSnapshot } from "@angular/router";
import { ApiauthService } from "../services/api-auth.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private route: Router, private apiAutService: ApiauthService){}

    canActivate(route: ActivatedRouteSnapshot){
        const usuario = this.apiAutService.usuarioData;
        if(usuario){
            return true;
        }
                
        this.route.navigate(['/login']);
        return false;
    }
}