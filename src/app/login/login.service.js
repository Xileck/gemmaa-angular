"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require("@angular/router");
var core_1 = require('@angular/core');
var Usuario_1 = require("../clases/Usuario/Usuario");
var util_service_1 = require("../servicios/util.service");
var seguridad_service_1 = require("../servicios/seguridad.service");
var LoginService = (function () {
    function LoginService(router, utilService, seguridadService) {
        this.router = router;
        this.utilService = utilService;
        this.seguridadService = seguridadService;
        //noinspection TypeScriptUnresolvedVariable
        this.mensajesGlobales = [];
        this.weborbUrl = utilService.urlWebOrb;
        this.nombreProyecto = utilService.nombreProyecto;
        this.godlike = utilService.modoDios;
    }
    LoginService.prototype.validarEmpleado = function (rpe, password) {
        var _this = this;
        var servicioRoles = webORB.bind("com.cfemex.lv.libs.seguridad.roles.negocio.UsuarioRolBO", this.weborbUrl, null, null);
        try {
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(rpe, this.nombreProyecto)).then(function (empleadoExiste) {
                if (empleadoExiste) {
                    Promise.resolve((_this.seguridadService.passwordValido(rpe, password, _this.nombreProyecto))).then(function (passwordEsValida) {
                        if (passwordEsValida) {
                            Promise.resolve(servicioRoles.seleccionarUsuario(rpe.toUpperCase(), _this.nombreProyecto)).then(function (ResultadoPromesa) {
                                _this.mensajesGlobales = [];
                                _this.usuario = new Usuario_1.Usuario();
                                Object.assign(_this.usuario, ResultadoPromesa);
                                _this.mensajesGlobales.push({
                                    severity: 'success',
                                    summary: 'Bienvenido:',
                                    detail: _this.usuario.empleadoNombreCompleto
                                });
                                _this.router.navigate(['principal']);
                            });
                        }
                        else {
                            _this.mensajesGlobales.push({
                                severity: 'error',
                                summary: 'Error:',
                                detail: 'La contraseña es invalida.'
                            });
                        }
                    });
                }
                else {
                    _this.mensajesGlobales.push({
                        severity: 'error',
                        summary: 'Error:',
                        detail: 'Usuario no encontrado en la lista de usuarios de GEMMAA.'
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            this.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: "Error de conexion, compruebe que esta conectado a internet"
            });
        }
    };
    LoginService.prototype.usuarioValidado = function () {
        if (this.usuario && this.usuario.empleado)
            return true;
        else
            return false;
    };
    LoginService.prototype.emplHasAccess = function (rol) {
        if ('ADMIN' == this.usuario.empleadoAcceso) {
            return true;
        }
        else if (rol.toUpperCase() == this.usuario.empleadoAcceso) {
            return true;
        }
        else
            return false;
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, util_service_1.UtilService, seguridad_service_1.SeguridadService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map