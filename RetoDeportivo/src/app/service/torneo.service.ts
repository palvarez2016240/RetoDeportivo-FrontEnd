import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torneo } from '../model/torneo.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  public ruta: String;
  public token;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url
  }

  obtenerTorneos(id: string):Observable<any>{
    return this._http.get(this.ruta + 'torneosCategoria/' + id, {headers: this.headersVariable})
  }

  agregarTorneo(torneo: Torneo, categoriaId: String): Observable<any>{
    let params = JSON.stringify(torneo)
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.post(this.ruta + 'registrarTorneo/' + categoriaId, params, {headers: headersToken})
  }

  obtenerTorneo(idTorneo: String): Observable<any>{
    return this._http.get(this.ruta + 'torneoId/' + idTorneo, {headers: this.headersVariable})
  }

  editarTorneo(torneo: Torneo, idTorneo: String): Observable<any>{
    let params = JSON.stringify(torneo);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + 'editarTorneo/' + idTorneo, params, {headers: headersToken})
  }

  eliminarTorneo(idTorneo: Torneo): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.delete(this.ruta + 'eliminarTorneo/' + idTorneo, {headers: headersToken})
  }

  obtenerToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }
}