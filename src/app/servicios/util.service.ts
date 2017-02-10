/**
 * Created by Jaime Carballo Diaz on 07/12/2016.
 */
import {Router} from "@angular/router";
import {Injectable} from '@angular/core';
import {LoginService} from "../login/login.service";
import {Empleado} from "../clases/Usuario/Empleado";
import {Ponderados} from "../clases/Reportes/Ponderados";
import {environment} from "../../environments/environment";

@Injectable()
export class UtilService {

    servicio: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.UtilBO", environment.rutaWebORB, null, null);
    servicioEmpleadoDAO: any = webORB.bind("com.cfemex.lv.EmpleadoDAO", environment.rutaWebORB, null, null);
    servicioIntra: any = webORB.bind("com.cfemex.lv.is.apps.intranet.EmplDAO", environment.rutaWebORB, null, null);

    constructor(public router: Router) {
    }

    app_dialogo_argumentos = {
        finalizo: false,
        display: false,
        msg: "Espera un momento",
        title: 'Aguarda un momento',
        timer: null,
        tipo: 'info'
    };

    //EmpleadoDAO
    buscarEmpleado(rpeInput: any): Empleado {
        return this.servicioEmpleadoDAO.seleccionarEmpleado(rpeInput.toString().toUpperCase());
    }

    buscarEmpleados(empleado: string): Empleado[] {
        return this.servicioIntra.buscaEmpleados(empleado.toUpperCase());
    }


    convertArrayBytesToBase64(byte: any): string {
        var binary = '';
        var bytes = new Uint8Array(byte);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    reiniciarDialogo() {
        this.app_dialogo_argumentos = {
            finalizo: false,
            display: false,
            msg: 'Espera un momento',
            title: 'Aguarda un momento',
            timer: null,
            tipo: 'info'
        }
        document.body.style.cursor = 'auto';
    }

    getRpeDeNip(nip: number) {
        return this.servicio.getRpeDeNip(nip);
    }


    displayDialogo(message: string, tipo: string): void {
        this.app_dialogo_argumentos.display = true;
        this.app_dialogo_argumentos.msg = message;
        this.app_dialogo_argumentos.tipo = tipo;
        document.body.style.cursor = 'wait';
    }

    mensajeExitoDialogo(message: string): void {
        this.app_dialogo_argumentos.tipo = 'info';
        this.app_dialogo_argumentos.finalizo = true;
        this.app_dialogo_argumentos.msg = message;
        document.body.style.cursor = 'auto';
    }


    dialogoHide() {
        this.app_dialogo_argumentos.display = false;
    }

    dialogoShow() {
        this.app_dialogo_argumentos.display = true;
    }
}
