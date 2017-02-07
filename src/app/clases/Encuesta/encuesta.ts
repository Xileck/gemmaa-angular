import {ResultadoEsperado} from "./ResultadoEsperado";
import {Atributo} from "./Atributo";
import {ComportamientoReactivoEscala} from "./ComportamientoReactivoEscala";
/**
 * Created by Jaime Carballo Diaz on 11/11/2016.
 */
export class Encuesta {
    public nombre: string;
    public idEncuesta: number;
    public resultados_esperados: ResultadoEsperado[];
    public atributos: Atributo[];
    public listaCRE: ComportamientoReactivoEscala[];

    constructor() {
        this.atributos = [];
        this.resultados_esperados = [];
        this.listaCRE = [];
    }
}