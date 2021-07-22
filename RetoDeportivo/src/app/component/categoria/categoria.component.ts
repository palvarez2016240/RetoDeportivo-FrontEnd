import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers:[UsuarioService]
})
export class CategoriaComponent implements OnInit {
  public identidad;
  public url;
  constructor(
    public _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.identidad = this._usuarioService.obtenerIdentidad()
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
  }

}
