import {Component, OnInit} from "@angular/core";
import {LoginService} from "../../login/login.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ConfirmationService, Message} from "primeng/components/common/api";
import {Atributo} from "../../clases/Encuesta/Atributo";
import {UtilService} from "../../servicios/util.service";
import {EncuestaService} from "../../servicios/encuesta.service";
/**
 * Created by Jaime Carballo Diaz on 09/11/2016.
 */

@Component({
    selector: "admin-encuestas",
    templateUrl: "./admin_encuestas.component.html",
    styles: [`.descripcion {
    border-left: solid 5px;
    border-left-color: #204d74;
    background-color: #14A4FF;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 20px;
    padding: 10px 0px 10px 0px;
    font-style: oblique;
}`],
    providers: [ConfirmationService, EncuestaService]
})
export class AdminEncuestasComponent implements OnInit {


    encuesta: any;
    creSeleccionado: any = null;
    display: boolean = false;
    displayEditarAtributo: boolean = false;
    atributoSeleccionado: any;
    idEncuesta: number;
    selectedResEsp: any;
    listaCREDelete: any = [];
    //noinspection TypeScriptUnresolvedVariable
    msgs: Message[] = [];
    blockPanel: boolean = false;

    constructor(private utilService: UtilService,
                private route: ActivatedRoute,
                public loginService: LoginService,
                public router: Router,
                private confirmationService: ConfirmationService,
                private encuestaService: EncuestaService) {
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.idEncuesta = +params['id']; // (+) converts string 'id' to a number
            this.cargarEncuesta();
        });
    }

    cargarEncuesta(): void {
        try {
            Promise.resolve(this.encuestaService.getEncuesta(this.idEncuesta)).then(
                encuesta => this.encuesta = encuesta
            );
        }
        catch (e) {
        }
    }

    guardarEncuesta() {
        this.utilService.displayDialogo('Guardando Cambios a encuesta', 'info');
        this.blockPanel = true;
        setTimeout(() => {
            for (let atr of this.encuesta.atributos) {
                this.encuestaService.servicioEncuesta.actualizarRegistroAtributo(atr);
            }
            for (let cre of this.encuesta.listaCRE) {
                if (cre.idCRE == null) {
                    this.encuestaService.servicioEncuesta.agregarRegistroCRE(cre);
                }
                else {
                    this.encuestaService.servicioEncuesta.actualizarRegistroCRE(cre);
                }
            }
            for (let cre of this.listaCREDelete) {
                this.encuestaService.servicioEncuesta.eliminarRegistroCRE(cre);
            }
            this.utilService.mensajeExitoDialogo('Cambios Guardados');
        }, 100);
    }

    nuevoComportamientoReactivoEscala(atributo: any): void {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Confirmado', detail: 'Registro nuevo agregado.'});
        let nuevoCRE: any = {
            idAtributo: atributo.idAtributo, comportamiento: 'nuevo comportamiento',
            reactivo: 'nuevo reactivo',
            escala_a: 4, escala_b: 3, escala_c: 2, escala_d: 1
        }
        this.encuesta.listaCRE.push(nuevoCRE);
    }

    quitarCRE(idAtributo: Number): void {
        if (this.creSeleccionado != null && this.creSeleccionado.idAtributo == idAtributo) {
            this.confirmationService.confirm({
                message: 'Quieres eliminar el registro seleccionado?',
                header: 'Confirmación',
                icon: 'fa fa-trash',
                accept: () => {
                    let index = this.encuesta.listaCRE.indexOf(this.creSeleccionado);
                    this.listaCREDelete.push(this.creSeleccionado);
                    this.encuesta.listaCRE.splice(index, 1);
                    this.creSeleccionado = null;
                    this.msgs = [];
                    this.msgs.push({severity: 'info', summary: 'Confirmado', detail: 'Registro Eliminado'});
                }
            });
        } else if (this.creSeleccionado == null) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Selecciona un registro a eliminar.'});
        } else {
            this.msgs = [];
            this.msgs.push({
                severity: 'error',
                summary: 'Error',
                detail: 'Selecciona un registro del atributo actual a eliminar.'
            });
        }
    }

    guardarCRE(): void {
        this.display = false;

    }

    agregarCRE(idAtributoPadre: number) {
        let nuevoCRE: any = {
            idAtributo: idAtributoPadre, comportamiento: 'nuevo comportamiento',
            reactivo: 'nuevo reactivo',
            escala_a: 4, escala_b: 3, escala_c: 2, escala_d: 1
        }
        this.encuesta.listaCRE.push(nuevoCRE);
    }

    mostrarPanelEdicion(idAtributo: number) {
        if (this.creSeleccionado != null && this.creSeleccionado.idAtributo == idAtributo)
            this.display = true;
        else {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Selecciona un registro que desees editar.'});
        }
    }

    editarAtributo(atributo: Atributo) {
        this.atributoSeleccionado = atributo;
        this.displayEditarAtributo = true;
    }

    guardarAtributo() {
        this.displayEditarAtributo = false;
    }
}