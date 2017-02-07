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
var core_1 = require("@angular/core");
var login_service_1 = require("../login/login.service");
var router_1 = require("@angular/router");
var util_service_1 = require("../servicios/util.service");
var NavbarComponent = (function () {
    function NavbarComponent(loginService, router, utilService) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.currentPath = 'principal';
        this.isIn = false; // store state
        router.events.subscribe(function (val) {
            console.log(val.url);
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
    NavbarComponent = __decorate([
        core_1.Component({
            selector: "app-navbar",
            templateUrl: "./app/encabezado/navbar.component.html",
            styles: ['li { cursor: pointer; cursor: hand; }']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router, util_service_1.UtilService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map