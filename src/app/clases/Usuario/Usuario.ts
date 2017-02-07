import {Empleado} from "./Empleado";
/**
 * Created by JCDI on 04/01/2017.
 */

export class Usuario {
    public clave: string;
    public claveArea: string;
    public claveProyecto: string;
    public cuentaGenerica: string;
    public empleado: Empleado;
    public nipSuplente: string;
    public password: string;
    public rol: any;
    public suplente: string;
    public permiso: string;

    public get empleadoNombreCompleto(): string {
        return this.empleado.nombreCompleto;
    }

    public get empleadoPuesto(): string {
        return this.empleado.perfil;
    }

    public get empleadoRol(): string {
        return this.rol.descripcion;
    }

    public get empleadoAcceso(): string {
        return this.rol.clave;
    }

    public get empleadoRPE(): string {
        return this.empleado.rpe;
    }

    public get empleadoNip(): number {
        return this.empleado.nip;
    }

    public get empleadoFoto(): string {
        if (this.empleado.foto)
            return this.convertArrayBytesToBase64(this.empleado.foto);
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

    public emplHasAccess(rol: String): boolean {
        if ('ADMIN' == this.empleadoAcceso) {
            return true;
        }
        else if (rol.toUpperCase() == this.empleadoAcceso) {
            return true;
        }
    }
}