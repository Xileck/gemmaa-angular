var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EncuestaService } from "../../../servicios/encuesta.service";
import { ReportesService } from "../../../servicios/reportes.service";
import { LoginService } from "../../../login/login.service";
export var EditarReporteComponent = (function () {
    function EditarReporteComponent(encuestaService, reportesService, loginService) {
        this.encuestaService = encuestaService;
        this.reportesService = reportesService;
        this.loginService = loginService;
        this.displayPonderadoPanel = false;
        this.salir = new EventEmitter();
        this.cargarPonderados();
    }
    EditarReporteComponent.prototype.ngOnInit = function () {
        this.grupo = this.reportesService.getGrupoEvaluacionSimple(this.idEvalucion);
    };
    EditarReporteComponent.prototype.guardarCambios = function () {
        if (this.ponderadoSeleccionado != null) {
            this.reportesService.updatePonderado(this.grupo.id_evaluacion, this.ponderadoSeleccionado.idp);
            this.salir.emit(false);
        }
        else {
            this.loginService.mensajeError('Error', 'Selecciona un ponderado.');
        }
    };
    EditarReporteComponent.prototype.cargarPonderados = function () {
        var _this = this;
        Promise.resolve(this.encuestaService.getListaPonderados())
            .then(function (ponderados) {
            _this.listaPonderados = ponderados;
            if (_this.listaPonderados) {
                _this.listaPonderadosDropdown = [];
                _this.listaPonderadosDropdown.push({
                    label: "Selecciona un ponderado",
                    value: null
                });
                for (var _i = 0, _a = _this.listaPonderados; _i < _a.length; _i++) {
                    var p = _a[_i];
                    _this.listaPonderadosDropdown.push({
                        label: "ID: " + p.idp + " | Evaluado: " + p.evaluado + " | Jefe: "
                            + p.jefe + " | Par: " + p.par + " | Colaborador: " + p.colaborador + " | Cliente: " + p.cliente,
                        value: p
                    });
                }
            }
            _this.ponderadoSeleccionado = _this.grupo.ponderados;
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], EditarReporteComponent.prototype, "idEvalucion", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], EditarReporteComponent.prototype, "salir", void 0);
    EditarReporteComponent = __decorate([
        Component({
            selector: 'app-editar-reporte',
            templateUrl: './editar-reporte.component.html',
            styleUrls: ['./editar-reporte.component.css'],
            providers: [EncuestaService]
        }), 
        __metadata('design:paramtypes', [EncuestaService, ReportesService, LoginService])
    ], EditarReporteComponent);
    return EditarReporteComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/admin/admin_reportes/editar-reporte/editar-reporte.component.js.map