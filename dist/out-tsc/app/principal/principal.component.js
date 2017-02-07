var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LoginService } from "../login/login.service";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UtilService } from "../servicios/util.service";
export var PrincipalComponent = (function () {
    function PrincipalComponent(loginService, router, utilService) {
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        if (!loginService.usuarioValidado())
            this.router.navigate(['login']);
    }
    PrincipalComponent.prototype.cargarEvaluaciones = function () {
        var _this = this;
        this.utilService.displayDialogo('Cargando evaluaciones pendientes', 'info');
        setTimeout(function () {
            _this.utilService.reiniciarDialogo();
            _this.router.navigate(['/encuestas']);
        }, 100);
    };
    PrincipalComponent = __decorate([
        Component({
            selector: 'app-principal',
            templateUrl: './principal.component.html',
            styles: ['li { cursor: pointer; cursor: hand; }']
        }), 
        __metadata('design:paramtypes', [LoginService, Router, UtilService])
    ], PrincipalComponent);
    return PrincipalComponent;
}());
//# sourceMappingURL=C:/Users/cfe/Desktop/GEMMAA_CLI/src/app/principal/principal.component.js.map