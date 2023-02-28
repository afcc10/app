import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';
import { Response } from '../models/response'
import { environment } from 'src/environments/environment';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiventaService {  
  VENTA_BASE_URL: string = environment.BASE_URL_API_VENTA;
  constructor(private http: HttpClient) { }

  add(venta: Venta): Observable<Response>{
    return this.http.post<Response>(this.VENTA_BASE_URL,venta,httpOption);
  }
}
