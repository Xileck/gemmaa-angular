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
// Pendientes:
// cambiar minusculas a mayusculas cuando se esta escribiendo dinamicamente.
// Arreglar que el usuario puede presionar multiple veces el boton.
var login_service_1 = require("../login/login.service");
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var util_service_1 = require("../servicios/util.service");
var PrincipalComponent = (function () {
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
        core_1.Component({
            selector: 'app-principal',
            templateUrl: './app/principal/principal.component.html',
            styles: ['li { cursor: pointer; cursor: hand; }']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router, util_service_1.UtilService])
    ], PrincipalComponent);
    return PrincipalComponent;
}());
exports.PrincipalComponent = PrincipalComponent;
//# sourceMappingURL=principal.component.js.map