import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Formulario } from '../model/formulario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ApiUrl = environment.API;

  constructor(private http: HttpClient) { }

  postFormulario(formularioDados:Formulario):Observable<Formulario>{
    return this.http.post<Formulario>(this.ApiUrl,formularioDados);
  }
}
