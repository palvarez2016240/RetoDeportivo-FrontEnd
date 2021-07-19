import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  usuariosList;
  userActualizado;
  usuarioIDModel: Usuario;
  usuarios;
  public identidad;
  constructor(public _usuarioService: UsuarioService, private _router: Router) {
    this.usuarioIDModel = new Usuario('', '', '', '',0, '', '', '', '');
  }

  ngOnInit(): void {
  }

  editarUser(id) {
    this._usuarioService.editarPerfil(this.usuarioIDModel, id).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit()
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerUsuarioId(id) {
    this._usuarioService.obtenerUserID(id).subscribe((response) => {
      this.usuarioIDModel = response.usuarioEncontrado;
      this.userActualizado = response.usuarioEncontrado;
      console.log(response.usuarioEncontrado);
    });
  }

  eliminarUser(id) {
    this._usuarioService.eliminarUser(id).subscribe(
      (response) => {
        console.log(response);
        this.  ngOnInit()
      },
      (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Usuario Eliminado',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

}
