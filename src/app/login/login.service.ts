import {Router} from "@angular/router";
import {Injectable} from '@angular/core';
import {Usuario} from "../clases/Usuario/Usuario";
import {Message} from "primeng/components/common/api";
import {UtilService} from "../servicios/util.service";
import {SeguridadService} from "../servicios/seguridad.service";

@Injectable()
export class LoginService {
    usuario: Usuario;
    weborbUrl: string;
    nombreProyecto: string;
    godlike: boolean;

    constructor(public router: Router,
                private utilService: UtilService,
                private seguridadService: SeguridadService) {
        this.weborbUrl = utilService.urlWebOrb;
        this.nombreProyecto = utilService.nombreProyecto
        this.godlike = utilService.modoDios;
    }

    //noinspection TypeScriptUnresolvedVariable
    mensajesGlobales: Message[] = [];

    validarEmpleado(rpe: string, password: string): void {
        let servicioRoles: any = webORB.bind("com.cfemex.lv.libs.seguridad.roles.negocio.UsuarioRolBO", this.weborbUrl, null, null);
        try {
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(rpe, this.nombreProyecto)).then(
                empleadoExiste => {
                    if (empleadoExiste) {
                        Promise.resolve((this.seguridadService.passwordValido(rpe, password, this.nombreProyecto))).then(
                            passwordEsValida => {
                                if (passwordEsValida) {
                                    Promise.resolve(servicioRoles.seleccionarUsuario(rpe.toUpperCase(), this.nombreProyecto)).then(
                                        ResultadoPromesa => {
                                            this.mensajesGlobales = [];
                                            this.usuario = new Usuario();
                                            Object.assign(this.usuario, ResultadoPromesa);
                                            this.mensajesGlobales.push({
                                                severity: 'success',
                                                summary: 'Bienvenido:',
                                                detail: this.usuario.empleadoNombreCompleto
                                            });
                                            this.router.navigate(['principal']);
                                        });
                                }
                                else {
                                    this.mensajesGlobales.push({
                                        severity: 'error',
                                        summary: 'Error:',
                                        detail: 'La contraseña es invalida.'
                                    });
                                }
                            }
                        )
                    }
                    else {
                        this.mensajesGlobales.push({
                            severity: 'error',
                            summary: 'Error:',
                            detail: 'Usuario no encontrado en la lista de usuarios de GEMMAA.'
                        });
                    }
                })
        }
        catch (e) {
            console.log(e);
            this.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: "Error de conexion, compruebe que esta conectado a internet"
            });
        }
    }

    usuarioValidado(): boolean {
        if (this.usuario && this.usuario.empleado)
            return true;
        else
            return false;
    }

    emplHasAccess(rol: String): boolean {
        if ('ADMIN' == this.usuario.empleadoAcceso) {
            return true;
        }
        else if (rol.toUpperCase() == this.usuario.empleadoAcceso) {
            return true;
        }
        else
            return false
    }
}