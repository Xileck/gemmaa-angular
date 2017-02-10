/**
 * Created by Jaime Carballo Diaz on 07/12/2016.
 */
import {Injectable} from '@angular/core';
import {DatosEvaluacion} from "../clases/DatosEvaluacion";
import {UtilService} from "./util.service";
import {environment} from "../../environments/environment";

@Injectable()
export class EvaluacionService {
    servicioEvaluacion: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EvaluacionBO", environment.rutaWebORB, null, null);
    evaluacion: DatosEvaluacion = new DatosEvaluacion();

    constructor(private utilService: UtilService) {
    }

    evaluadorFinalizoEncuesta(id_evaluador) : boolean{
        return this.servicioEvaluacion.evaluacionFinalizada(id_evaluador);
    }

}