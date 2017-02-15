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
import {ReportesService} from "../../servicios/reportes.service";
import {GrupoEvaluacion} from "../../clases/Reportes/GrupoEvaluacion";

@Component({
    selector: "app-admin-reportes",
    templateUrl: "./admin_reportes.component.html",
    styleUrls: ["./admin_reportes.component.css"],
    providers: [ReportesService, UtilService]
})
export class AdminReportesComponent {

    gruposEvaluacion: GrupoEvaluacion[] = null;
    busquedaInput: string;
    grupoSeleccionado: GrupoEvaluacion;
    buscando: boolean = false;

    constructor(private loginService: LoginService,
                private router: Router,
                private reportesService: ReportesService,
                private utilService: UtilService) {
        //if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
        // this.router.navigate(['login']);
    }

    buscarEvaluaciones() {
        this.buscando = true;
        document.body.style.cursor = 'wait';
        this.gruposEvaluacion = null;
        setTimeout(() => {
            this.reportesService.getGruposEvaluacionEmpleado(this.busquedaInput).then(grupos => {
                if (grupos.length > 0)
                    this.gruposEvaluacion = grupos;
                else
                    this.gruposEvaluacion = null;
                this.buscando = false;
                document.body.style.cursor = 'auto';
            }), 100
        });
    }

    getNombreTipoEvaluador(grupo: GrupoEvaluacion, tipo: string): string {

        for (let evaluador of grupo.evaluadores) {
            if (evaluador.tipo_de_evaluador.toUpperCase().indexOf(tipo) >= 0) {
                return evaluador.nombre_completo;
            }
        }
        return null;

    }

    getProgress(evaluacion: GrupoEvaluacion): number {
        let countFinalized: number = 0;
        let countTotal: number = 0;
        for (let e of evaluacion.evaluadores) {
            countTotal++;
            if (e.finalizo != null && e.finalizo == 't') {
                countFinalized++;
            }
        }
        return this.progressPercent(countFinalized, countTotal);
    }

    progressPercent(countFinalized, countTotal): number {
        if (countFinalized == 0)
            return 0;
        else
            return (countFinalized * 100) / countTotal;
    }

}