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
 * Created by Jaime Carballo Diaz on 07/12/2016.
 */
var core_1 = require('@angular/core');
var util_service_1 = require("./util.service");
var ReportesService = (function () {
    function ReportesService(utilService) {
        this.utilService = utilService;
        this.servicioReportes = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.ReportesBO", environment.rutaWebORB, null, null);
    }
    ReportesService.prototype.getIdEvaluaciones = function (nip_usuario) {
        return this.servicioReportes.getIdEvaluaciones(nip_usuario);
    };
    ReportesService.prototype.getGrupoEvaluacion = function (id_evaluacion) {
        return this.servicioReportes.getGrupoEvaluacion(id_evaluacion);
    };
    ReportesService.prototype.getEvaluacionesUsuario = function (nip) {
        return this.servicioReportes.getEvaluacionesDeUsuario(nip);
    };
    ReportesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [util_service_1.UtilService])
    ], ReportesService);
    return ReportesService;
}());
exports.ReportesService = ReportesService;
//# sourceMappingURL=reportes.service.js.map