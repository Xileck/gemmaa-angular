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
var login_service_1 = require("../../login/login.service");
var router_1 = require("@angular/router");
var util_service_1 = require("../../servicios/util.service");
var Bitacora = (function () {
    function Bitacora(loginService, router, utilService) {
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.servicioBitacora = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.BitacoraBO", environment.rutaWebORB, null, null);
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        this.registros = this.servicioBitacora.getCatalogoEncuesta();
    }
    Bitacora = __decorate([
        core_1.Component({
            selector: "app-bitacora",
            templateUrl: "app/admin/admin_encuestas/bitacora.component.html"
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router, util_service_1.UtilService])
    ], Bitacora);
    return Bitacora;
}());
exports.Bitacora = Bitacora;
//# sourceMappingURL=bitacora.component.js.map