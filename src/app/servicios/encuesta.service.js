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
 * Created by JCDI on 07/12/2016.
 */
var core_1 = require('@angular/core');
var util_service_1 = require("./util.service");
var EncuestaService = (function () {
    function EncuestaService(utilService) {
        this.utilService = utilService;
        this.servicioEncuesta = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", environment.rutaWebORB, null, null);
    }
    EncuestaService.prototype.getEncuesta = function (idEncuesta) {
        return this.servicioEncuesta.getEncuesta(idEncuesta);
    };
    EncuestaService.prototype.getListaPonderados = function () {
        return this.servicioEncuesta.getListaPonderados();
    };
    EncuestaService.prototype.insertarPonderados = function (ponderado) {
        this.servicioEncuesta.insertarPonderados(ponderado);
    };
    EncuestaService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [util_service_1.UtilService])
    ], EncuestaService);
    return EncuestaService;
}());
exports.EncuestaService = EncuestaService;
//# sourceMappingURL=encuesta.service.js.map