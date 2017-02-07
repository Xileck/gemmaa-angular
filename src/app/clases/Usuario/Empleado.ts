/**
 * Created by JCDI on 04/01/2017.
 */

export class Empleado {
    public apellidomaterno: string;
    public apellidopaterno: string;
    public areaTrabajo: any;
    public categoria: string;
    public celular: string;
    public colonia: string;
    public compania: string;
    public contrato: string;
    public domicilio: string;
    public emailinterno: string;
    public emailintra: string;
    public emailLotus: string;
    public estadoCivil: string;
    public extension: string;
    public fechaNacimiento: string;
    public foto: any;
    public lugarNacimiento: string;
    public nip: number;
    public nombre: string;
    public nombreCompleto: string;
    public password: string;
    public perfil: string;
    public rpe: string;
    public rpeanterior: string;
    public sexo: string;
    public telefono: string;
    public vigente: string;
    public area: string;
    public asignado: boolean;
    public permiso: string;

    constructor() {
        // this.asignado = false;
    }

    public get empleadoFoto() {
        if (this.foto)
            return this.convertArrayBytesToBase64(this.foto);
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
}