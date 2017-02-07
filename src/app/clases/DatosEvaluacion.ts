import {Empleado} from "./Usuario/Empleado";
/**
 * Created by Jaime Carballo Diaz on 04/01/2017.
 */

export class DatosEvaluacion {
    public evaluado: Empleado;
    public encuestaId: number;
    public nombre_encuesta: string;
    public tipo_de_evaluador: string;
    public id_evaluacion: number;
    public id_evaluador: number;
    public finalizo: string;
}