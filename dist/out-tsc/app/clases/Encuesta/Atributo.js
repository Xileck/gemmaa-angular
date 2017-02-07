/**
 * Created by Jaime Carballo Diaz on 11/11/2016.
 */
export var Atributo = (function () {
    function Atributo(nombre, descripcion, idAtributo, idResultadoEsperado, promedio) {
        if (promedio === void 0) { promedio = 0; }
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.idAtributo = idAtributo;
        this.idResultadoEsperado = idResultadoEsperado;
        this.promedio = promedio;
    }
    return Atributo;
}());
//# sourceMappingURL=C:/Users/cfe/Desktop/GEMMAA_CLI/src/app/clases/Encuesta/Atributo.js.map