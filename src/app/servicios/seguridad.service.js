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
/**
 * Created by Jaime Carballo Diaz on 27/01/2017.
 */
var router_1 = require("@angular/router");
var core_1 = require('@angular/core');
var util_service_1 = require("./util.service");
var SeguridadService = (function () {
    function SeguridadService(router, utilService) {
        this.router = router;
        this.utilService = utilService;
        this.servicioSeguridadBO = webORB.bind("com.cfemex.lv.is.seguridad.BO.SeguridadBO", this.utilService.urlWebOrb, null, null);
        this.servicioUtilidadesBO = webORB.bind("com.cfemex.lv.is.seguridad.BO.UtilBO", this.utilService.urlWebOrb, null, null);
        this.servicioUtilidadesDAO = webORB.bind("com.cfemex.lv.is.seguridad.DAO.UtilDAO", this.utilService.urlWebOrb, null, null);
    }
    SeguridadService.prototype.getInfoEmpleado = function (nip) {
        return this.servicioUtilidadesDAO.getInfoEmpleado(nip, this.utilService.nombreProyecto);
    };
    SeguridadService.prototype.getInfoEmpleadoFoto = function (nip) {
        return this.servicioUtilidadesDAO.getInfoEmpleadoFoto(nip, this.utilService.nombreProyecto);
    };
    /** Checar si el empleado existe en el proyecto usando rpe. */
    SeguridadService.prototype.empleadoExisteEnProyecto = function (rpe, proyecto) {
        return this.servicioSeguridadBO.empleadoExisteEnProyecto(rpe, proyecto);
    };
    /**
     * Validar usuario
     * Primero checa si existe en el proyecto que se especifico
     * Si existe checa si tiene contraseña en la table empl y compara
     * Si no existe valida con la contraseña de la tabla usuariosrol
     */
    SeguridadService.prototype.passwordValido = function (rpe, password, proyecto) {
        return this.servicioSeguridadBO.passwordValido(rpe, password, proyecto);
    };
    SeguridadService.prototype.getUsuariosProyecto = function (proyecto) {
        return this.servicioUtilidadesBO.getUsuariosProyecto(proyecto);
    };
    SeguridadService.prototype.getUsuariosProyectoConFoto = function (proyecto) {
        return this.servicioUtilidadesBO.getUsuariosProyectoConFoto(proyecto);
    };
    SeguridadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, util_service_1.UtilService])
    ], SeguridadService);
    return SeguridadService;
}());
exports.SeguridadService = SeguridadService;
//# sourceMappingURL=seguridad.service.js.map