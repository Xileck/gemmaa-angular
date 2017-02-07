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
var util_service_1 = require("../servicios/util.service");
var core_1 = require("@angular/core");
var login_service_1 = require("../login/login.service");
var router_1 = require("@angular/router");
var EncabezadoComponent = (function () {
    function EncabezadoComponent(loginService, router, utilService) {
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.isCollapsed = true;
    }
    EncabezadoComponent.prototype.logout = function () {
        this.loginService.usuario = null;
        this.router.navigate(['/login']);
    };
    EncabezadoComponent.prototype.cargarEvaluaciones = function () {
        var _this = this;
        this.utilService.displayDialogo('Cargando evaluaciones pendientes', 'info');
        setTimeout(function () {
            _this.utilService.reiniciarDialogo();
            _this.router.navigate(['/encuestas']);
        }, 100);
    };
    EncabezadoComponent = __decorate([
        core_1.Component({
            selector: "app-encabezado",
            templateUrl: "./app/encabezado/encabezado.component.html",
            styles: ["\n                li { cursor: pointer; cursor: hand; }\n                            #left{float:left;display:inline-block;}\n                            #right{float:right;display:inline-block;}\n                            #center{margin:0 auto;}\n                            h5{\n                    margin:0;\n                    padding:0;\n                }\n                h6{\n                    margin:0;\n                    padding:0;\n                }\n                body{padding-top:30px;}\n                \n                    .glyphicon {  margin-bottom: 10px;margin-right: 10px;}\n                \n                small {\n                    display: block;\n                    line-height: 1.428571429;\n                \n                color: #999;\n                } "]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router, util_service_1.UtilService])
    ], EncabezadoComponent);
    return EncabezadoComponent;
}());
exports.EncabezadoComponent = EncabezadoComponent;
//# sourceMappingURL=encabezado.component.js.map