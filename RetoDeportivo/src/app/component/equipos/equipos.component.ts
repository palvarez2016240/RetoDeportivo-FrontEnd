import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from 'src/app/model/equipo.model';
import { EquipoService } from 'src/app/service/equipo.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  providers: [UsuarioService,EquipoService,UsuarioService]
})
export class EquiposComponent implements OnInit {

  public identidad
  public team
  public idEquipo;
  public equipoList
  public ModelEquipoID
  public usuariosST
  public UsuarioID
  constructor(
    public _activatedRoute: ActivatedRoute,
    public _equipoService: EquipoService,
    public _usuarioService:UsuarioService,
  ) {
    this.identidad = this._usuarioService.obtenerIdentidad()
    this.ModelEquipoID = new Equipo('','','',0,0,[{torneo:''}],[{usuario:''}],'')
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

}
