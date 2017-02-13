var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, Input } from "@angular/core";
import { ConfirmationService } from "primeng/components/common/api";
import { Router } from "@angular/router";
import { Empleado } from "../../clases/Usuario/Empleado";
import { Usuario } from "../../clases/Usuario/Usuario";
import { UtilService } from "../../servicios/util.service";
import { LoginService } from "../../login/login.service";
import { SeguridadService } from "../../servicios/seguridad.service";
import { AdminService } from "../../servicios/administracion.service";
import { environment } from "../../../environments/environment";
export var AdminReportesComponent = (function () {
    function AdminReportesComponent(seguridadService, loginService, confirmationService, router, utilService, adminService) {
        this.seguridadService = seguridadService;
        this.loginService = loginService;
        this.confirmationService = confirmationService;
        this.router = router;
        this.utilService = utilService;
        this.adminService = adminService;
        this.usuarios = [];
        this.mostrarFotos = false;
        this.agregarUsr = false;
        this.msgsPanelUsuarios = [];
        this.display = false;
        this.blockedDocument = false;
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        else {
            Object.assign(this.usuarios, this.seguridadService.getUsuariosProyecto(environment.nombreProyecto));
            this.roles = [];
            this.roles.push({ label: 'Selecciona un rol.', value: null });
            this.roles.push({ label: 'Evaluador', value: 'EVAL' });
            this.roles.push({ label: 'Jefe', value: 'JEFE' });
            this.roles.push({ label: 'Administrador', value: 'ADMIN' });
        }
    }
    AdminReportesComponent.prototype.mostrarFotosFuncion = function () {
        var _this = this;
        if (!this.mostrarFotos) {
            this.utilService.displayDialogo('Cargando fotos', 'info');
            setTimeout(function () {
                Object.assign(_this.usuarios, _this.seguridadService.getUsuariosProyectoConFoto(environment.nombreProyecto));
                _this.mostrarFotos = true;
                _this.utilService.reiniciarDialogo();
            }, 100);
        }
    };
    AdminReportesComponent.prototype.showDialog = function () {
        this.display = true;
    };
    AdminReportesComponent.prototype.darDeAltaUsuario = function () {
        var _this = this;
        if (this.empleadoSeleccionado && this.selectedRol) {
            this.empleadoSeleccionado.permiso = this.selectedRol;
            try {
                Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(this.empleadoSeleccionado.rpe, environment.nombreProyecto))
                    .then(function (existe) {
                    if (!existe) {
                        Promise.resolve(_this.adminService.insertarUsuarioRol(_this.empleadoSeleccionado)).then(function (o) {
                            Promise.resolve(_this.seguridadService.getInfoEmpleado(_this.empleadoSeleccionado.nip))
                                .then(function (empleado) {
                                _this.usuarios.push(empleado);
                                _this.loginService.mensajesGlobales = [];
                                _this.loginService.mensajesGlobales.push({
                                    severity: 'success',
                                    summary: 'Exito: ',
                                    detail: 'Se agrego al empleado  : ' + _this.empleadoSeleccionado.nombreCompleto + '.'
                                });
                                _this.cerrarModal();
                            });
                        });
                    }
                    else {
                        _this.loginService.mensajesGlobales = [];
                        _this.loginService.mensajesGlobales.push({
                            severity: 'error',
                            summary: 'Error: ',
                            detail: 'Empleado ya existe : ' + _this.empleadoSeleccionado.nombreCompleto + '.'
                        });
                        _this.cerrarModal();
                    }
                });
            }
            catch (e) {
                this.loginService.mensajesGlobales = [];
                this.loginService.mensajesGlobales.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Error de conexion.'
                });
            }
        }
        else {
            this.msgsBuscar = [];
            this.msgsBuscar.push({ severity: 'error', summary: 'Error:', detail: 'Selecciona un rol.' });
        }
    };
    AdminReportesComponent.prototype.modificarUsuario = function () {
        var _this = this;
        if (this.selectedUser.clave.length >= 3 && this.selectedUser.rol.clave) {
            try {
                this.utilService.displayDialogo('Guardando modificaciónes.', 'info');
                setTimeout(function () {
                    Promise.resolve(_this.adminService.actualizarUsuarioRol(_this.selectedUser)).then(function (op) {
                        _this.selectedUsuario.rol = _this.selectedUser.rol.clave;
                        _this.selectedUsuario.passwordIntra = _this.selectedUser.password;
                        _this.selectedUsuario.passwordUsuariosRol = _this.selectedUser.empleado.password;
                        _this.selectedUser = null;
                        _this.selectedUsuario = null;
                        _this.loginService.mensajesGlobales = [];
                        _this.loginService.mensajesGlobales.push({
                            severity: 'success',
                            summary: 'Exito:',
                            detail: 'Usuario actualizado correctamente.'
                        });
                    });
                    _this.utilService.reiniciarDialogo();
                }, 100);
            }
            catch (error) {
                this.loginService.mensajesGlobales = [];
                this.loginService.mensajesGlobales.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Error de conexion.'
                });
            }
        }
        else if (this.selectedRol == null) {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Selecciona un rol.'
            });
        }
        else if (this.selectedUser.clave.length < 3) {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Proporciona una contraseña de almenos 3 caracteres.'
            });
        }
    };
    AdminReportesComponent.prototype.actualizar = function () {
        var _this = this;
        this.utilService.displayDialogo('Refrescando', 'info');
        setTimeout(function () {
            _this.usuarios = _this.seguridadService.getUsuariosProyecto(environment.nombreProyecto);
            _this.mostrarFotos = false;
            _this.utilService.reiniciarDialogo();
        }, 100);
    };
    AdminReportesComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
    };
    AdminReportesComponent.prototype.soloMayusculas = function (event) {
        if (isNaN(Number(event))) {
            var inputChar = String.fromCharCode(event.charCode);
            // console.log(inputChar, e.charCode);
            if (inputChar.toUpperCase() != inputChar && this.busquedaInput.length <= 5) {
                event.preventDefault();
                this.busquedaInput += inputChar.toUpperCase();
            }
        }
    };
    AdminReportesComponent.prototype.eliminarUsuario = function (usuario) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Quieres eliminar este usuario?',
            header: 'Confirmar Eliminación',
            icon: 'fa fa-trash',
            accept: function () {
                try {
                    for (var i = 0; i < _this.usuarios.length; i++) {
                        if (_this.usuarios[i].nip == usuario.nip) {
                            _this.usuarios.splice(i, 1);
                            break;
                        }
                    }
                    _this.adminService.eliminarUsuarioRol(environment.nombreProyecto, usuario.rpe);
                    _this.loginService.mensajesGlobales = [];
                    _this.loginService.mensajesGlobales.push({
                        severity: 'info',
                        summary: 'Exito:',
                        detail: 'Usuario Eliminado'
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
        });
    };
    AdminReportesComponent.prototype.abrirModalAgregarUsuario = function () {
        var _this = this;
        this.agregarUsr = true;
        setTimeout(function () {
            if (_this.inputRef && _this.inputRef.nativeElement)
                _this.inputRef.nativeElement.focus();
        }, 10);
    };
    AdminReportesComponent.prototype.cerrarModal = function () {
        this.agregarUsr = false;
        this.busqueda = null;
        this.busquedaInput = null;
        this.empleadoSeleccionado = null;
    };
    AdminReportesComponent.prototype.buscarEmpleados = function () {
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
                if (_this.inputRef && _this.inputRef.nativeElement)
                    _this.inputRef.nativeElement.focus();
                _this.msgsBuscar.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Ingresa al menos 4 caracteres.'
                });
            }
            else {
                if (_this.inputRef && _this.inputRef.nativeElement)
                    _this.inputRef.nativeElement.focus();
                _this.msgsBuscar.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Ingresa un nombre o rpe a buscar.'
                });
            }
            _this.blockedDocument = false;
        }, 100);
    };
    AdminReportesComponent.prototype.selectUsuario = function (event, usr, overlaypanel) {
        this.selectedUser = new Usuario();
        this.selectedUsuario = usr;
        Object.assign(this.selectedUser, this.adminService.seleccionarUsuario(usr.rpe, environment.nombreProyecto));
        overlaypanel.toggle(event);
    };
    AdminReportesComponent.prototype.seleccionarEmpleado = function (rpe) {
        var _this = this;
        this.msgsBuscar = [];
        setTimeout(function () {
            Promise.resolve(_this.seguridadService.empleadoExisteEnProyecto(rpe, environment.nombreProyecto))
                .then(function (existe) {
                if (!existe) {
                    _this.blockedDocument = true;
                    document.body.style.cursor = 'wait';
                    Promise.resolve(_this.utilService.buscarEmpleado(rpe)).then(function (emp) {
                        _this.empleadoSeleccionado = new Empleado();
                        Object.assign(_this.empleadoSeleccionado, emp);
                        _this.blockedDocument = false;
                        document.body.style.cursor = 'auto';
                    });
                }
                else {
                    _this.msgsBuscar.push({
                        severity: 'error',
                        summary: 'Error:',
                        detail: 'Este usuario ya esta dado de alta en ' + environment.nombreProyecto + '.'
                    });
                }
            });
        }, 100);
    };
    __decorate([
        ViewChild('inputRef'), 
        __metadata('design:type', Object)
    ], AdminReportesComponent.prototype, "inputRef", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], AdminReportesComponent.prototype, "busquedaInput", void 0);
    AdminReportesComponent = __decorate([
        Component({
            selector: "app-admin-reportes",
            templateUrl: "./admin_reportes.component.html",
            styleUrls: ["./admin_reportes.component.css"],
            providers: [ConfirmationService]
        }), 
        __metadata('design:paramtypes', [SeguridadService, LoginService, ConfirmationService, Router, UtilService, AdminService])
    ], AdminReportesComponent);
    return AdminReportesComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/admin/admin_reportes/admin_reportes.component.js.map