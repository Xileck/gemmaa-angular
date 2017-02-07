/**
 * Created by Jaime Carballo Diaz on 06/12/2016.
 */

export class EvaluacionPendiente {
    constructor(public id_evaluacion: number,
                public id_evaluador: number,
                public id_evaluado: number,
                public nip_evaluador,
                public nip_de_evaluado,
                public idte: number,
                public nombre_encuesta: string,
                public tipo_de_evaluador: string,
                public finalizo: string) {
    }
}