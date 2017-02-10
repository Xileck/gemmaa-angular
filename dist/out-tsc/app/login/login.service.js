var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { Usuario } from "../clases/Usuario/Usuario";
import { UtilService } from "../servicios/util.service";
import { SeguridadService } from "../servicios/seguridad.service";
import { environment } from "../../environments/environment";
export var LoginService = (function () {
    function LoginService(router, utilService, seguridadService) {
        this.router = router;
        this.utilService = utilService;
        this.seguridadService = seguridadService;
        //noinspection TypeScriptUnresolvedVariable
        this.mensajesGlobales = [];
    }
    LoginService.prototype.validarEmpleado = function (rpe, password) {
        var _this = this;
        var servicioRoles = webORB.bind("com.cfemex.lv.libs.seguridad.roles.negocio.UsuarioRolBO", environment.rutaWebORB, null, null);
        try {
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(rpe, environment.nombreProyecto)).then(function (empleadoExiste) {
                if (empleadoExiste) {
                    Promise.resolve((_this.seguridadService.passwordValido(rpe, password, environment.nombreProyecto))).then(function (passwordEsValida) {
                        if (passwordEsValida) {
                            Promise.resolve(servicioRoles.seleccionarUsuario(rpe.toUpperCase(), environment.nombreProyecto)).then(function (ResultadoPromesa) {
                                _this.mensajesGlobales = [];
                                _this.usuario = new Usuario();
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
        Injectable(), 
        __metadata('design:paramtypes', [Router, UtilService, SeguridadService])
    ], LoginService);
    return LoginService;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/login/login.service.js.map