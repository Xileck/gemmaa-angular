"use strict";
/**
 * Created by Jaime Carballo Diaz on 11/11/2016.
 */
var ComportamientoReactivoEscala = (function () {
    function ComportamientoReactivoEscala(idAtributo, idCRE, comportamiento, reactivo, respuesta, escala_a, escala_b, escala_c, escala_d, contestado, promedio) {
        this.idAtributo = idAtributo;
        this.idCRE = idCRE;
        this.comportamiento = comportamiento;
        this.reactivo = reactivo;
        this.respuesta = respuesta;
        this.escala_a = escala_a;
        this.escala_b = escala_b;
        this.escala_c = escala_c;
        this.escala_d = escala_d;
        this.contestado = contestado;
        this.promedio = promedio;
    }
    return ComportamientoReactivoEscala;
}());
exports.ComportamientoReactivoEscala = ComportamientoReactivoEscala;
//# sourceMappingURL=ComportamientoReactivoEscala.js.map