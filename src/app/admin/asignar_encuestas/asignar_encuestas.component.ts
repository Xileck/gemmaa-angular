import {Component, ViewEncapsulation, ViewChild, AfterViewInit} from "@angular/core";
import {LoginService} from "../../login/login.service";
import {SelectItem, ConfirmationService, Message} from "primeng/components/common/api";
import {Evaluacion} from "../../clases/Evaluacion";
import {AdminService} from "../../servicios/administracion.service";
import {UtilService} from "../../servicios/util.service";
import {Router} from "@angular/router";
import {Empleado} from "../../clases/Usuario/Empleado";
import {AsignarEvaluador} from "../../clases/AsignarEvaluador";
import {SeguridadService} from "../../servicios/seguridad.service";
import {Ponderados} from "../../clases/Reportes/Ponderados";
import {EncuestaService} from "../../servicios/encuesta.service";

@Component({
    selector: "app-asignar-encuestas",
    templateUrl: "./asignar_encuestas.component.html",
    styleUrls: ['./asignar_encuestas.component.css'],
    providers: [ConfirmationService, EncuestaService],
    encapsulation: ViewEncapsulation.None
})
export class AsignarEncuestasComponent implements AfterViewInit {


    constructor(private loginService: LoginService,
                private adminService: AdminService,
                private confirmationService: ConfirmationService,
                private utilService: UtilService,
                private router: Router,
                private seguridadService: SeguridadService,
                private encuestaService: EncuestaService) {
        if (!loginService.usuarioValidado() || !loginService.emplHasAccess('admin'))
            if (!loginService.godlike)
                this.router.navigate(['login']);
        this.rolesPermisoUsuario = [];
        this.rolesPermisoUsuario.push({label: 'Selecciona el permiso.', value: null});
        this.rolesPermisoUsuario.push({label: 'Evaluador', value: 'EVAL'});
        this.rolesPermisoUsuario.push({label: 'Jefe', value: 'JEFE'});

        this.rolesEvaluadores = [];
        this.rolesEvaluadores.push({label: 'Selecciona el rol.', value: null});
        this.rolesEvaluadores.push({label: 'Evaluado', value: 'EVALUADO'});
        this.rolesEvaluadores.push({label: 'Jefe', value: 'JEFE'});
        this.rolesEvaluadores.push({label: 'Par', value: 'PAR'});
        this.rolesEvaluadores.push({label: 'Cliente', value: 'CLIENTE'});
        this.rolesEvaluadores.push({label: 'Colaborador', value: 'COLABORADOR'});

        this.catalogoEncuestas = this.adminService.getCatalogoEncuestas();
        this.cargarPonderados();
    }

    cargarPonderados() {
        Promise.resolve(this.encuestaService.getListaPonderados())
            .then(ponderados => {
                    this.listaPonderados = ponderados;
                    if (this.listaPonderados) {
                        this.listaPonderadosDropdown = [];
                        this.listaPonderadosDropdown.push({
                            label: "Selecciona un ponderado",
                            value: null
                        });
                        for (let p of this.listaPonderados) {
                            this.listaPonderadosDropdown.push({
                                label: "ID: " + p.idp + " | Evaluado: " + p.evaluado + " | Jefe: "
                                + p.jefe + " | Par: " + p.par + " | Colaborador: " + p.colaborador + " | Cliente: " + p.cliente,
                                value: '' + p.idp
                            });

                        }
                    }
                }
            );
    }

    recargarPonderados() {
        Promise.resolve(this.encuestaService.getListaPonderados())
            .then(ponderados => {
                    this.listaPonderados = ponderados;
                    if (this.listaPonderados) {
                        this.listaPonderadosDropdown = [];
                        this.listaPonderadosDropdown.push({
                            label: "Selecciona un ponderado",
                            value: null
                        });
                        for (let p of this.listaPonderados) {
                            this.listaPonderadosDropdown.push({
                                label: "ID: " + p.idp + " | Evaluado: " + p.evaluado + " | Jefe: "
                                + p.jefe + " | Par: " + p.par + " | Colaborador: " + p.colaborador + " | Cliente: " + p.cliente,
                                value: '' + p.idp
                            });
                            this.ponderadoSeleccionado = p.idp;
                        }

                    }
                }
            );
    }


    @ViewChild('inputRef') inputRef;
    msgsBuscar: Message[] = [];

    listaPonderados: Ponderados[];
    listaPonderadosDropdown: SelectItem[];
    ponderadoSeleccionado;
    private _ponderadoTotal: number;

    get ponderadoTotal(): number {
        return this.totalDePonderado(this.nuevoPonderado);
    }

    set ponderadoTotal(value: number) {
        this._ponderadoTotal = value;
    }

    msgsBuscarPonderado: Message[];
    displayPonderadoPanel: boolean = false;
    nuevoPonderado: Ponderados;
    evaluacionGuardada: boolean = false;
    focus: boolean = false;
    empleadoSeleccionado: Empleado;
    encuestaSeleccionada: any = null;
    rolesPermisoUsuario: SelectItem[];
    rolesEvaluadores: any;
    catalogoEncuestas: any;
    selectedRolEvaluador: string;
    selectedPermisoUsuario: string;

    blockedDocument: boolean = false;

    //Evaluadores y sus permisos por si no se encuentran en la base de datos son los permisos o rol con los que se agregaran.
    jefe: Empleado;
    evaluado: Empleado;
    par: Empleado;
    colaborador: Empleado;
    cliente: Empleado;

    //Lista de evaluadores
    evaluadores: AsignarEvaluador[] = [];
    busquedaInput: string = '';
    busqueda: Empleado[] = [];
    empleado_a_Buscar: any;


    cerrarModal() {
        this.selectedRolEvaluador = null;
        this.busqueda = null;
        this.busquedaInput = '';
        this.empleadoSeleccionado = null;
    }


    nuevoPonderadoModal() {
        this.nuevoPonderado = new Ponderados();
        this.displayPonderadoPanel = true;
    }

    agregarPonderado() {
        if (this.ponderadoEsValido(this.nuevoPonderado)) {
            Promise.resolve(this.encuestaService.insertarPonderados(this.nuevoPonderado))
                .then(o => {
                    this.nuevoPonderado = new Ponderados();
                    this.cerrarModalPonderado();
                    this.recargarPonderados();
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
    }

    _keyPress(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        // console.log(inputChar, e.charCode);
        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    totalDePonderado(ponderado: Ponderados): number {
        let total: number = 0;
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
    }

    ponderadoEsValido(ponderado): boolean {
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

    }

    buscarEmpleado(referencia: any, rol: string): void {
        this.msgsBuscar = [];
        if (referencia == null) {
            this.empleado_a_Buscar = referencia;
            this.selectedRolEvaluador = rol;
            setTimeout(() => {
                if (this.inputRef && this.inputRef.nativeElement)
                    this.inputRef.nativeElement.focus()
            }, 10);
        }
    }

    ngAfterViewInit() {
        if (this.inputRef && this.inputRef.first)
            this.inputRef.first.nativeElement.focus();
    }

    cancelarBusqueda() {
        this.msgsBuscar = [];
        this.empleadoSeleccionado = null;
        this.busqueda = null;
        this.busquedaInput = null;
        setTimeout(() => {
            if (this.inputRef && this.inputRef.nativeElement)
                this.inputRef.nativeElement.focus()
        }, 10);
    }


    eliminarUsuario(nombre_eval: string): any {
        setTimeout(() => {
            if ('EVALUADO' == nombre_eval) {
                this.evaluado = null;
            }
            else if ('PAR' == nombre_eval) {
                this.par = null;
            }
            else if ('CLIENTE' == nombre_eval) {
                this.cliente = null
            }
            else if ('COLABORADOR' == nombre_eval) {
                this.colaborador = null;
            }
            else if ('JEFE' == nombre_eval) {
                this.jefe = null;
            }
            for (let i = 0; i < this.evaluadores.length; i++) {
                if (this.evaluadores[i].tipo_de_evaluador == nombre_eval) {
                    this.evaluadores.splice(i, 1);
                    break;
                }
            }
        }, 100);
    }


    confirmarGuardarEvaluacion() {
        if (this.checarSiEvaluadosEstanAsignados() == null && this.encuestaSeleccionada != null && this.ponderadoSeleccionado != null) {
            this.confirmationService.confirm({
                    message: 'Estas seguro que los datos son los correctos?',
                    accept: () => {
                        this.guardarEvaluacion()
                    }
                }
            );
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
                detail: this.checarSiEvaluadosEstanAsignados() + '.'
            });
        }

    }

    buscarEmpleados() {
        this.msgsBuscar = [];
        this.blockedDocument = true;
        var t0 = performance.now();
        setTimeout(() => {
            if (this.busquedaInput != null && this.busquedaInput.length > 3)
                Promise.resolve(this.utilService.buscarEmpleados(this.busquedaInput)).then(result => {
                    this.busqueda = result
                    var t1 = performance.now();
                    console.log("Funcion buscarEmpleados('" + this.busquedaInput + "') tardo " + Math.round(t1 - t0) + " milisegundos.")
                });
            else if (this.busquedaInput != null && this.busquedaInput.length <= 3) {
                this.msgsBuscar.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Ingresa al menos 4 caracteres.'
                });
            }
            else {
                this.msgsBuscar.push({
                    severity: 'error',
                    summary: 'Error:',
                    detail: 'Ingresa un nombre o rpe a buscar.'
                });
            }
            this.blockedDocument = false;
        }, 100);
    }

    seleccionarEmpleado(rpe: string) {
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
            setTimeout(() => {
                Promise.resolve(this.utilService.buscarEmpleado(rpe)).then(emp => {
                    this.empleadoSeleccionado = new Empleado();
                    Object.assign(this.empleadoSeleccionado, emp)
                    this.blockedDocument = false;
                    document.body.style.cursor = 'auto';
                });
            }, 100);
        }
    }

    cerrarModalPonderado() {
        this.displayPonderadoPanel = false;
        this.msgsBuscarPonderado = [];
    }

    llenarEvaluadores() {
        Promise.resolve(this.utilService.buscarEmpleado('174P6')).then(emp => {
            this.agregarEvaluador(emp, 'EVALUADO', 'EVALUADOR')
        });
        Promise.resolve(this.utilService.buscarEmpleado('171P6')).then(emp => {
            this.agregarEvaluador(emp, 'PAR', 'EVALUADOR')
        });
        Promise.resolve(this.utilService.buscarEmpleado('172P6')).then(emp => {
            this.agregarEvaluador(emp, 'JEFE', 'EVALUADOR')
        });
        Promise.resolve(this.utilService.buscarEmpleado('173P6')).then(emp => {
            this.agregarEvaluador(emp, 'COLABORADOR', 'EVALUADOR')
        });
        Promise.resolve(this.utilService.buscarEmpleado('175P6')).then(emp => {
            this.agregarEvaluador(emp, 'CLIENTE', 'EVALUADOR')
        });

    }

    checarSiEvaluadosEstanAsignados(): string {
        let roles: string[] = [];
        if (this.jefe == null) {
            roles.push('Necesitas seleccionar : jefe');
        }
        if (this.par == null) {
            roles.push('Necesitas seleccionar : par');
        }
        if (this.colaborador == null) {
            roles.push('Necesitas seleccionar : colaborador');
        }
        if (this.evaluado == null) {
            roles.push('Necesitas seleccionar : evaluado');
        }

        if (this.cliente == null && this.ponderadoSeleccionado != null && this.ponderadoSeleccionado.cliente != 0) {
            roles.push('Si no se va a seleccionar un cliente el ponderado del cliente debe tener el valor de 0.')
        }

        if (roles.length == 0)
            return null;
        else if (roles.length == 1)
            return roles[0];
        else {
            let result: string = '';
            for (let i = 0; i <= roles.length - 1; i++) {
                if (i == roles.length - 1)
                    result += ' ' + roles[i];
                else
                    result += ' ' + roles[i] + ',';
            }
            return result;
        }
    }

    checarEmpleadoEstaAgregado(rpe: string): string {
        if (this.jefe != null && rpe == this.jefe.rpe) {
            return 'jefe';
        } else if (this.par != null && rpe == this.par.rpe) {
            return 'par';
        } else if (this.colaborador != null && rpe == this.colaborador.rpe) {
            return 'colaborador';
        } else if (this.evaluado != null && rpe == this.evaluado.rpe) {
            return 'evaluado';
        }
        else
            return null
    }

    checarSiRolYaEstaAsignado(selectedRolEvaluador): string {
        if (selectedRolEvaluador == null)
            return null;
        if (this.jefe != null && selectedRolEvaluador == 'JEFE') {
            return 'jefe';
        } else if (this.par != null && selectedRolEvaluador == 'PAR') {
            return 'par';
        } else if (this.colaborador != null && selectedRolEvaluador == 'COLABORADOR') {
            return 'colaborador';
        } else if (this.evaluado != null && selectedRolEvaluador == 'EVALUADO') {
            return 'evaluado';
        }
        else
            return null;
    }

    agregarEvaluador(empleado: Empleado, rol: string, persmiso: string) {
        if (this.checarSiRolYaEstaAsignado(empleado) != null) {
            this.msgsBuscar = [];
            this.msgsBuscar.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'El rol de ' + this.checarSiRolYaEstaAsignado(rol) + 'ya esta asignado.'
            });
            return;
        }
        if (rol != null && persmiso != null) {
            let evaluador: AsignarEvaluador = new AsignarEvaluador(empleado.nip, "", 'F', persmiso);
            if (rol == 'JEFE') {
                evaluador.tipo_de_evaluador = 'JEFE';
                this.jefe = new Empleado();
                Object.assign(this.jefe, empleado);
                this.jefe.permiso = persmiso;
            }
            else if (rol == 'PAR') {
                evaluador.tipo_de_evaluador = "PAR";
                this.par = new Empleado();
                Object.assign(this.par, empleado);
                this.par.permiso = persmiso;
            }
            else if (rol == 'EVALUADO') {
                evaluador.tipo_de_evaluador = "EVALUADO";
                this.evaluado = new Empleado();
                Object.assign(this.evaluado, empleado);
                this.evaluado.permiso = persmiso;
            }
            else if (rol == 'COLABORADOR') {
                evaluador.tipo_de_evaluador = "COLABORADOR";
                this.colaborador = new Empleado();
                Object.assign(this.colaborador, empleado);
                this.colaborador.permiso = persmiso;
            }
            else if (rol == 'CLIENTE') {
                evaluador.tipo_de_evaluador = "CLIENTE";
                this.cliente = new Empleado();
                Object.assign(this.cliente, empleado);
                this.cliente.permiso = persmiso;
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
    }

    insertarUsuarioRol(empleado: Empleado) {
        this.adminService.insertarUsuarioRol(empleado);
    }

    guardarEvaluacion(): any {
        // Set userProfile attribute if already saved profile
        this.evaluacionGuardada = true;
        this.utilService.displayDialogo('Guardando Evaluacion', 'info');
        scroll(0, 0);
        var t0 = performance.now();
        setTimeout(() => {
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(this.evaluado.rpe, this.utilService.nombreProyecto))
                .then(existe => {
                    if (!existe)
                        this.insertarUsuarioRol(this.evaluado);
                });
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(this.par.rpe, this.utilService.nombreProyecto))
                .then(existe => {
                    if (!existe)
                        this.insertarUsuarioRol(this.par);
                });
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(this.jefe.rpe, this.utilService.nombreProyecto))
                .then(existe => {
                    if (!existe)
                        this.insertarUsuarioRol(this.jefe);
                });
            Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(this.colaborador.rpe, this.utilService.nombreProyecto))
                .then(existe => {
                    if (!existe)
                        this.insertarUsuarioRol(this.colaborador);
                });
            if (this.cliente && this.cliente.rpe) {
                Promise.resolve(this.seguridadService.empleadoExisteEnProyecto(this.cliente.rpe, this.utilService.nombreProyecto))
                    .then(existe => {
                        if (!existe)
                            this.insertarUsuarioRol(this.cliente);
                    });
            }
            let evaluacion: Evaluacion = new Evaluacion(this.encuestaSeleccionada.idte, this.ponderadoSeleccionado, this.evaluado.nip, 'F');
            Promise.resolve(this.adminService.crearEvaluacion(evaluacion, this.evaluadores)).then(o6 => {
                var t1 = performance.now();
                console.log("La evaluacion tardo " + Math.round(t1 - t0) + " milisegundos en guardarse.")
                this.utilService.mensajeExitoDialogo('Evaluacion asignada');
            });
        }, 100);
    }

}
