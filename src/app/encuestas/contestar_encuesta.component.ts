import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/components/common/api";
import {LoginService} from "../login/login.service";
import {EvaluacionService} from "../servicios/evaluacion.service";
import {UtilService} from "../servicios/util.service";
import {DatosEvaluacion} from "../clases/DatosEvaluacion";
import {Encuesta} from "../clases/Encuesta/encuesta";

@Component({
    selector: "app-prueba",
    templateUrl: "./contestar_encuesta.component.html",
    styleUrls: ['./contestar_encuesta.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ContestarEncuestaComponent implements OnInit {

    servicioEncuesta: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", this.utilService.urlWebOrb, null, null);
    encuesta: Encuesta;
    private items: MenuItem[];
    activeIndex: number = 0;
    evaluacionSeleccionada: DatosEvaluacion = new DatosEvaluacion();
    aceptoInstrucciones: boolean = false;
    currentTime = new Date();
    blockedDocument: boolean = false;

    constructor(private router: Router, private loginService: LoginService,
                public evaluacionService: EvaluacionService, private  utilService: UtilService) {
        if (!loginService.usuarioValidado())
            this.router.navigate(['principal']);
    }

    ngOnInit() {
        if (this.evaluacionService.evaluacion != null)
            this.encuesta = this.servicioEncuesta.getEncuesta(this.evaluacionService.evaluacion.encuestaId);
        else
            this.router.navigate(['login']);
        this.items = [];
        for (let re of this.encuesta.resultados_esperados) {
            this.items.push({label: re.descripcion})
        }
        Object.assign(this.evaluacionSeleccionada, this.evaluacionService.evaluacion);
        for (let cre of this.encuesta.listaCRE) {
            cre.contestado = null;
        }
    }

    checkIfCurrentPageIsAnswered(): boolean {
        let correct: boolean = true;
        for (let atr of this.encuesta.atributos) {
            if (atr.idResultadoEsperado == this.encuesta.resultados_esperados[this.activeIndex].idResultadoEsperado) {
                for (let cre of this.encuesta.listaCRE) {
                    if (cre.idAtributo == atr.idAtributo && cre.respuesta == null) {
                        cre.contestado = false;
                        correct = false;
                    }
                }
            }
        }
        return correct;
    }

    siguientePagina(): void {
        if (this.activeIndex < this.items.length - 1 && this.checkIfCurrentPageIsAnswered()) {
            this.activeIndex += 1;
            scroll(0, 0);
        }
        else {
            this.loginService.mensajesGlobales = [];
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error',
                detail: 'Responde todas las preguntas de esta pagina antes de continuar.'
            });
        }
    }

    botonMagico() {
        for (let cre of this.encuesta.listaCRE) {
            let rand = Math.floor((Math.random() * 4) + 1);
            if (rand == 4)
                cre.respuesta = 'A';
            else if (rand == 3)
                cre.respuesta = 'B';
            else if (rand == 2)
                cre.respuesta = 'C';
            else if (rand == 1)
                cre.respuesta = 'D';
            cre.contestado = true;
        }
        this.activeIndex = this.items.length - 1;
    }

    anteriorPagina(): void {
        if (this.activeIndex > 0) {
            this.activeIndex -= 1;
            scroll(0, 0);
        }
    }

    respuestaContestada(cre: any): void {
        if (cre.respuesta != null)
            cre.contestado = true
    }

    terminarEvaluacion(): void {
        for (let cre of this.encuesta.listaCRE) {
            if (cre.respuesta == null) {
                this.loginService.mensajesGlobales = [];
                this.loginService.mensajesGlobales.push({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Responde todas las preguntas de esta pagina antes de continuar.'
                });
                return;
            }
        }
        if (this.aceptoInstrucciones && this.checkIfCurrentPageIsAnswered()) {
            try {
                this.utilService.displayDialogo('Guardando Evaluacion', 'info');
                setTimeout(() => {
                    Promise.resolve(this.evaluacionService.evaluadorFinalizoEncuesta(this.evaluacionService.evaluacion.id_evaluador))
                        .then(evaluacionFinalizada => {
                            if (evaluacionFinalizada == false) {
                                this.servicioEncuesta.guardarEncuestaContestada(this.encuesta.listaCRE, this.evaluacionSeleccionada.id_evaluador);
                                this.utilService.mensajeExitoDialogo('Evaluacion guardada.')
                            }
                            else {
                                this.utilService.mensajeExitoDialogo('La encuesta ya habia sido contestada.')
                            }

                        })

                }, 100);
            } catch (e) {
                alert(JSON.stringify(e));
            }
        }
    }
}
/**
 * Created by Jaime Carballo Diaz on 20/12/2016.
 */
