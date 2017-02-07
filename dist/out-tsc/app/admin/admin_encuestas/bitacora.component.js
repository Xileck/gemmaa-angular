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
import { LoginService } from "../../login/login.service";
import { Router } from "@angular/router";
import { UtilService } from "../../servicios/util.service";
export var BitacoraComponent = (function () {
    function BitacoraComponent(loginService, router, utilService) {
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.servicioBitacora = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.BitacoraBO", this.utilService.urlWebOrb, null, null);
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        this.registros = this.servicioBitacora.getCatalogoEncuesta();
    }
    BitacoraComponent = __decorate([
        Component({
            selector: "app-bitacora",
            templateUrl: "./bitacora.component.html"
        }), 
        __metadata('design:paramtypes', [LoginService, Router, UtilService])
    ], BitacoraComponent);
    return BitacoraComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/admin/admin_encuestas/bitacora.component.js.map