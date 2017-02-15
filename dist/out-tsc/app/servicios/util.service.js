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
import { environment } from "../../environments/environment";
export var UtilService = (function () {
    function UtilService(router) {
        this.router = router;
        this.servicio = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.UtilBO", environment.rutaWebORB, null, null);
        this.servicioEmpleadoDAO = webORB.bind("com.cfemex.lv.EmpleadoDAO", environment.rutaWebORB, null, null);
        this.servicioIntra = webORB.bind("com.cfemex.lv.is.apps.intranet.EmplDAO", environment.rutaWebORB, null, null);
        this.app_dialogo_argumentos = {
            finalizo: false,
            display: false,
            msg: "Espera un momento",
            title: 'Aguarda un momento',
            timer: null,
            tipo: 'info'
        };
    }
    //EmpleadoDAO
    UtilService.prototype.buscarEmpleado = function (rpeInput) {
        return this.servicioEmpleadoDAO.seleccionarEmpleado(rpeInput.toString().toUpperCase());
    };
    UtilService.prototype.buscarEmpleados = function (empleado) {
        return this.servicioIntra.buscaEmpleados(empleado.toUpperCase());
    };
    UtilService.prototype.getNombreCompleto = function (nip) {
        return this.servicio.getNombreCompleto(nip);
    };
    UtilService.prototype.convertArrayBytesToBase64 = function (byte) {
        var binary = '';
        var bytes = new Uint8Array(byte);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    UtilService.prototype.reiniciarDialogo = function () {
        this.app_dialogo_argumentos = {
            finalizo: false,
            display: false,
            msg: 'Espera un momento',
            title: 'Aguarda un momento',
            timer: null,
            tipo: 'info'
        };
        document.body.style.cursor = 'auto';
    };
    UtilService.prototype.getRpeDeNip = function (nip) {
        return this.servicio.getRpeDeNip(nip);
    };
    UtilService.prototype.displayDialogo = function (message, tipo) {
        this.app_dialogo_argumentos.display = true;
        this.app_dialogo_argumentos.msg = message;
        this.app_dialogo_argumentos.tipo = tipo;
        document.body.style.cursor = 'wait';
    };
    UtilService.prototype.mensajeExitoDialogo = function (message) {
        this.app_dialogo_argumentos.tipo = 'info';
        this.app_dialogo_argumentos.finalizo = true;
        this.app_dialogo_argumentos.msg = message;
        document.body.style.cursor = 'auto';
    };
    UtilService.prototype.dialogoHide = function () {
        this.app_dialogo_argumentos.display = false;
    };
    UtilService.prototype.dialogoShow = function () {
        this.app_dialogo_argumentos.display = true;
    };
    UtilService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Router])
    ], UtilService);
    return UtilService;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/servicios/util.service.js.map