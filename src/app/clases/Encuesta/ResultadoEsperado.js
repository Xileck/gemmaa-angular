"use strict";
/**
 * Created by Jaime Carballo Diaz on 11/11/2016.
 */
var ResultadoEsperado = (function () {
    function ResultadoEsperado(descripcion, idResultadoEsperado, promedio) {
        if (promedio === void 0) { promedio = 0; }
        this.descripcion = descripcion;
        this.idResultadoEsperado = idResultadoEsperado;
        this.promedio = promedio;
    }
    return ResultadoEsperado;
}());
exports.ResultadoEsperado = ResultadoEsperado;
//# sourceMappingURL=ResultadoEsperado.js.map