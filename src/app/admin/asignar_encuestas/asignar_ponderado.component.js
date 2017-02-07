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
var Ponderados_1 = require("../../clases/Reportes/Ponderados");
var encuesta_service_1 = require("../../servicios/encuesta.service");
var AsignarPonderadoComponent = (function () {
    function AsignarPonderadoComponent(encuestaService) {
        this.encuestaService = encuestaService;
        this.displayPonderadoPanel = false;
        this.blockedDocument = false;
        this.cargarPonderados();
    }
    AsignarPonderadoComponent.prototype.cargarPonderados = function () {
        var _this = this;
        Promise.resolve(this.encuestaService.getListaPonderados())
            .then(function (ponderados) {
            _this.listaPonderados = ponderados;
            if (_this.listaPonderados) {
                _this.listaPonderadosDropdown = [];
                for (var _i = 0, _a = _this.listaPonderados; _i < _a.length; _i++) {
                    var p = _a[_i];
                    _this.listaPonderadosDropdown.push({
                        label: "ID: " + p.idp + " | Evaluado: " + p.evaluado + " | Jefe: "
                            + p.jefe + " | Par: " + p.par + " | Colaborador: " + p.colaborador + " | Cliente: " + p.cliente,
                        value: '' + p.idp
                    });
                }
            }
        });
    };
    Object.defineProperty(AsignarPonderadoComponent.prototype, "ponderadoTotal", {
        get: function () {
            return this.totalDePonderado(this.nuevoPonderado);
        },
        set: function (value) {
            this._ponderadoTotal = value;
        },
        enumerable: true,
        configurable: true
    });
    AsignarPonderadoComponent.prototype.nuevoPonderadoModal = function () {
        this.nuevoPonderado = new Ponderados_1.Ponderados();
        this.displayPonderadoPanel = true;
    };
    AsignarPonderadoComponent.prototype.agregarPonderado = function () {
        var _this = this;
        if (this.ponderadoEsValido(this.nuevoPonderado)) {
            Promise.resolve(this.encuestaService.insertarPonderados(this.nuevoPonderado))
                .then(function (o) {
                _this.nuevoPonderado = new Ponderados_1.Ponderados();
                _this.cerrarModalPonderado();
                _this.cargarPonderados();
            });
        }
        else if (this.ponderadoTotal != 100) {
            this.msgsBuscarPonderado = [];
            this.msgsBuscarPonderado.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'El valor total debe sumar 100.'
            });
        }
        else {
            this.msgsBuscarPonderado = [];
            this.msgsBuscarPonderado.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Debes poner un valor en todos los campos (solo cliente es opcional).'
            });
        }
    };
    AsignarPonderadoComponent.prototype._keyPress = function (event) {
        var pattern = /[0-9]/;
        var inputChar = String.fromCharCode(event.charCode);
        // console.log(inputChar, e.charCode);
        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    };
    AsignarPonderadoComponent.prototype.totalDePonderado = function (ponderado) {
        var total = 0;
        if (ponderado.evaluado != null && ponderado.evaluado > 0) {
            total += Number(ponderado.evaluado);
        }
        if (ponderado.par != null && ponderado.par > 0) {
            total += Number(ponderado.par);
        }
        if (ponderado.colaborador != null && ponderado.colaborador > 0) {
            total += Number(ponderado.colaborador);
        }
        if (ponderado.cliente != null && ponderado.cliente > 0) {
            total += Number(ponderado.cliente);
        }
        if (ponderado.jefe != null && ponderado.jefe > 0) {
            total += Number(ponderado.jefe);
        }
        return total;
    };
    AsignarPonderadoComponent.prototype.ponderadoEsValido = function (ponderado) {
        if (ponderado.evaluado == null || (ponderado.evaluado != null && ponderado.evaluado <= 0))
            return false;
        else if (ponderado.par == null || (ponderado.par != null && ponderado.par <= 0))
            return false;
        else if (ponderado.colaborador == null || (ponderado.colaborador != null && ponderado.colaborador <= 0))
            return false;
        else if (ponderado.jefe == null || (ponderado.jefe != null && ponderado.jefe <= 0))
            return false;
        else if (this.ponderadoTotal == 100)
            return true;
    };
    AsignarPonderadoComponent.prototype.cerrarModalPonderado = function () {
        this.displayPonderadoPanel = false;
    };
    AsignarPonderadoComponent = __decorate([
        core_1.Component({
            selector: "app-asignar-ponderado",
            templateUrl: "app/admin/asignar_encuestas/asignar_encuestas.component.html",
            styleUrls: ['app/admin/asignar_encuestas/asignar_encuestas.component.css'],
            providers: [encuesta_service_1.EncuestaService]
        }), 
        __metadata('design:paramtypes', [encuesta_service_1.EncuestaService])
    ], AsignarPonderadoComponent);
    return AsignarPonderadoComponent;
}());
exports.AsignarPonderadoComponent = AsignarPonderadoComponent;
//# sourceMappingURL=asignar_ponderado.component.js.map