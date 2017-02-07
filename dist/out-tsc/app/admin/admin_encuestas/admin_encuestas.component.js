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
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService } from "primeng/components/common/api";
import { UtilService } from "../../servicios/util.service";
import { EncuestaService } from "../../servicios/encuesta.service";
/**
 * Created by Jaime Carballo Diaz on 09/11/2016.
 */
export var AdminEncuestasComponent = (function () {
    function AdminEncuestasComponent(utilService, route, loginService, router, confirmationService, encuestaService) {
        this.utilService = utilService;
        this.route = route;
        this.loginService = loginService;
        this.router = router;
        this.confirmationService = confirmationService;
        this.encuestaService = encuestaService;
        this.creSeleccionado = null;
        this.display = false;
        this.displayEditarAtributo = false;
        this.listaCREDelete = [];
        //noinspection TypeScriptUnresolvedVariable
        this.msgs = [];
        this.blockPanel = false;
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
    }
    AdminEncuestasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.idEncuesta = +params['id']; // (+) converts string 'id' to a number
            _this.cargarEncuesta();
        });
    };
    AdminEncuestasComponent.prototype.cargarEncuesta = function () {
        var _this = this;
        try {
            Promise.resolve(this.encuestaService.getEncuesta(this.idEncuesta)).then(function (encuesta) { return _this.encuesta = encuesta; });
        }
        catch (e) {
        }
    };
    AdminEncuestasComponent.prototype.guardarEncuesta = function () {
        var _this = this;
        this.utilService.displayDialogo('Guardando Cambios a encuesta', 'info');
        this.blockPanel = true;
        setTimeout(function () {
            for (var _i = 0, _a = _this.encuesta.atributos; _i < _a.length; _i++) {
                var atr = _a[_i];
                _this.encuestaService.servicioEncuesta.actualizarRegistroAtributo(atr);
            }
            for (var _b = 0, _c = _this.encuesta.listaCRE; _b < _c.length; _b++) {
                var cre = _c[_b];
                if (cre.idCRE == null) {
                    _this.encuestaService.servicioEncuesta.agregarRegistroCRE(cre);
                }
                else {
                    _this.encuestaService.servicioEncuesta.actualizarRegistroCRE(cre);
                }
            }
            for (var _d = 0, _e = _this.listaCREDelete; _d < _e.length; _d++) {
                var cre = _e[_d];
                _this.encuestaService.servicioEncuesta.eliminarRegistroCRE(cre);
            }
            _this.utilService.mensajeExitoDialogo('Cambios Guardados');
        }, 100);
    };
    AdminEncuestasComponent.prototype.nuevoComportamientoReactivoEscala = function (atributo) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Confirmado', detail: 'Registro nuevo agregado.' });
        var nuevoCRE = {
            idAtributo: atributo.idAtributo, comportamiento: 'nuevo comportamiento',
            reactivo: 'nuevo reactivo',
            escala_a: 4, escala_b: 3, escala_c: 2, escala_d: 1
        };
        this.encuesta.listaCRE.push(nuevoCRE);
    };
    AdminEncuestasComponent.prototype.quitarCRE = function (idAtributo) {
        var _this = this;
        if (this.creSeleccionado != null && this.creSeleccionado.idAtributo == idAtributo) {
            this.confirmationService.confirm({
                message: 'Quieres eliminar el registro seleccionado?',
                header: 'Confirmación',
                icon: 'fa fa-trash',
                accept: function () {
                    var index = _this.encuesta.listaCRE.indexOf(_this.creSeleccionado);
                    _this.listaCREDelete.push(_this.creSeleccionado);
                    _this.encuesta.listaCRE.splice(index, 1);
                    _this.creSeleccionado = null;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'info', summary: 'Confirmado', detail: 'Registro Eliminado' });
                }
            });
        }
        else if (this.creSeleccionado == null) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Selecciona un registro a eliminar.' });
        }
        else {
            this.msgs = [];
            this.msgs.push({
                severity: 'error',
                summary: 'Error',
                detail: 'Selecciona un registro del atributo actual a eliminar.'
            });
        }
    };
    AdminEncuestasComponent.prototype.guardarCRE = function () {
        this.display = false;
    };
    AdminEncuestasComponent.prototype.agregarCRE = function (idAtributoPadre) {
        var nuevoCRE = {
            idAtributo: idAtributoPadre, comportamiento: 'nuevo comportamiento',
            reactivo: 'nuevo reactivo',
            escala_a: 4, escala_b: 3, escala_c: 2, escala_d: 1
        };
        this.encuesta.listaCRE.push(nuevoCRE);
    };
    AdminEncuestasComponent.prototype.mostrarPanelEdicion = function (idAtributo) {
        if (this.creSeleccionado != null && this.creSeleccionado.idAtributo == idAtributo)
            this.display = true;
        else {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Selecciona un registro que desees editar.' });
        }
    };
    AdminEncuestasComponent.prototype.editarAtributo = function (atributo) {
        this.atributoSeleccionado = atributo;
        this.displayEditarAtributo = true;
    };
    AdminEncuestasComponent.prototype.guardarAtributo = function () {
        this.displayEditarAtributo = false;
    };
    AdminEncuestasComponent = __decorate([
        Component({
            selector: "admin-encuestas",
            templateUrl: "./admin_encuestas.component.html",
            styles: [".descripcion {\n    border-left: solid 5px;\n    border-left-color: #204d74;\n    background-color: #14A4FF;\n    margin-top: 30px;\n    margin-bottom: 30px;\n    margin-left: 20px;\n    padding: 10px 0px 10px 0px;\n    font-style: oblique;\n}"],
            providers: [ConfirmationService, EncuestaService]
        }), 
        __metadata('design:paramtypes', [UtilService, ActivatedRoute, LoginService, Router, ConfirmationService, EncuestaService])
    ], AdminEncuestasComponent);
    return AdminEncuestasComponent;
}());
//# sourceMappingURL=C:/Users/cfe/Desktop/GEMMAA_CLI/src/app/admin/admin_encuestas/admin_encuestas.component.js.map