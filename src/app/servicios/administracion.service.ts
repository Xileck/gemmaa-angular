/**
 * Created by Jaime Carballo Diaz on 07/12/2016.
 */
import {Router} from "@angular/router";
import {Injectable} from '@angular/core';
import {LoginService} from "../login/login.service";
import {Evaluacion} from "../clases/Evaluacion";
import {Evaluador} from "../clases/Evaluador";
import {AsignarEvaluador} from "../clases/AsignarEvaluador";
import {UtilService} from "./util.service";
import {Usuario} from "../clases/Usuario/Usuario";

@Injectable()
export class AdminService {
    servicioUsuarioRol: any = webORB.bind("com.cfemex.lv.libs.seguridad.roles.negocio.UsuarioRolBO", this.utilService.urlWebOrb, null, null);
    servicioEmpleadoDAO: any = webORB.bind("com.cfemex.lv.EmpleadoDAO", this.utilService.urlWebOrb, null, null);
    servicioEncuesta: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", this.utilService.urlWebOrb, null, null);
    servicioEvaluacion: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EvaluacionBO", this.utilService.urlWebOrb, null, null);

    constructor(public router: Router, private loginService: LoginService, private utilService: UtilService) {

    }

    //noinspection TypeScriptUnresolvedVariable
    //
    seleccionarUsuario(cveusuario: string, nombreProyecto: string): Usuario {
        return this.servicioUsuarioRol.seleccionarUsuario(cveusuario.toUpperCase(), nombreProyecto);
    }

    //EmpleadoDAO
    buscarUsuario(rpeInput: any): Promise<any> {
        return Promise.resolve(this.servicioEmpleadoDAO.seleccionarEmpleado(rpeInput.toString().toUpperCase()));
    }


    //EncuestaBO
    getCatalogoEncuestas(): void {
        return this.servicioEncuesta.getCatalogoEncuestas();
    }

    actualizarUsuarioRol(usuario): void {
        if (usuario != null) {
            var userCascaron: any = {
                clave: usuario.empleado.rpe,
                claveArea: usuario.empleado.areaTrabajo.clave,
                claveProyecto: this.utilService.nombreProyecto,
                cuentaGenerica: 'N',
                empleado: {nip: usuario.empleado.nip},
                password: usuario.empleado.password != null && usuario.empleado.password > 0 ? usuario.empleadopassword : usuario.password,
                rol: {clave: usuario.rol.clave, proyecto: this.loginService.nombreProyecto}
            }
            this.servicioUsuarioRol.actulizarUsuarioRol(userCascaron);
        } else if (usuario.empleado == null) {
            console.error('Empelado nulo');
        }
    }

    eliminarUsuarioRol(nombreProyecto: string, rpe: string) {
        this.servicioUsuarioRol.eliminarUsuarioRol(nombreProyecto, rpe);
    }

    insertarUsuarioRol(empleado): void {
        if (empleado != null && empleado.permiso != null) {
            var userCascaron: any = {
                clave: empleado.rpe,
                claveArea: empleado.areaTrabajo.clave,
                claveProyecto: this.utilService.nombreProyecto,
                cuentaGenerica: 'N',
                empleado: {nip: empleado.nip},
                password: empleado.rpe,
                rol: {clave: empleado.permiso, proyecto: this.loginService.nombreProyecto}
            }
            this.servicioUsuarioRol.insertarUsuarioRol(userCascaron);
        } else if (empleado == null) {
            console.error('Empleado nulo');
        }
        else if (empleado.permiso == null) {
            console.error('permiso nulo');
        }
    }


    //EvaluacionBO
    crearEvaluacion(evaluacion: Evaluacion, evaluadores: AsignarEvaluador[]): void {
        this.servicioEvaluacion.crearEvaluacion(evaluacion, evaluadores);
    }
}