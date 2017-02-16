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
import { Router, ActivatedRoute } from "@angular/router";
import { UtilService } from "../servicios/util.service";
import { environment } from "../../environments/environment";
export var MenuAdminComponent = (function () {
    function MenuAdminComponent(route, loginService, router, utilService) {
        this.route = route;
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.display = false;
        this.servicio = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", environment.rutaWebORB, null, null);
        this.dialogo = {
            finalizo: false,
            display: false,
            msg: 'Espera un momento',
            title: 'Cargando panel de administración de usuarios',
            timer: null,
            tipo: 'info'
        };
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        this.catalogoEncuestas = this.servicio.getCatalogoEncuestas();
    }
    MenuAdminComponent.prototype.cargarEncuesta = function (idEncuesta) {
        this.router.navigate(['/menu_encuestas', idEncuesta]);
    };
    MenuAdminComponent.prototype.cargarAdminUsuarios = function () {
        var _this = this;
        this.utilService.displayDialogo('Cargando panel de administración de usuarios', 'info');
        setTimeout(function () {
            _this.utilService.reiniciarDialogo();
            _this.router.navigate(['/admin_usuarios']);
        }, 100);
    };
    MenuAdminComponent = __decorate([
        Component({
            selector: "app-admin",
            templateUrl: "./admin_menu.component.html",
            styles: ['li { cursor: pointer; cursor: hand; }']
        }), 
        __metadata('design:paramtypes', [ActivatedRoute, LoginService, Router, UtilService])
    ], MenuAdminComponent);
    return MenuAdminComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/admin/admin_menu.component.js.map