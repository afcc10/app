import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response'

@Injectable({
  providedIn: 'root'
})
export class ApiProductoService {
  PRODUCTO_BASE_URL: string = environment.BASE_URL_API_PRODUCTO;
  constructor(private http: HttpClient) { }

  get(): Observable<Response>{
    return this.http.get<Response>(this.PRODUCTO_BASE_URL);
  }
}
