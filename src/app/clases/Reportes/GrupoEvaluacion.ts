import {Evaluador} from "../Evaluador";
import {Empleado} from "../Usuario/Empleado";
import {Ponderados} from "./Ponderados";
import {Promedios} from "./Promedios";
/**
 * Created by Jaime Carballo Diaz on 04/01/2017.
 */

export class GrupoEvaluacion {
    public descripcionEncuesta: string;
    public evaluadores: Evaluador[];
    public fecha: string;
    public finalizada: string;
    public id_evaluacion: number;
    public idte: number;
    public nip_de_evaluado: number;
    public evaluado: Empleado;
    public ponderados: Ponderados;
    public promedios : Promedios;

}