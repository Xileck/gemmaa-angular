"use strict";
/**
 * Created by Jaime Carballo Diaz on 01/12/2016.
 */
var Evaluador = (function () {
    function Evaluador(nip_evaluador, tipo_de_evaluador, finalizo, id_evaluador, id_evaluacion, fecha, empleado, encuesta) {
        this.nip_evaluador = nip_evaluador;
        this.tipo_de_evaluador = tipo_de_evaluador;
        this.finalizo = finalizo;
        this.id_evaluador = id_evaluador;
        this.id_evaluacion = id_evaluacion;
        this.fecha = fecha;
        this.empleado = empleado;
        this.encuesta = encuesta;
    }
    return Evaluador;
}());
exports.Evaluador = Evaluador;
//# sourceMappingURL=Evaluador.js.map