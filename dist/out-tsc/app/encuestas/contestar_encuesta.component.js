var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../login/login.service";
import { EvaluacionService } from "../servicios/evaluacion.service";
import { UtilService } from "../servicios/util.service";
import { DatosEvaluacion } from "../clases/DatosEvaluacion";
import { environment } from "../../environments/environment";
import { EncuestaService } from "../servicios/encuesta.service";
export var ContestarEncuestaComponent = (function () {
    function ContestarEncuestaComponent(router, loginService, evaluacionService, utilService, encuestaService) {
        this.router = router;
        this.loginService = loginService;
        this.evaluacionService = evaluacionService;
        this.utilService = utilService;
        this.encuestaService = encuestaService;
        this.environment = environment;
        this.activeIndex = 0;
        this.evaluacionSeleccionada = new DatosEvaluacion();
        this.aceptoInstrucciones = false;
        this.currentTime = new Date();
        this.blockedDocument = false;
        this.servicioEncuesta = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", environment.rutaWebORB, null, null);
        if (!loginService.usuarioValidado())
            this.router.navigate(['principal']);
    }
    ContestarEncuestaComponent.prototype.ngOnInit = function () {
        if (this.evaluacionService.evaluacion != null)
            this.encuesta = this.encuestaService.getEncuesta(this.evaluacionService.evaluacion.encuestaId);
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
            this.loginService.mensajeError('Error', 'Responde todas las preguntas de esta pagina antes de continuar.');
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
                this.loginService.mensajeError('Error', 'Responde todas las preguntas de esta pagina antes de continuar.');
                return;
            }
        }
        if (this.aceptoInstrucciones && this.checkIfCurrentPageIsAnswered()) {
            try {
                this.utilService.displayDialogo('Guardando Evaluacion', 'info');
                setTimeout(function () {
                    Promise.resolve(_this.evaluacionService.evaluadorFinalizoEncuesta(_this.evaluacionService.evaluacion.id_evaluador))
                        .then(function (evaluacionFinalizada) {
                        _this.evaluacionService.checarSiGrupoEvaluacionTermino(_this.evaluacionService.evaluacion.id_evaluacion);
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
        Component({
            selector: "app-contestar-encuesta",
            templateUrl: "./contestar_encuesta.component.html",
            styleUrls: ['./contestar_encuesta.component.css'],
            encapsulation: ViewEncapsulation.None,
            providers: [EncuestaService]
        }), 
        __metadata('design:paramtypes', [Router, LoginService, EvaluacionService, UtilService, EncuestaService])
    ], ContestarEncuestaComponent);
    return ContestarEncuestaComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/encuestas/contestar_encuesta.component.js.map