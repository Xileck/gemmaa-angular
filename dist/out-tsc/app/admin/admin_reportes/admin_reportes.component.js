var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UtilService } from "../../servicios/util.service";
import { LoginService } from "../../login/login.service";
import { ReportesService } from "../../servicios/reportes.service";
import { environment } from "../../../environments/environment";
export var AdminReportesComponent = (function () {
    function AdminReportesComponent(loginService, router, reportesService, utilService) {
        this.loginService = loginService;
        this.router = router;
        this.reportesService = reportesService;
        this.utilService = utilService;
        this.gruposEvaluacion = null;
        this.buscando = false;
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        this.modoDios = environment.modoDios;
    }
    AdminReportesComponent.prototype.buscarEvaluaciones = function () {
        var _this = this;
        this.buscando = true;
        document.body.style.cursor = 'wait';
        this.gruposEvaluacion = null;
        setTimeout(function () {
            _this.reportesService.getGruposEvaluacionEmpleado(_this.busquedaInput).then(function (grupos) {
                if (grupos.length > 0)
                    _this.gruposEvaluacion = grupos;
                else
                    _this.gruposEvaluacion = null;
                _this.buscando = false;
                document.body.style.cursor = 'auto';
            }), 100;
        });
    };
    AdminReportesComponent.prototype.getNombreTipoEvaluador = function (grupo, tipo) {
        for (var _i = 0, _a = grupo.evaluadores; _i < _a.length; _i++) {
            var evaluador = _a[_i];
            if (evaluador.tipo_de_evaluador.toUpperCase().indexOf(tipo) >= 0) {
                return evaluador.nombre_completo;
            }
        }
        return null;
    };
    AdminReportesComponent.prototype.getProgress = function (evaluacion) {
        var countFinalized = 0;
        var countTotal = 0;
        for (var _i = 0, _a = evaluacion.evaluadores; _i < _a.length; _i++) {
            var e = _a[_i];
            countTotal++;
            if (e.finalizo != null && e.finalizo == 't') {
                countFinalized++;
            }
        }
        return this.progressPercent(countFinalized, countTotal);
    };
    AdminReportesComponent.prototype.progressPercent = function (countFinalized, countTotal) {
        if (countFinalized == 0)
            return 0;
        else
            return (countFinalized * 100) / countTotal;
    };
    AdminReportesComponent = __decorate([
        Component({
            selector: "app-admin-reportes",
            templateUrl: "./admin_reportes.component.html",
            styleUrls: ["./admin_reportes.component.css"],
            providers: [ReportesService, UtilService]
        }), 
        __metadata('design:paramtypes', [LoginService, Router, ReportesService, UtilService])
    ], AdminReportesComponent);
    return AdminReportesComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/admin/admin_reportes/admin_reportes.component.js.map