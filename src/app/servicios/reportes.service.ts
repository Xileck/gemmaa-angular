/**
 * Created by Jaime Carballo Diaz on 07/12/2016.
 */
import {Injectable} from '@angular/core';
import {UtilService} from "./util.service";

@Injectable()
export class ReportesService {
    servicioReportes: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.ReportesBO", this.utilService.urlWebOrb, null, null);

    constructor(private utilService: UtilService) {

    }

    getIdEvaluaciones(nip_usuario: number): number[] {
        return this.servicioReportes.getIdEvaluaciones(nip_usuario);
    }

    getGrupoEvaluacion(id_evaluacion: number) {
        return this.servicioReportes.getGrupoEvaluacion(id_evaluacion);
    }

    getEvaluacionesUsuario(nip: number) {
        return this.servicioReportes.getEvaluacionesDeUsuario(nip);
    }
}