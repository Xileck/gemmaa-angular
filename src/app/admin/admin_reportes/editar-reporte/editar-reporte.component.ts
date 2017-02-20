import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GrupoEvaluacion} from "../../../clases/Reportes/GrupoEvaluacion";
import {Ponderados} from "../../../clases/Reportes/Ponderados";
import {Message, SelectItem} from "primeng/components/common/api";
import {EncuestaService} from "../../../servicios/encuesta.service";
import {ReportesService} from "../../../servicios/reportes.service";
import {LoginService} from "../../../login/login.service";

@Component({
    selector: 'app-editar-reporte',
    templateUrl: './editar-reporte.component.html',
    styleUrls: ['./editar-reporte.component.css'],
    providers: [EncuestaService]
})
export class EditarReporteComponent implements OnInit {
    listaPonderados: Ponderados[];
    listaPonderadosDropdown: SelectItem[];
    ponderadoSeleccionado: Ponderados;
    private _ponderadoTotal: number;


    msgsBuscarPonderado: Message[];
    displayPonderadoPanel: boolean = false;
    nuevoPonderado: Ponderados;
    @Input() grupo: GrupoEvaluacion;
    @Output() salir = new EventEmitter();
    roles: SelectItem[];

    constructor(private encuestaService: EncuestaService,
                private reportesService: ReportesService,
                private loginService: LoginService) {
        this.cargarPonderados();
        this.roles = [];
        this.roles.push({label: 'EVALUADO', value: 'EVALUADO'});
        this.roles.push({label: 'JEFE', value: 'JEFE'});
        this.roles.push({label: 'PAR', value: 'PAR'});
        this.roles.push({label: 'COLABORADOR', value: 'COLABORADOR'});
        this.roles.push({label: 'CLIENTE', value: 'CLIENTE'});
    }

    ngOnInit() {
    }

    guardarCambios(): void {
        if (this.ponderadoSeleccionado != null) {
            this.reportesService.updatePonderado(this.grupo.id_evaluacion, this.ponderadoSeleccionado.idp);
            this.salir.emit(false);
        }
        else {
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Selecciona un ponderado.'
            })
        }
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
                                value: p
                            });

                        }
                    }
                    this.ponderadoSeleccionado = this.grupo.ponderados;
                }
            );
    }

}
