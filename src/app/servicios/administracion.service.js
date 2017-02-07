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
/**
 * Created by Jaime Carballo Diaz on 07/12/2016.
 */
var router_1 = require("@angular/router");
var core_1 = require('@angular/core');
var login_service_1 = require("../login/login.service");
var util_service_1 = require("./util.service");
var AdminService = (function () {
    function AdminService(router, loginService, utilService) {
        this.router = router;
        this.loginService = loginService;
        this.utilService = utilService;
        this.servicioUsuarioRol = webORB.bind("com.cfemex.lv.libs.seguridad.roles.negocio.UsuarioRolBO", this.utilService.urlWebOrb, null, null);
        this.servicioEmpleadoDAO = webORB.bind("com.cfemex.lv.EmpleadoDAO", this.utilService.urlWebOrb, null, null);
        this.servicioEncuesta = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", this.utilService.urlWebOrb, null, null);
        this.servicioEvaluacion = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EvaluacionBO", this.utilService.urlWebOrb, null, null);
    }
    //noinspection TypeScriptUnresolvedVariable
    //
    AdminService.prototype.seleccionarUsuario = function (cveusuario, nombreProyecto) {
        return this.servicioUsuarioRol.seleccionarUsuario(cveusuario.toUpperCase(), nombreProyecto);
    };
    //EmpleadoDAO
    AdminService.prototype.buscarUsuario = function (rpeInput) {
        return Promise.resolve(this.servicioEmpleadoDAO.seleccionarEmpleado(rpeInput.toString().toUpperCase()));
    };
    //EncuestaBO
    AdminService.prototype.getCatalogoEncuestas = function () {
        return this.servicioEncuesta.getCatalogoEncuestas();
    };
    AdminService.prototype.actualizarUsuarioRol = function (usuario) {
        if (usuario != null) {
            var userCascaron = {
                clave: usuario.empleado.rpe,
                claveArea: usuario.empleado.areaTrabajo.clave,
                claveProyecto: this.utilService.nombreProyecto,
                cuentaGenerica: 'N',
                empleado: { nip: usuario.empleado.nip },
                password: usuario.empleado.password != null && usuario.empleado.password > 0 ? usuario.empleadopassword : usuario.password,
                rol: { clave: usuario.rol.clave, proyecto: this.loginService.nombreProyecto }
            };
            this.servicioUsuarioRol.actulizarUsuarioRol(userCascaron);
        }
        else if (usuario.empleado == null) {
            console.error('Empelado nulo');
        }
    };
    AdminService.prototype.eliminarUsuarioRol = function (nombreProyecto, rpe) {
        this.servicioUsuarioRol.eliminarUsuarioRol(nombreProyecto, rpe);
    };
    AdminService.prototype.insertarUsuarioRol = function (empleado) {
        if (empleado != null && empleado.permiso != null) {
            var userCascaron = {
                clave: empleado.rpe,
                claveArea: empleado.areaTrabajo.clave,
                claveProyecto: this.utilService.nombreProyecto,
                cuentaGenerica: 'N',
                empleado: { nip: empleado.nip },
                password: empleado.rpe,
                rol: { clave: empleado.permiso, proyecto: this.loginService.nombreProyecto }
            };
            this.servicioUsuarioRol.insertarUsuarioRol(userCascaron);
        }
        else if (empleado == null) {
            console.error('Empleado nulo');
        }
        else if (empleado.permiso == null) {
            console.error('permiso nulo');
        }
    };
    //EvaluacionBO
    AdminService.prototype.crearEvaluacion = function (evaluacion, evaluadores) {
        this.servicioEvaluacion.crearEvaluacion(evaluacion, evaluadores);
    };
    AdminService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService, util_service_1.UtilService])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=administracion.service.js.map