import {Component, ViewChild, OnChanges, Input} from "@angular/core";
import {SelectItem, ConfirmationService, Message} from "primeng/components/common/api";
import {Router} from "@angular/router";
import {Empleado} from "../../clases/Usuario/Empleado";
import {Usuario} from "../../clases/Usuario/Usuario";
import {UtilService} from "../../servicios/util.service";
import {LoginService} from "../../login/login.service";
import {SeguridadService} from "../../servicios/seguridad.service";
import {AdminService} from "../../servicios/administracion.service";
import {OverlayPanel} from "primeng/components/overlaypanel/overlaypanel";
import {environment} from "../../../environments/environment";

@Component({
    selector: "app-admin-usuarios",
    templateUrl: "./admin_usuarios.component.html",
    styleUrls: ["./admin_usuarios.component.css"],
    providers: [ConfirmationService]
})
export class AdminUsuariosComponent implements OnChanges {
    @ViewChild('inputRef') inputRef;
    usuarios: any = [];
    selectedRol: string;
    selectedUser: Usuario;
    selectedUsuario: any;
    roles: SelectItem[];
    mostrarFotos: boolean = false;
    agregarUsr: boolean = false;

    msgsPanelUsuarios: Message[] = [];

    display: boolean = false;
    blockedDocument: boolean = false;
    busqueda: any;
    @Input() busquedaInput: string;
    msgsBuscar: Message[];
    empleadoSeleccionado: Empleado;

    constructor(private seguridadService: SeguridadService,
                private loginService: LoginService,
                private confirmationService: ConfirmationService,
                private router: Router,
                private utilService: UtilService,
                private adminService: AdminService) {
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        else {
            Object.assign(this.usuarios, this.seguridadService.getUsuariosProyecto(environment.nombreProyecto));
            this.roles = [];
            this.roles.push({label: 'Selecciona un rol.', value: null});
            this.roles.push({label: 'Evaluador', value: 'EVAL'});
            this.roles.push({label: 'Jefe', value: 'JEFE'});
            this.roles.push({label: 'Administrador', value: 'ADMIN'});
        }
    }

    mostrarFotosFuncion() {
        if (!this.mostrarFotos) {
            this.utilService.displayDialogo('Cargando fotos', 'info');
            setTimeout(() => {
                Object.assign(this.usuarios, this.seguridadService.getUsuariosProyectoConFoto(environment.nombreProyecto));
                this.mostrarFotos = true;
                this.utilService.reiniciarDialogo();
            }, 100);
        }
    }


    showDialog() {
        this.display = true;
    }

    darDeAltaUsuario() {
        if (this.empleadoSeleccionado && this.selectedRol) {
            this.empleadoSeleccionado.permiso = this.selectedRol;
            try {
                Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(this.empleadoSeleccionado.rpe, environment.nombreProyecto))
                    .then(existe => {
                        if (!existe) {
                            Promise.resolve(this.adminService.insertarUsuarioRol(this.empleadoSeleccionado)).then(o => {
                                Promise.resolve(this.seguridadService.getInfoEmpleado(this.empleadoSeleccionado.nip))
                                    .then(empleado => {
                                        this.usuarios.push(empleado);
                                        this.loginService.mensajesGlobales = [];
                                        this.loginService.mensajesGlobales.push({
                                            severity: 'success',
                                            summary: 'Exito: ',
                                            detail: 'Se agrego al empleado  : ' + this.empleadoSeleccionado.nombreCompleto + '.'
                                        });
                                        this.cerrarModal();
                                    })
                            });
                        }
                        else {
                            this.loginService.mensajesGlobales = [];
                            this.loginService.mensajesGlobales.push({
                                severity: 'error',
                                summary: 'Error: ',
                                detail: 'Empleado ya existe : ' + this.empleadoSeleccionado.nombreCompleto + '.'
                            });
                            this.cerrarModal();
                        }
                    });
            } catch (e) {
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
            this.msgsBuscar.push({severity: 'error', summary: 'Error:', detail: 'Selecciona un rol.'});
        }
    }

    modificarUsuario() {
        if (this.selectedUser.clave.length >= 3 && this.selectedUser.rol.clave) {
            try {
                this.utilService.displayDialogo('Guardando modificaciónes.', 'info');
                setTimeout(() => {
                    Promise.resolve(this.adminService.actualizarUsuarioRol(this.selectedUser)).then(op => {
                        this.selectedUsuario.rol = this.selectedUser.rol.clave;
                        this.selectedUsuario.passwordIntra = this.selectedUser.password;
                        this.selectedUsuario.passwordUsuariosRol = this.selectedUser.empleado.password;
                        this.selectedUser = null;
                        this.selectedUsuario = null;
                        this.loginService.mensajesGlobales = [];
                        this.loginService.mensajesGlobales.push({
                            severity: 'success',
                            summary: 'Exito:',
                            detail: 'Usuario actualizado correctamente.'
                        });
                    });
                    this.utilService.reiniciarDialogo();
                }, 100);
            } catch (error) {
                this.loginService.mensajesGlobales = [];
                this.loginService.mensajesGlobales.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Error de conexion.'
                });
            }
        } else if (this.selectedRol == null) {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Selecciona un rol.'
            })
        }
        else if (this.selectedUser.clave.length < 3) {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Proporciona una contraseña de almenos 3 caracteres.'
            })
        }
    }

    actualizar() {
        this.utilService.displayDialogo('Refrescando', 'info');
        setTimeout(() => {
            this.usuarios = this.seguridadService.getUsuariosProyecto(environment.nombreProyecto);
            this.mostrarFotos = false;
            this.utilService.reiniciarDialogo();
        }, 100);

    }

    ngOnChanges(changes) {
        console.log(changes);
    }

    soloMayusculas(event: any) {
        if (isNaN(Number(event))) {
            let inputChar = String.fromCharCode(event.charCode);
            // console.log(inputChar, e.charCode);
            if (inputChar.toUpperCase() != inputChar && this.busquedaInput.length <= 5) {
                event.preventDefault();
                this.busquedaInput += inputChar.toUpperCase();
            }
        }
    }

    eliminarUsuario(usuario) {
        this.confirmationService.confirm({
                message: 'Quieres eliminar este usuario?',
                header: 'Confirmar Eliminación',
                icon: 'fa fa-trash',
                accept: () => {
                    try {
                        for (var i = 0; i < this.usuarios.length; i++) {
                            if (this.usuarios[i].nip == usuario.nip) {
                                this.usuarios.splice(i, 1);
                                break;
                            }
                        }
                        this.adminService.eliminarUsuarioRol(environment.nombreProyecto, usuario.rpe);

                        this.loginService.mensajesGlobales = [];
                        this.loginService.mensajesGlobales.push({
                            severity: 'info',
                            summary: 'Exito:',
                            detail: 'Usuario Eliminado'
                        });

                    } catch (e) {
                        console.error(e);
                    }

                }
            }
        );

    }

    abrirModalAgregarUsuario() {
        this.agregarUsr = true;
        setTimeout(() => {
            if (this.inputRef && this.inputRef.nativeElement)
                this.inputRef.nativeElement.focus()
        }, 10);
    }

    cerrarModal() {
        this.agregarUsr = false;
        this.busqueda = null;
        this.busquedaInput = null;
        this.empleadoSeleccionado = null;
    }

    buscarEmpleados() {
        this.msgsBuscar = [];
        this.blockedDocument = true;
        var t0 = performance.now();
        setTimeout(() => {
            if (this.busquedaInput != null && this.busquedaInput.length > 1)
                Promise.resolve(this.utilService.buscarEmpleados(this.busquedaInput)).then(result => {
                    this.busqueda = result
                    var t1 = performance.now();
                    console.log("Funcion buscarEmpleados('" + this.busquedaInput + "') tardo " + Math.round(t1 - t0) + " milisegundos.")
                });
            else if (this.busquedaInput != null && this.busquedaInput.length <= 3) {
                if (this.inputRef && this.inputRef.nativeElement)
                    this.inputRef.nativeElement.focus()
                this.msgsBuscar.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Ingresa al menos 4 caracteres.'
                });
            }
            else {
                if (this.inputRef && this.inputRef.nativeElement)
                    this.inputRef.nativeElement.focus()
                this.msgsBuscar.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Ingresa un nombre o rpe a buscar.'
                });
            }
            this.blockedDocument = false;
        }, 100);
    }

    selectUsuario(event, usr, overlaypanel: OverlayPanel) {
        this.selectedUser = new Usuario();
        this.selectedUsuario = usr;
        Object.assign(this.selectedUser, this.adminService.seleccionarUsuario(usr.rpe, environment.nombreProyecto));
        overlaypanel.toggle(event);
    }

    seleccionarEmpleado(rpe: string) {
        this.msgsBuscar = [];
        setTimeout(() => {
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(rpe, environment.nombreProyecto))
                .then(existe => {
                    if (!existe) {
                        this.blockedDocument = true;
                        document.body.style.cursor = 'wait';
                        Promise.resolve(this.utilService.buscarEmpleado(rpe)).then(emp => {
                            this.empleadoSeleccionado = new Empleado();
                            Object.assign(this.empleadoSeleccionado, emp)
                            this.blockedDocument = false;
                            document.body.style.cursor = 'auto';
                        });
                    } else {
                        this.msgsBuscar.push({
                            severity: 'error',
                            summary: 'Error:',
                            detail: 'Este usuario ya esta dado de alta en ' + environment.nombreProyecto + '.'
                        });
                    }
                });
        }, 100);
    }
}