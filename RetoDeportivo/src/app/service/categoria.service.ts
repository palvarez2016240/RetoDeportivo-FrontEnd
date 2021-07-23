import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');
  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
  }

  obtenerCategoria(): Observable<any>{
    return this._http.get(this.ruta + "/todasCategorias",{headers: this.headersVariable})
  }
  
  obtenerCategoriaId(id): Observable<any>{
    return this._http.get(this.ruta+"/obtenerCategoriasId/"+id,{headers: this.headersVariable})
  }

}


