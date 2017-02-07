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
// Pendientes:
// cambiar minusculas a mayusculas cuando se esta escribiendo dinamicamente.
// Arreglar que el usuario puede presionar multiple veces el boton.
var util_service_1 = require("../servicios/util.service");
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_service_1 = require('./login.service');
var LoginComponent = (function () {
    function LoginComponent(loginService, router, utilService) {
        this.loginService = loginService;
        this.router = router;
        this.utilService = utilService;
        this.usuarioInput = '';
        this.contraseniaInput = '';
        if (this.loginService.usuarioValidado())
            this.router.navigate(['principal']);
        if (this.loginService.godlike) {
            this.usuarioInput = '174P6';
            this.contraseniaInput = '123';
        }
    }
    LoginComponent.prototype.soloMayusculas = function (event) {
        if (isNaN(Number(event))) {
            var inputChar = String.fromCharCode(event.charCode);
            // console.log(inputChar, e.charCode);
            if (inputChar.toUpperCase() != inputChar && this.usuarioInput.length <= 5) {
                event.preventDefault();
                this.usuarioInput += inputChar.toUpperCase();
            }
        }
    };
    LoginComponent.prototype.validarEmpleado = function (usuarioInput, contraseniaInput) {
        return this.loginService.validarEmpleado(usuarioInput, contraseniaInput);
    };
    LoginComponent.prototype.informacionCorrecta = function () {
        this.loginService.mensajesGlobales = [];
        if (this.usuarioInput.length == 5 && this.contraseniaInput.length > 0) {
            return true;
        }
        else if (this.usuarioInput.length == 0 && this.contraseniaInput.length == 0) {
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Ingrese RPE y Contraseña.'
            });
            return false;
        }
        else if (this.usuarioInput.length != 5) {
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Ingrese RPE valido.'
            });
            return false;
        }
        else if (this.contraseniaInput.length == 0) {
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Ingrese contraseña.'
            });
            return false;
        }
    };
    LoginComponent.prototype.loginBoton = function () {
        var _this = this;
        if (this.informacionCorrecta()) {
            this.utilService.displayDialogo('Validando Usuario', 'info');
            setTimeout(function () {
                _this.validarEmpleado(_this.usuarioInput, _this.contraseniaInput);
                _this.utilService.reiniciarDialogo();
            }, 100);
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-app',
            templateUrl: './app/login/login.component.html'
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router, util_service_1.UtilService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map