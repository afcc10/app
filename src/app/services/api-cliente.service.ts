import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  url: string = 'https://localhost:5001/api/Cliente';
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Response>{
    return this.http.get<Response>(this.url);
  }

  addCliente(cliente: Cliente): Observable<Response>{
    return this.http.post<Response>(this.url,cliente,httpOption);
  }

  editCliente(cliente: Cliente): Observable<Response>{
    return this.http.put<Response>(this.url,cliente,httpOption);
  }

  deleteCliente(id: number): Observable<Response>{
    return this.http.delete<Response>(`${this.url}/${id}`);
  }
}
