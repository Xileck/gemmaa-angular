/**
 * Created by Jaime Carballo Diaz on 11/11/2016.
 */
export class ComportamientoReactivoEscala {
    constructor(public idAtributo: number,
                public idCRE: number,
                public comportamiento: string,
                public reactivo: string,
                public respuesta: string,
                public escala_a: number,
                public escala_b: number,
                public escala_c: number,
                public escala_d: number,
                public contestado: boolean,
                public promedio: number) {
    }
}