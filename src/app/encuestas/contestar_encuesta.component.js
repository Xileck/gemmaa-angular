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
var router_1 = require("@angular/router");
var login_service_1 = require("../login/login.service");
var evaluacion_service_1 = require("../servicios/evaluacion.service");
var util_service_1 = require("../servicios/util.service");
var DatosEvaluacion_1 = require("../clases/DatosEvaluacion");
var ContestarEncuestaComponent = (function () {
    function ContestarEncuestaComponent(router, loginService, evaluacionService, utilService) {
        this.router = router;
        this.loginService = loginService;
        this.evaluacionService = evaluacionService;
        this.utilService = utilService;
        this.servicioEncuesta = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", environment.rutaWebORB, null, null);
        this.activeIndex = 0;
        this.evaluacionSeleccionada = new DatosEvaluacion_1.DatosEvaluacion();
        this.aceptoInstrucciones = false;
        this.currentTime = new Date();
        this.blockedDocument = false;
        if (!loginService.usuarioValidado())
            this.router.navigate(['principal']);
    }
    ContestarEncuestaComponent.prototype.ngOnInit = function () {
        if (this.evaluacionService.evaluacion != null)
            this.encuesta = this.servicioEncuesta.getEncuesta(this.evaluacionService.evaluacion.encuestaId);
        else
            this.router.navigate(['login']);
        this.items = [];
        for (var _i = 0, _a = this.encuesta.resultados_esperados; _i < _a.length; _i++) {
            var re = _a[_i];
            this.items.push({ label: re.descripcion });
        }
        Object.assign(this.evaluacionSeleccionada, this.evaluacionService.evaluacion);
        for (var _b = 0, _c = this.encuesta.listaCRE; _b < _c.length; _b++) {
            var cre = _c[_b];
            cre.contestado = null;
        }
    };
    ContestarEncuestaComponent.prototype.checkIfCurrentPageIsAnswered = function () {
        var correct = true;
        for (var _i = 0, _a = this.encuesta.atributos; _i < _a.length; _i++) {
            var atr = _a[_i];
            if (atr.idResultadoEsperado == this.encuesta.resultados_esperados[this.activeIndex].idResultadoEsperado) {
                for (var _b = 0, _c = this.encuesta.listaCRE; _b < _c.length; _b++) {
                    var cre = _c[_b];
                    if (cre.idAtributo == atr.idAtributo && cre.respuesta == null) {
                        cre.contestado = false;
                        correct = false;
                    }
                }
            }
        }
        return correct;
    };
    ContestarEncuestaComponent.prototype.siguientePagina = function () {
        if (this.activeIndex < this.items.length - 1 && this.checkIfCurrentPageIsAnswered()) {
            this.activeIndex += 1;
            scroll(0, 0);
        }
        else {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error',
                detail: 'Responde todas las preguntas de esta pagina antes de continuar.'
            });
        }
    };
    ContestarEncuestaComponent.prototype.botonMagico = function () {
        for (var _i = 0, _a = this.encuesta.listaCRE; _i < _a.length; _i++) {
            var cre = _a[_i];
            var rand = Math.floor((Math.random() * 4) + 1);
            if (rand == 4)
                cre.respuesta = 'A';
            else if (rand == 3)
                cre.respuesta = 'B';
            else if (rand == 2)
                cre.respuesta = 'C';
            else if (rand == 1)
                cre.respuesta = 'D';
            cre.contestado = true;
        }
        this.activeIndex = this.items.length - 1;
    };
    ContestarEncuestaComponent.prototype.anteriorPagina = function () {
        if (this.activeIndex > 0) {
            this.activeIndex -= 1;
            scroll(0, 0);
        }
    };
    ContestarEncuestaComponent.prototype.respuestaContestada = function (cre) {
        if (cre.respuesta != null)
            cre.contestado = true;
    };
    ContestarEncuestaComponent.prototype.terminarEvaluacion = function () {
        var _this = this;
        for (var _i = 0, _a = this.encuesta.listaCRE; _i < _a.length; _i++) {
            var cre = _a[_i];
            if (cre.respuesta == null) {
                this.loginService.mensajesGlobales = [];
                this.loginService.mensajesGlobales.push({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Responde todas las preguntas de esta pagina antes de continuar.'
                });
                return;
            }
        }
        if (this.aceptoInstrucciones && this.checkIfCurrentPageIsAnswered()) {
            try {
                this.utilService.displayDialogo('Guardando Evaluacion', 'info');
                setTimeout(function () {
                    Promise.resolve(_this.evaluacionService.evaluadorFinalizoEncuesta(_this.evaluacionService.evaluacion.id_evaluador))
                        .then(function (evaluacionFinalizada) {
                        if (evaluacionFinalizada == false) {
                            _this.servicioEncuesta.guardarEncuestaContestada(_this.encuesta.listaCRE, _this.evaluacionSeleccionada.id_evaluador);
                            _this.utilService.mensajeExitoDialogo('Evaluacion guardada.');
                        }
                        else {
                            _this.utilService.mensajeExitoDialogo('La encuesta ya habia sido contestada.');
                        }
                    });
                }, 100);
            }
            catch (e) {
                alert(JSON.stringify(e));
            }
        }
    };
    ContestarEncuestaComponent = __decorate([
        core_1.Component({
            selector: "app-prueba",
            templateUrl: "./app/encuestas/contestar_encuesta.component.html",
            styleUrls: ['./app/encuestas/contestar_encuesta.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService, evaluacion_service_1.EvaluacionService, util_service_1.UtilService])
    ], ContestarEncuestaComponent);
    return ContestarEncuestaComponent;
}());
exports.ContestarEncuestaComponent = ContestarEncuestaComponent;
/**
 * Created by Jaime Carballo Diaz on 20/12/2016.
 */
//# sourceMappingURL=contestar_encuesta.component.js.map