import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers:[UsuarioService,CategoriaService]
})
export class CategoriaComponent implements OnInit {
  public identidad;
  public url;
  public idCategoria
  public categoriaList
  constructor(
    public _CategoriaService: CategoriaService,
    public _usuarioService: UsuarioService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute,
  ) {
    this.identidad = this._usuarioService.obtenerIdentidad()
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRoute)=>{
      this.idCategoria = dataRoute.get('idCategoria')
    })
    this.ObtenerCategoriaID(this.idCategoria)
  }

  ObtenerCategoriaID(id){
    this._CategoriaService.obtenerCategoriaId(id).subscribe(
      response=>{

        this.categoriaList = response.cateEncontrado
        console.table(response)
      },
      err=>{
        console.log(<any>err)

      }
    )
  }

}
