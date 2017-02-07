import {Empleado} from "./Usuario/Empleado";
import {Encuesta} from "./Encuesta/encuesta";
/**
 * Created by Jaime Carballo Diaz on 01/12/2016.
 */
export class Evaluador {
    constructor(public nip_evaluador: number,
                public tipo_de_evaluador: string,
                public finalizo: string,
                public id_evaluador: number,
                public id_evaluacion: number,
                public fecha: string,
                public empleado: Empleado,
                public encuesta: Encuesta) {
    }
}