/**
 * Created by Jaime Carballo Diaz on 11/11/2016.
 */
export class Atributo {
    constructor(public nombre: string,
                public descripcion: string,
                public idAtributo: number,
                public idResultadoEsperado: number,
                public promedio: number = 0) {
    }
}