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
var login_service_1 = require("../../login/login.service");
var api_1 = require("primeng/components/common/api");
var Evaluacion_1 = require("../../clases/Evaluacion");
var administracion_service_1 = require("../../servicios/administracion.service");
var util_service_1 = require("../../servicios/util.service");
var router_1 = require("@angular/router");
var Empleado_1 = require("../../clases/Usuario/Empleado");
var AsignarEvaluador_1 = require("../../clases/AsignarEvaluador");
var seguridad_service_1 = require("../../servicios/seguridad.service");
var Ponderados_1 = require("../../clases/Reportes/Ponderados");
var encuesta_service_1 = require("../../servicios/encuesta.service");
var AsignarEncuestasComponent = (function () {
    function AsignarEncuestasComponent(loginService, adminService, confirmationService, utilService, router, seguridadService, encuestaService) {
        this.loginService = loginService;
        this.adminService = adminService;
        this.confirmationService = confirmationService;
        this.utilService = utilService;
        this.router = router;
        this.seguridadService = seguridadService;
        this.encuestaService = encuestaService;
        this.msgsBuscar = [];
        this.displayPonderadoPanel = false;
        this.evaluacionGuardada = false;
        this.focus = false;
        this.encuestaSeleccionada = null;
        this.blockedDocument = false;
        //Lista de evaluadores
        this.evaluadores = [];
        this.busquedaInput = '';
        this.busqueda = [];
        if (!loginService.usuarioValidado() || !loginService.emplHasAccess('admin'))
            if (!loginService.godlike)
                this.router.navigate(['login']);
        this.rolesPermisoUsuario = [];
        this.rolesPermisoUsuario.push({ label: 'Selecciona el permiso.', value: null });
        this.rolesPermisoUsuario.push({ label: 'Evaluador', value: 'EVAL' });
        this.rolesPermisoUsuario.push({ label: 'Jefe', value: 'JEFE' });
        this.rolesEvaluadores = [];
        this.rolesEvaluadores.push({ label: 'Selecciona el rol.', value: null });
        this.rolesEvaluadores.push({ label: 'Evaluado', value: 'EVALUADO' });
        this.rolesEvaluadores.push({ label: 'Jefe', value: 'JEFE' });
        this.rolesEvaluadores.push({ label: 'Par', value: 'PAR' });
        this.rolesEvaluadores.push({ label: 'Cliente', value: 'CLIENTE' });
        this.rolesEvaluadores.push({ label: 'Colaborador', value: 'COLABORADOR' });
        this.catalogoEncuestas = this.adminService.getCatalogoEncuestas();
        this.cargarPonderados();
    }
    AsignarEncuestasComponent.prototype.cargarPonderados = function () {
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
                        value: '' + p.idp
                    });
                }
            }
        });
    };
    AsignarEncuestasComponent.prototype.recargarPonderados = function () {
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
                        value: '' + p.idp
                    });
                    _this.ponderadoSeleccionado = p.idp;
                }
            }
        });
    };
    Object.defineProperty(AsignarEncuestasComponent.prototype, "ponderadoTotal", {
        get: function () {
            return this.totalDePonderado(this.nuevoPonderado);
        },
        set: function (value) {
            this._ponderadoTotal = value;
        },
        enumerable: true,
        configurable: true
    });
    AsignarEncuestasComponent.prototype.cerrarModal = function () {
        this.selectedRolEvaluador = null;
        this.busqueda = null;
        this.busquedaInput = '';
        this.empleadoSeleccionado = null;
    };
    AsignarEncuestasComponent.prototype.nuevoPonderadoModal = function () {
        this.nuevoPonderado = new Ponderados_1.Ponderados();
        this.displayPonderadoPanel = true;
    };
    AsignarEncuestasComponent.prototype.agregarPonderado = function () {
        var _this = this;
        if (this.ponderadoEsValido(this.nuevoPonderado)) {
            Promise.resolve(this.encuestaService.insertarPonderados(this.nuevoPonderado))
                .then(function (o) {
                _this.nuevoPonderado = new Ponderados_1.Ponderados();
                _this.cerrarModalPonderado();
                _this.recargarPonderados();
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
    AsignarEncuestasComponent.prototype._keyPress = function (event) {
        var pattern = /[0-9]/;
        var inputChar = String.fromCharCode(event.charCode);
        // console.log(inputChar, e.charCode);
        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    };
    AsignarEncuestasComponent.prototype.totalDePonderado = function (ponderado) {
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
    AsignarEncuestasComponent.prototype.ponderadoEsValido = function (ponderado) {
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
    AsignarEncuestasComponent.prototype.buscarEmpleado = function (referencia, rol) {
        var _this = this;
        this.msgsBuscar = [];
        if (referencia == null) {
            this.empleado_a_Buscar = referencia;
            this.selectedRolEvaluador = rol;
            setTimeout(function () {
                if (_this.inputRef && _this.inputRef.nativeElement)
                    _this.inputRef.nativeElement.focus();
            }, 10);
        }
    };
    AsignarEncuestasComponent.prototype.ngAfterViewInit = function () {
        if (this.inputRef && this.inputRef.first)
            this.inputRef.first.nativeElement.focus();
    };
    AsignarEncuestasComponent.prototype.cancelarBusqueda = function () {
        var _this = this;
        this.msgsBuscar = [];
        this.empleadoSeleccionado = null;
        this.busqueda = null;
        this.busquedaInput = null;
        setTimeout(function () {
            if (_this.inputRef && _this.inputRef.nativeElement)
                _this.inputRef.nativeElement.focus();
        }, 10);
    };
    ;
    AsignarEncuestasComponent.prototype.eliminarUsuario = function (nombre_eval) {
        var _this = this;
        setTimeout(function () {
            if ('EVALUADO' == nombre_eval) {
                _this.evaluado = null;
            }
            else if ('PAR' == nombre_eval) {
                _this.par = null;
            }
            else if ('CLIENTE' == nombre_eval) {
                _this.cliente = null;
            }
            else if ('COLABORADOR' == nombre_eval) {
                _this.colaborador = null;
            }
            else if ('JEFE' == nombre_eval) {
                _this.jefe = null;
            }
            for (var i = 0; i < _this.evaluadores.length; i++) {
                if (_this.evaluadores[i].tipo_de_evaluador == nombre_eval) {
                    _this.evaluadores.splice(i, 1);
                    break;
                }
            }
        }, 100);
    };
    AsignarEncuestasComponent.prototype.confirmarGuardarEvaluacion = function () {
        var _this = this;
        if (this.checarSiEvaluadosEstanAsignados() == null && this.encuestaSeleccionada != null && this.ponderadoSeleccionado != null) {
            this.confirmationService.confirm({
                message: 'Estas seguro que los datos son los correctos?',
                accept: function () {
                    _this.guardarEvaluacion();
                }
            });
        }
        else if (this.encuestaSeleccionada == null) {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Necesitas seleccionar una encuesta.'
            });
        }
        else if (this.ponderadoSeleccionado == null) {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Necesitas seleccionar o crear un ponderado.'
            });
        }
        else {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Necesitas seleccionar : ' + this.checarSiEvaluadosEstanAsignados() + '.'
            });
        }
    };
    AsignarEncuestasComponent.prototype.buscarEmpleados = function () {
        var _this = this;
        this.msgsBuscar = [];
        this.blockedDocument = true;
        var t0 = performance.now();
        setTimeout(function () {
            if (_this.busquedaInput != null && _this.busquedaInput.length > 3)
                Promise.resolve(_this.utilService.buscarEmpleados(_this.busquedaInput)).then(function (result) {
                    _this.busqueda = result;
                    var t1 = performance.now();
                    console.log("Funcion buscarEmpleados('" + _this.busquedaInput + "') tardo " + Math.round(t1 - t0) + " milisegundos.");
                });
            else if (_this.busquedaInput != null && _this.busquedaInput.length <= 3) {
                _this.msgsBuscar.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Ingresa al menos 4 caracteres.'
                });
            }
            else {
                _this.msgsBuscar.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Ingresa un nombre o rpe a buscar.'
                });
            }
            _this.blockedDocument = false;
        }, 100);
    };
    AsignarEncuestasComponent.prototype.seleccionarEmpleado = function (rpe) {
        var _this = this;
        this.msgsBuscar = [];
        if (this.checarEmpleadoEstaAgregado(rpe) != null) {
            this.msgsBuscar.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'El empleado ya esta agregado como ' + this.checarEmpleadoEstaAgregado(rpe) + '.'
            });
            return;
        }
        else {
            this.blockedDocument = true;
            document.body.style.cursor = 'wait';
            setTimeout(function () {
                Promise.resolve(_this.utilService.buscarEmpleado(rpe)).then(function (emp) {
                    _this.empleadoSeleccionado = new Empleado_1.Empleado();
                    Object.assign(_this.empleadoSeleccionado, emp);
                    _this.blockedDocument = false;
                    document.body.style.cursor = 'auto';
                });
            }, 100);
        }
    };
    AsignarEncuestasComponent.prototype.cerrarModalPonderado = function () {
        this.displayPonderadoPanel = false;
        this.msgsBuscarPonderado = [];
    };
    AsignarEncuestasComponent.prototype.checarSiEvaluadosEstanAsignados = function () {
        var roles = [];
        if (this.jefe == null) {
            roles.push('jefe');
        }
        if (this.par == null) {
            roles.push('par');
        }
        if (this.colaborador == null) {
            roles.push('colaborador');
        }
        if (this.evaluado == null) {
            roles.push('evaluado');
        }
        if (this.cliente == null) {
            roles.push('cliente');
        }
        if (roles.length == 0)
            return null;
        else if (roles.length == 1)
            return roles[0];
        else {
            var result = '';
            for (var i = 0; i <= roles.length - 1; i++) {
                if (i == roles.length - 1)
                    result += ' ' + roles[i];
                else
                    result += ' ' + roles[i] + ',';
            }
            return result;
        }
    };
    AsignarEncuestasComponent.prototype.checarEmpleadoEstaAgregado = function (rpe) {
        if (this.jefe != null && rpe == this.jefe.rpe) {
            return 'jefe';
        }
        else if (this.par != null && rpe == this.par.rpe) {
            return 'par';
        }
        else if (this.colaborador != null && rpe == this.colaborador.rpe) {
            return 'colaborador';
        }
        else if (this.evaluado != null && rpe == this.evaluado.rpe) {
            return 'evaluado';
        }
        else if (this.cliente != null && rpe == this.cliente.rpe) {
            return 'cliente';
        }
        else
            return null;
    };
    AsignarEncuestasComponent.prototype.checarSiRolYaEstaAsignado = function (selectedRolEvaluador) {
        if (selectedRolEvaluador == null)
            return null;
        if (this.jefe != null && selectedRolEvaluador == 'JEFE') {
            return 'jefe';
        }
        else if (this.par != null && selectedRolEvaluador == 'PAR') {
            return 'par';
        }
        else if (this.colaborador != null && selectedRolEvaluador == 'COLABORADOR') {
            return 'colaborador';
        }
        else if (this.evaluado != null && selectedRolEvaluador == 'EVALUADO') {
            return 'evaluado';
        }
        else if (this.cliente != null && selectedRolEvaluador == 'CLIENTE') {
            return 'cliente';
        }
        else
            return null;
    };
    AsignarEncuestasComponent.prototype.agregarEvaluador = function () {
        if (this.checarSiRolYaEstaAsignado(this.selectedRolEvaluador) != null) {
            this.msgsBuscar = [];
            this.msgsBuscar.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'El rol de ' + this.checarSiRolYaEstaAsignado(this.selectedRolEvaluador) + 'ya esta asignado.'
            });
            return;
        }
        if (this.selectedRolEvaluador != null && this.selectedPermisoUsuario != null) {
            var evaluador = new AsignarEvaluador_1.AsignarEvaluador(this.empleadoSeleccionado.nip, "", 'F', this.selectedPermisoUsuario);
            if (this.selectedRolEvaluador == 'JEFE') {
                evaluador.tipo_de_evaluador = 'JEFE';
                this.jefe = new Empleado_1.Empleado();
                Object.assign(this.jefe, this.empleadoSeleccionado);
                this.jefe.permiso = this.selectedPermisoUsuario;
            }
            else if (this.selectedRolEvaluador == 'PAR') {
                evaluador.tipo_de_evaluador = "PAR";
                this.par = new Empleado_1.Empleado();
                Object.assign(this.par, this.empleadoSeleccionado);
                this.par.permiso = this.selectedPermisoUsuario;
            }
            else if (this.selectedRolEvaluador == 'EVALUADO') {
                evaluador.tipo_de_evaluador = "EVALUADO";
                this.evaluado = new Empleado_1.Empleado();
                Object.assign(this.evaluado, this.empleadoSeleccionado);
                this.evaluado.permiso = this.selectedPermisoUsuario;
            }
            else if (this.selectedRolEvaluador == 'COLABORADOR') {
                evaluador.tipo_de_evaluador = "COLABORADOR";
                this.colaborador = new Empleado_1.Empleado();
                Object.assign(this.colaborador, this.empleadoSeleccionado);
                this.colaborador.permiso = this.selectedPermisoUsuario;
            }
            else if (this.selectedRolEvaluador == 'CLIENTE') {
                evaluador.tipo_de_evaluador = "CLIENTE";
                this.cliente = new Empleado_1.Empleado();
                Object.assign(this.cliente, this.empleadoSeleccionado);
                this.cliente.permiso = this.selectedPermisoUsuario;
            }
            this.evaluadores.push(evaluador);
            this.empleadoSeleccionado = null;
            this.busqueda = null;
            this.busquedaInput = '';
            this.selectedRolEvaluador = null;
            this.selectedPermisoUsuario = null;
        }
        else if (this.selectedPermisoUsuario == null) {
            this.msgsBuscar = [];
            this.msgsBuscar.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Selecciona el permiso del ususario.'
            });
        }
        else if (this.selectedRolEvaluador == null) {
            this.msgsBuscar = [];
            this.msgsBuscar.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Selecciona el rol del evaluador.'
            });
        }
    };
    AsignarEncuestasComponent.prototype.insertarUsuarioRol = function (empleado) {
        this.adminService.insertarUsuarioRol(empleado);
    };
    AsignarEncuestasComponent.prototype.guardarEvaluacion = function () {
        // Set userProfile attribute if already saved profile
        var _this = this;
        this.utilService.displayDialogo('Guardando Evaluacion', 'info');
        scroll(0, 0);
        var t0 = performance.now();
        setTimeout(function () {
            Promise.resolve(_this.seguridadService.empleadoExisteEnProyecto(_this.evaluado.rpe, _this.utilService.nombreProyecto))
                .then(function (existe) {
                if (!existe)
                    _this.insertarUsuarioRol(_this.evaluado);
            });
            Promise.resolve(_this.seguridadService.empleadoExisteEnProyecto(_this.par.rpe, _this.utilService.nombreProyecto))
                .then(function (existe) {
                if (!existe)
                    _this.insertarUsuarioRol(_this.par);
            });
            Promise.resolve(_this.seguridadService.empleadoExisteEnProyecto(_this.jefe.rpe, _this.utilService.nombreProyecto))
                .then(function (existe) {
                if (!existe)
                    _this.insertarUsuarioRol(_this.jefe);
            });
            Promise.resolve(_this.seguridadService.empleadoExisteEnProyecto(_this.cliente.rpe, _this.utilService.nombreProyecto))
                .then(function (existe) {
                if (!existe)
                    _this.insertarUsuarioRol(_this.cliente);
            });
            Promise.resolve(_this.seguridadService.empleadoExisteEnProyecto(_this.colaborador.rpe, _this.utilService.nombreProyecto))
                .then(function (existe) {
                if (!existe)
                    _this.insertarUsuarioRol(_this.colaborador);
            });
            var evaluacion = new Evaluacion_1.Evaluacion(_this.encuestaSeleccionada.idte, _this.ponderadoSeleccionado, _this.evaluado.nip, 'F');
            Promise.resolve(_this.adminService.crearEvaluacion(evaluacion, _this.evaluadores)).then(function (o6) {
                _this.evaluacionGuardada = true;
                var t1 = performance.now();
                console.log("La evaluacion tardo " + Math.round(t1 - t0) + " milisegundos en guardarse.");
                _this.utilService.mensajeExitoDialogo('Evaluacion asignada');
            });
        }, 100);
    };
    __decorate([
        core_1.ViewChild('inputRef'), 
        __metadata('design:type', Object)
    ], AsignarEncuestasComponent.prototype, "inputRef", void 0);
    AsignarEncuestasComponent = __decorate([
        core_1.Component({
            selector: "app-asignar-encuestas",
            templateUrl: "app/admin/asignar_encuestas/asignar_encuestas.component.html",
            styleUrls: ['app/admin/asignar_encuestas/asignar_encuestas.component.css'],
            providers: [api_1.ConfirmationService, encuesta_service_1.EncuestaService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, administracion_service_1.AdminService, api_1.ConfirmationService, util_service_1.UtilService, router_1.Router, seguridad_service_1.SeguridadService, encuesta_service_1.EncuestaService])
    ], AsignarEncuestasComponent);
    return AsignarEncuestasComponent;
}());
exports.AsignarEncuestasComponent = AsignarEncuestasComponent;
//# sourceMappingURL=asignar_encuestas.component.js.map