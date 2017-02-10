/**
 * Created by Jaime Carballo Diaz on 27/01/2017.
 */
import {Router} from "@angular/router";
import {Injectable} from '@angular/core';
import {UtilService} from "./util.service";
import {Empleado} from "../clases/Usuario/Empleado";
import {AdminService} from "./administracion.service";
import {environment} from "../../environments/environment";

@Injectable()
export class SeguridadService {
    servicioSeguridadBO: any = webORB.bind("com.cfemex.lv.is.seguridad.BO.SeguridadBO", environment.rutaWebORB, null, null);
    servicioUtilidadesBO: any = webORB.bind("com.cfemex.lv.is.seguridad.BO.UtilBO", environment.rutaWebORB, null, null);
    servicioUtilidadesDAO: any = webORB.bind("com.cfemex.lv.is.seguridad.DAO.UtilDAO", environment.rutaWebORB, null, null);

    constructor(public router: Router, private utilService: UtilService) {
    }

    getInfoEmpleado(nip: number): any {
        return this.servicioUtilidadesDAO.getInfoEmpleado(nip, environment.nombreProyecto)
    }

    getInfoEmpleadoFoto(nip: number): any {
        return this.servicioUtilidadesDAO.getInfoEmpleadoFoto(nip, environment.nombreProyecto)
    }

    /** Checar si el empleado existe en el proyecto usando rpe. */
    empleadoExisteEnProyecto(rpe: string, proyecto: string): boolean {
        return this.servicioSeguridadBO.empleadoExisteEnProyecto(rpe, proyecto);
    }

    /**
     * Validar usuario
     * Primero checa si existe en el proyecto que se especifico
     * Si existe checa si tiene contraseña en la table empl y compara
     * Si no existe valida con la contraseña de la tabla usuariosrol
     */
    passwordValido(rpe: string, password: string, proyecto: string): boolean {
        return this.servicioSeguridadBO.passwordValido(rpe, password, proyecto);
    }

    getUsuariosProyecto(proyecto: String): any {
        return this.servicioUtilidadesBO.getUsuariosProyecto(proyecto);
    }

    getUsuariosProyectoConFoto(proyecto: String): any {
        return this.servicioUtilidadesBO.getUsuariosProyectoConFoto(proyecto);
    }


}