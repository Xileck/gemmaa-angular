/**
 * Created by Jaime Carballo Diaz on 06/12/2016.
 */
"use strict";
var EvaluacionPendiente = (function () {
    function EvaluacionPendiente(id_evaluacion, id_evaluador, id_evaluado, nip_evaluador, nip_de_evaluado, idte, nombre_encuesta, tipo_de_evaluador, finalizo) {
        this.id_evaluacion = id_evaluacion;
        this.id_evaluador = id_evaluador;
        this.id_evaluado = id_evaluado;
        this.nip_evaluador = nip_evaluador;
        this.nip_de_evaluado = nip_de_evaluado;
        this.idte = idte;
        this.nombre_encuesta = nombre_encuesta;
        this.tipo_de_evaluador = tipo_de_evaluador;
        this.finalizo = finalizo;
    }
    return EvaluacionPendiente;
}());
exports.EvaluacionPendiente = EvaluacionPendiente;
//# sourceMappingURL=EvaluacionPendiente.js.map