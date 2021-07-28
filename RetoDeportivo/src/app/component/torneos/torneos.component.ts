import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Torneo } from 'src/app/model/torneo.model';
import { TorneoService } from 'src/app/service/torneo.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.scss'],
  providers: [TorneoService, UsuarioService]
})
export class TorneosComponent implements OnInit {

  public identidad;
  public modelTorneo;
  public idCategoria;
  public idTorneo;
  public torneoList;
  public equiposList;
  public sinTorneo;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _torneoService: TorneoService,
    public _usuarioService: UsuarioService,
    private _router: Router

  ) {
    this.identidad = this._usuarioService.obtenerIdentidad();
    this.modelTorneo = new Torneo('', '', [{ equipoId: '' }], false, false, '', '');
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRoute) => {
      this.idTorneo = dataRoute.get('idTorneo')
    })
    this.obtenerTorneoId(this.idTorneo);
    this.mostrarEquipos(this.idTorneo);
    this.equiposSinTorneo(this.idTorneo)
  }

  obtenerTorneoId(idTorneo) {
    this._torneoService.obtenerTorneo(idTorneo).subscribe(
      response => {
        this.modelTorneo = response.torneoEncontrado;
        this.torneoList = response.torneoEncontrado;
        console.log(response)
      }
    )
  }

  editarTorneo() {
    this._torneoService.editarTorneo(this.modelTorneo, this.idTorneo).subscribe(
      response => {
        console.log(response.torneoEditado);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Torneo editado',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload()
      }
    ),
      error => {
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
  }

  eliminarTorneo() {
    this._torneoService.eliminarTorneo(this.idTorneo).subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/Inicio']);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al eliminar el torneo',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }

  mostrarEquipos(idTorneo) {
    this._torneoService.equiposTorneo(idTorneo).subscribe(
      response => {
        this.equiposList = response.equiposEncontrado;
        console.log(response)
      }
    )
  }

  equiposSinTorneo(idTorneo) {
    this._torneoService.equiposSinTorneo(idTorneo).subscribe(
      response => {
        this.sinTorneo = response.equiposEncontrados;
        console.log(response)
      }
    )
  }

  unirEquipo() {
    this._torneoService.unirEquipos(this.modelTorneo, this.idTorneo).subscribe(
      response => {
        console.table(response)
        this.equiposSinTorneo(this.idTorneo)
        this.obtenerTorneoId(this.idTorneo)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Equipo Agregdo',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload()
      }
    ),
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
  }

  iniciarTorneo() {
    this._torneoService.iniciarTorneo(this.idTorneo).subscribe(
      response => {
        console.table(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Torneo Iniciado',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload()
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

  terminarTorneo() {
    this._torneoService.terminarTorneo(this.idTorneo).subscribe(
      response => {
        console.table(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Torneo Terminado',
          showConfirmButton: false,
          timer: 1500
        })
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
}
