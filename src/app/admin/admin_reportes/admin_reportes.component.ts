import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {UtilService} from "../../servicios/util.service";
import {LoginService} from "../../login/login.service";
import {ReportesService} from "../../servicios/reportes.service";
import {GrupoEvaluacion} from "../../clases/Reportes/GrupoEvaluacion";
import {environment} from "../../../environments/environment";

@Component({
    selector: "app-admin-reportes",
    templateUrl: "./admin_reportes.component.html",
    styleUrls: ["./admin_reportes.component.css"],
    providers: [ReportesService, UtilService]
})
export class AdminReportesComponent {
    modoDios;
    gruposEvaluacion: GrupoEvaluacion[] = null;
    busquedaInput: string;
    grupoSeleccionado: GrupoEvaluacion;
    buscando: boolean = false;

    constructor(private loginService: LoginService,
                private router: Router,
                private reportesService: ReportesService,
                private utilService: UtilService) {
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        this.modoDios = environment.modoDios;
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