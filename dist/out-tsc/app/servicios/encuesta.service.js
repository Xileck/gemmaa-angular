var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
export var EncuestaService = (function () {
    function EncuestaService() {
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
    EncuestaService.prototype.guardarEncuestaContestada = function (listaCRE, idEvaluador) {
        this.guardarEncuestaContestada(listaCRE, idEvaluador);
    };
    EncuestaService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], EncuestaService);
    return EncuestaService;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/servicios/encuesta.service.js.map