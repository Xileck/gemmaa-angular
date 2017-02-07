/**
 * Created by JCDI on 04/01/2017.
 */
export var Empleado = (function () {
    function Empleado() {
        // this.asignado = false;
    }
    Object.defineProperty(Empleado.prototype, "empleadoFoto", {
        get: function () {
            if (this.foto)
                return this.convertArrayBytesToBase64(this.foto);
        },
        enumerable: true,
        configurable: true
    });
    Empleado.prototype.convertArrayBytesToBase64 = function (byte) {
        var binary = '';
        var bytes = new Uint8Array(byte);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    return Empleado;
}());
//# sourceMappingURL=C:/Users/cfe/Desktop/GEMMAA_CLI/src/app/clases/Usuario/Empleado.js.map