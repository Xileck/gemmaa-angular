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
var AdminComponent = (function () {
    function AdminComponent(route, loginService, router, utilService) {
        this.route = route;
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.display = false;
        this.servicio = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", this.utilService.urlWebOrb, null, null);
        this.dialogo = {
            finalizo: false,
            display: false,
            msg: 'Espera un momento',
            title: 'Cargando panel de administracion de usuarios',
            timer: null,
            tipo: 'info'
        };
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        this.catalogoEncuestas = this.servicio.getCatalogoEncuestas();
    }
    AdminComponent.prototype.cargarEncuesta = function (idEncuesta) {
        this.router.navigate(['/menu_encuestas', idEncuesta]);
    };
    AdminComponent.prototype.cargarAdminUsuarios = function () {
        var _this = this;
        this.utilService.displayDialogo('Cargando panel de administracion de usuarios', 'info');
        setTimeout(function () {
            _this.utilService.reiniciarDialogo();
            _this.router.navigate(['/admin_usuarios']);
        }, 100);
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: "app-admin",
            templateUrl: "./app/admin/admin_menu.component.html",
            styles: ['li { cursor: pointer; cursor: hand; }']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, login_service_1.LoginService, router_1.Router, util_service_1.UtilService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin_menu.component.js.map