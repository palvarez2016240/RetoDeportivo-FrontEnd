import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from 'src/app/model/equipo.model';
import { EquipoService } from 'src/app/service/equipo.service';
import { GLOBAL } from 'src/app/service/global.service';
import { SubirimagenService } from 'src/app/service/subirimagen.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  providers: [UsuarioService,EquipoService,UsuarioService, SubirimagenService]
})
export class EquiposComponent implements OnInit {

  public identidad
  public team
  public idEquipo;
  public equipoList
  public ModelEquipoID
  public usuariosST
  public UsuarioID
  public url;
  public token;
  public nuevosDatos;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _equipoService: EquipoService,
    public _usuarioService:UsuarioService,
    public _subirService:SubirimagenService
  ) {
    this.identidad = this._usuarioService.obtenerIdentidad()
    this.ModelEquipoID = new Equipo('','','',0,0,[{torneo:''}],[{usuario:''}],'')
    this.token = _usuarioService.obtenerToken()
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRoute)=>{
      this.idEquipo = dataRoute.get('idEquipo')
    })

    this.mostarEquipoID(this.idEquipo)
    this.ObtenerTeam(this.idEquipo)
    this.obtenerUsuarios()
  }

  mostarEquipoID(id){
    this._equipoService.obtenerEquipoID(id).subscribe(
      response =>{

        this.ModelEquipoID = response.EquipoEncontrado
        this.equipoList = response.EquipoEncontrado
        console.table(this.equipoList)
      },
      err =>{

      }
    )
  }

  ObtenerTeam(id){
    this._equipoService.ObtenerTeam(id).subscribe(
      response =>{
        this.team = response.TeamEcontrado
        console.table(this.team)
      },
      err =>{

      }
    )
  }

  EditarEquipo() {
    this._equipoService.EditarEquipo(this.ModelEquipoID, this.idEquipo).subscribe(
      (response) => {
        console.log(response.EquipoActualizado);


      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje,

        })
      }
    );
  }

  EliminarMiembro(id){
    this._equipoService.eliminarMiembro(id).subscribe(
      response =>{

        console.log(response.EquipoActualizado)
        this.ObtenerTeam(this.idEquipo)
        window.location.reload()
      },
      err =>{

      }
    )
  }

  obtenerUsuarios(){
    this._equipoService.obtenerUsuairo().subscribe(
      response =>{
        this.usuariosST = response.UsuarioEncontrado
        console.table(this.usuariosST)
      }
    )
  }

  agregarMiembro(){
    this._equipoService.agregarMiembro(this.ModelEquipoID, this.idEquipo).subscribe(
      response =>{
        console.table(response)
        this.obtenerUsuarios()
        this.ObtenerTeam(this.idEquipo)
      }
    )
  }

  obtenerUsuarioID(id){
    this._usuarioService.obtenerUserID(id).subscribe(
      response => {
        this.equipoList = response.usuarioEncontrado
        console.table(this.equipoList)

      },err=>{

      }
    )
  }

  unirmeAEquipo() {
    this._equipoService.unirAEquipo(this.ModelEquipoID ,this.idEquipo, this._usuarioService.obtenerIdentidad()._id,).subscribe(
      response => {
        console.table(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido al Equipo',
          showConfirmButton: false,
          timer: 1500
        })
        this.obtenerUsuario();
        window.location.reload();
      },
      error => {
        console.log(<any>error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  obtenerUsuario() {
    this._usuarioService.obtenerUserID(this._usuarioService.obtenerIdentidad()._id).subscribe(
      response => {
        this.nuevosDatos = response.usuarioEncontrado;
        localStorage.setItem('identidad', JSON.stringify(this.nuevosDatos))
      }
    )
  }
}
