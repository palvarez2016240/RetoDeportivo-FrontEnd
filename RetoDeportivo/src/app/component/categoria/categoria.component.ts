import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Equipo } from 'src/app/model/equipo.model';
import { EquipoService } from 'src/app/service/equipo.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers:[UsuarioService,CategoriaService,EquipoService]
})
export class CategoriaComponent implements OnInit {
  public identidad;
  public url;
  public idCategoria
  public categoriaList
  public ModelEquipoID:Equipo
  public equipoList
  public idEquipo
  public usuarioModel: Usuario;
  public token;

  constructor(
    public _CategoriaService: CategoriaService,
    public _usuarioService: UsuarioService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute,
    public _EquipoService: EquipoService,
  ) {
    this.ModelEquipoID = new Equipo('','','',0,0,[{torneo:''}],[{usuario:''}],'')
    this.identidad = this._usuarioService.obtenerIdentidad()
    this.url = GLOBAL.url
    this.usuarioModel = new Usuario('','','','',0,'','','','');

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRoute)=>{
      this.idCategoria = dataRoute.get('idCategoria')
    })
    this.ObtenerCategoriaID(this.idCategoria)
    this.MostrarEquipoCategoria(this.idCategoria)
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

  MostrarEquipoCategoria(id){
    this._EquipoService.MostrarEquipoCategoria(id).subscribe(
      response =>{
        this.equipoList = response.EquipoEncontrado
        var team = response.EquipoEncontrado
        console.table(team)
      },
      err =>{

      }
    )
  }

  mostarEquipoID(id){
    this._EquipoService.obtenerEquipoID(id).subscribe(
      response =>{

        this.idEquipo = response.EquipoEncontrado
        console.table(this.idEquipo)
      },
      err =>{

      }
    )
  }


  CrearEquipo(){

    this._EquipoService.agregarEquipo(this.ModelEquipoID, this.idCategoria).subscribe(

      response=>{
        console.table(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Equipo Creado',
          showConfirmButton: false,
          timer: 1500
        })
        this.ModelEquipoID.nombre = ''
        this.MostrarEquipoCategoria(this.idCategoria)
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        this.ModelEquipoID.nombre = ''
      }
    )
  }



}
