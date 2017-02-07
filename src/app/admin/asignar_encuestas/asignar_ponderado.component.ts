import {Component, ViewEncapsulation} from "@angular/core";
import {SelectItem, Message} from "primeng/components/common/api";
import {Ponderados} from "../../clases/Reportes/Ponderados";
import {EncuestaService} from "../../servicios/encuesta.service";

@Component({
    selector: "app-asignar-ponderado",
    templateUrl: "./asignar_encuestas.component.html",
    styleUrls: ['./asignar_encuestas.component.css'],
    providers: [EncuestaService]
})
export class AsignarPonderadoComponent {


    constructor(private encuestaService: EncuestaService) {
        this.cargarPonderados();
    }

    cargarPonderados() {
        Promise.resolve(this.encuestaService.getListaPonderados())
            .then(ponderados => {
                    this.listaPonderados = ponderados;
                    if (this.listaPonderados) {
                        this.listaPonderadosDropdown = [];
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
    blockedDocument: boolean = false;


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
                    this.cargarPonderados();
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

    cerrarModalPonderado() {
        this.displayPonderadoPanel = false;
    }

}