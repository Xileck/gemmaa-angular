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
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";
import { UtilService } from "../servicios/util.service";
import { AdminService } from "../servicios/administracion.service";
import { EvaluacionService } from "../servicios/evaluacion.service";
import { WindowRef } from "../servicios/WindowRef";
import { DatosEvaluacion } from "../clases/DatosEvaluacion";
import { Empleado } from "../clases/Usuario/Empleado";
import { environment } from "../../environments/environment";
export var EncuestasComponent = (function () {
    function EncuestasComponent(loginService, router, utilService, adminService, evaluacionService, winRef) {
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.adminService = adminService;
        this.evaluacionService = evaluacionService;
        this.winRef = winRef;
        this.servicioEvaluacion = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EvaluacionBO", environment.rutaWebORB, null, null);
        this.servicioEmpleadoDAO = webORB.bind("com.cfemex.lv.EmpleadoDAO", environment.rutaWebORB, null, null);
        this.servicioEncuesta = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", environment.rutaWebORB, null, null);
        this.servicioUtil = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.UtilBO", environment.rutaWebORB, null, null);
        this.evaluacionesPendientes = [];
        this.evaluadosDatos = [];
        this.fadingPhase = 'end';
        if (!loginService.usuarioValidado())
            this.router.navigate(['login']);
        else {
            this.evaluacionesPendientes = this.servicioEvaluacion.evaluacionesPendientes(this.loginService.usuario.empleadoNip);
            this.win = winRef.nativeWindow;
        }
    }
    EncuestasComponent.prototype.ngOnInit = function () {
        for (var _i = 0, _a = this.evaluacionesPendientes; _i < _a.length; _i++) {
            var ev = _a[_i];
            var datosEvaluacion = new DatosEvaluacion();
            datosEvaluacion.evaluado = new Empleado();
            Object.assign(datosEvaluacion.evaluado, this.servicioEmpleadoDAO.seleccionarEmpleado(this.servicioUtil.getInfoEvaluado(ev.nip_de_evaluado).rpe));
            datosEvaluacion.encuestaId = ev.idte;
            datosEvaluacion.nombre_encuesta = ev.nombre_encuesta;
            datosEvaluacion.tipo_de_evaluador = ev.tipo_de_evaluador;
            datosEvaluacion.id_evaluacion = ev.id_evaluacion;
            datosEvaluacion.id_evaluador = ev.id_evaluador;
            datosEvaluacion.finalizo = ev.finalizo;
            this.evaluadosDatos.push(datosEvaluacion);
        }
    };
    EncuestasComponent.prototype.seleccionarEvaluado = function (evaluado) {
        var _this = this;
        if (this.evaluadoSeleccionado != evaluado) {
            this.evaluadoSeleccionado = evaluado;
            this.win.window.scrollTo(0, 0);
            this.fadingPhase = 'start';
            setTimeout(function () {
                _this.fadingPhase = 'end';
            }, 100);
        }
    };
    EncuestasComponent.prototype.iniciarEvaluacion = function () {
        var _this = this;
        Promise.resolve(this.evaluacionService.evaluadorFinalizoEncuesta(this.evaluadoSeleccionado.id_evaluador))
            .then(function (evaluacionFinalizada) {
            console.log(_this.evaluadoSeleccionado.id_evaluador);
            if (evaluacionFinalizada == false) {
                Object.assign(_this.evaluacionService.evaluacion, _this.evaluadoSeleccionado);
                _this.router.navigate(['contestar_encuesta']);
            }
            else {
                _this.utilService.mensajeExitoDialogo('La encuesta ya se contesto.');
            }
        });
    };
    EncuestasComponent = __decorate([
        Component({
            selector: "app-encuestas",
            templateUrl: "./encuestas_menu.component.html",
            styles: ["\n#foto{\nfloat: right;\n}\n.evaluado_finalizo{\nopacity: .4;\nbackground: gray;\nfont-size: 20px;\n}\n.emplSeleccionado{\n    background: #a7c9e7;\n}"],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [LoginService, Router, UtilService, AdminService, EvaluacionService, WindowRef])
    ], EncuestasComponent);
    return EncuestasComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/encuestas/encuestas_menu.component.js.map