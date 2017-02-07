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
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";
import { ReportesService } from "../servicios/reportes.service";
export var ReportesComponent = (function () {
    function ReportesComponent(loginService, router, reportesService) {
        this.loginService = loginService;
        this.router = router;
        this.reportesService = reportesService;
        if (!loginService.usuarioValidado())
            this.router.navigate(['login']);
        else {
            this.evaluaciones = [];
            this.evaluaciones = reportesService.getEvaluacionesUsuario(loginService.usuario.empleado.nip);
        }
    }
    ReportesComponent.prototype.getProgress = function (evaluacion) {
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
    ReportesComponent.prototype.progressPercent = function (countFinalized, countTotal) {
        if (countFinalized == 0)
            return 0;
        else
            return (countFinalized * 100) / countTotal;
    };
    ReportesComponent = __decorate([
        Component({
            selector: "app-reportes",
            templateUrl: "./reportes_menu.component.html",
            styles: [
                "\n            .dp\n                {\n                    border:10px solid #eee;\n                    transition: all 0.2s ease-in-out;\n                }\n            .dp:hover\n                {\n                    border:2px solid #eee;\n                    transform:rotate(360deg);\n                    -ms-transform:rotate(360deg);  \n                    -webkit-transform:rotate(360deg);  \n                    /*-webkit-font-smoothing:antialiased;*/\n                }\n            "
            ],
            providers: [ReportesService]
        }), 
        __metadata('design:paramtypes', [LoginService, Router, ReportesService])
    ], ReportesComponent);
    return ReportesComponent;
}());
//# sourceMappingURL=C:/Users/cfe/Desktop/GEMMAA_CLI/src/app/reportes/reportes_menu.component.js.map