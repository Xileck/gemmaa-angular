"use strict";
/**
 * Created by JCDI on 04/01/2017.
 */
var Usuario = (function () {
    function Usuario() {
    }
    Object.defineProperty(Usuario.prototype, "empleadoNombreCompleto", {
        get: function () {
            return this.empleado.nombreCompleto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "empleadoPuesto", {
        get: function () {
            return this.empleado.perfil;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "empleadoRol", {
        get: function () {
            return this.rol.descripcion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "empleadoAcceso", {
        get: function () {
            return this.rol.clave;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "empleadoRPE", {
        get: function () {
            return this.empleado.rpe;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "empleadoNip", {
        get: function () {
            return this.empleado.nip;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "empleadoFoto", {
        get: function () {
            if (this.empleado.foto)
                return this.convertArrayBytesToBase64(this.empleado.foto);
        },
        enumerable: true,
        configurable: true
    });
    Usuario.prototype.convertArrayBytesToBase64 = function (byte) {
        var binary = '';
        var bytes = new Uint8Array(byte);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    Usuario.prototype.emplHasAccess = function (rol) {
        if ('ADMIN' == this.empleadoAcceso) {
            return true;
        }
        else if (rol.toUpperCase() == this.empleadoAcceso) {
            return true;
        }
    };
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map