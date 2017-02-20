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
import { UtilService } from "../servicios/util.service";
export var NavbarComponent = (function () {
    function NavbarComponent(loginService, router, utilService) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.currentPath = 'principal';
        this.isIn = false; // store state
        router.events.subscribe(function (val) {
            _this.currentPath = val.url;
            _this.isIn = false;
        });
    }
    NavbarComponent.prototype.toggleState = function () {
        var bool = this.isIn;
        this.isIn = bool === false ? true : false;
    };
    NavbarComponent.prototype.logout = function () {
        this.loginService.usuario = null;
        this.router.navigate(['/login']);
    };
    NavbarComponent.prototype.cargarEvaluaciones = function () {
        var _this = this;
        this.utilService.displayDialogo('Cargando evaluaciones pendientes', 'info');
        setTimeout(function () {
            _this.utilService.reiniciarDialogo();
            _this.router.navigate(['/encuestas']);
        }, 100);
    };
    NavbarComponent.prototype.cargarReportes = function () {
        var _this = this;
        this.utilService.displayDialogo('Cargando reportes', 'info');
        setTimeout(function () {
            _this.utilService.reiniciarDialogo();
            _this.router.navigate(['/reportes']);
        }, 100);
    };
    NavbarComponent = __decorate([
        Component({
            selector: "app-navbar",
            templateUrl: "./navbar.component.html",
            styles: ['li { cursor: pointer; cursor: hand; }']
        }), 
        __metadata('design:paramtypes', [LoginService, Router, UtilService])
    ], NavbarComponent);
    return NavbarComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/encabezado/navbar.component.js.map