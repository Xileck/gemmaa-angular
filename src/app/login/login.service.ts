import {Router} from "@angular/router";
import {Injectable} from '@angular/core';
import {Usuario} from "../clases/Usuario/Usuario";
import {Message} from "primeng/components/common/api";
import {UtilService} from "../servicios/util.service";
import {SeguridadService} from "../servicios/seguridad.service";
import {environment} from "../../environments/environment";

@Injectable()
export class LoginService {
    usuario: Usuario;
    extencion: string = "numero_extension_de_IS";

    constructor(public router: Router,
                private utilService: UtilService,
                private seguridadService: SeguridadService) {
    }

    //noinspection TypeScriptUnresolvedVariable
    mensajesGlobales: Message[] = [];

    validarEmpleado(rpe: string, password: string): void {
        let servicioRoles: any = webORB.bind("com.cfemex.lv.libs.seguridad.roles.negocio.UsuarioRolBO", environment.rutaWebORB, null, null);
        try {
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(rpe, environment.nombreProyecto)).then(
                empleadoExiste => {
                    if (empleadoExiste) {
                        Promise.resolve((this.seguridadService.passwordValido(rpe, password, environment.nombreProyecto))).then(
                            passwordEsValida => {
                                if (passwordEsValida) {
                                    Promise.resolve(servicioRoles.seleccionarUsuario(rpe.toUpperCase(), environment.nombreProyecto)).then(
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
                            detail: 'Usuario no encontrado en la lista de usuarios de ' + environment.nombreProyecto + ".\n Ext: " + this.extencion + " para mayores informes."
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