/**
 * Created by JCDI on 07/12/2016.
 */
import {Injectable} from '@angular/core';
import {UtilService} from "./util.service";
import {Ponderados} from "../clases/Reportes/Ponderados";
import {environment} from "../../environments/environment";

@Injectable()
export class EncuestaService {

    servicioEncuesta: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", environment.rutaWebORB, null, null);

    constructor() {

    }

    getEncuesta(idEncuesta: number): any {
        return this.servicioEncuesta.getEncuesta(idEncuesta)
    }

    getListaPonderados(): Ponderados[] {
        return this.servicioEncuesta.getListaPonderados();
    }

    insertarPonderados(ponderado): void {
        this.servicioEncuesta.insertarPonderados(ponderado);
    }

    guardarEncuestaContestada(listaCRE, idEvaluador): void {
        this.guardarEncuestaContestada(listaCRE, idEvaluador)
    }

}