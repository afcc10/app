import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Response } from '../models/response'

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiClienteService {
  CLIENTE_BASE_URL: string = environment.BASE_URL_API_CLIENTE;
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Response>{
    return this.http.get<Response>(this.CLIENTE_BASE_URL);
  }

  addCliente(cliente: Cliente): Observable<Response>{
    return this.http.post<Response>(this.CLIENTE_BASE_URL,cliente,httpOption);
  }

  editCliente(cliente: Cliente): Observable<Response>{
    return this.http.put<Response>(this.CLIENTE_BASE_URL,cliente,httpOption);
  }

  deleteCliente(id: number): Observable<Response>{
    return this.http.delete<Response>(`${this.CLIENTE_BASE_URL}/${id}`);
  }
}
