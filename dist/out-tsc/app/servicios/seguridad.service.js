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
import { UtilService } from "./util.service";
import { environment } from "../../environments/environment";
export var SeguridadService = (function () {
    function SeguridadService(router, utilService) {
        this.router = router;
        this.utilService = utilService;
        this.servicioSeguridadBO = webORB.bind("com.cfemex.lv.is.seguridad.BO.SeguridadBO", environment.rutaWebORB, null, null);
        this.servicioUtilidadesBO = webORB.bind("com.cfemex.lv.is.seguridad.BO.UtilBO", environment.rutaWebORB, null, null);
        this.servicioUtilidadesDAO = webORB.bind("com.cfemex.lv.is.seguridad.DAO.UtilDAO", environment.rutaWebORB, null, null);
    }
    SeguridadService.prototype.getInfoEmpleado = function (nip) {
        return this.servicioUtilidadesDAO.getInfoEmpleado(nip, environment.nombreProyecto);
    };
    SeguridadService.prototype.getInfoEmpleadoFoto = function (nip) {
        return this.servicioUtilidadesDAO.getInfoEmpleadoFoto(nip, environment.nombreProyecto);
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
        Injectable(), 
        __metadata('design:paramtypes', [Router, UtilService])
    ], SeguridadService);
    return SeguridadService;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/servicios/seguridad.service.js.map