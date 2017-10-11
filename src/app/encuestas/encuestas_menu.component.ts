import {Component, Input, OnInit, ViewEncapsulation, trigger, state, style, transition, animate} from "@angular/core";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {EvaluacionPendiente} from "../clases/EvaluacionPendiente";
import {UtilService} from "../servicios/util.service";
import {AdminService} from "../servicios/administracion.service";
import {EvaluacionService} from "../servicios/evaluacion.service";
import {WindowRef} from "../servicios/WindowRef";
import {DatosEvaluacion} from "../clases/DatosEvaluacion";
import {Empleado} from "../clases/Usuario/Empleado";
import {environment} from "../../environments/environment";

@Component({
    selector: "app-encuestas",
    templateUrl: "./encuestas_menu.component.html",
    styles: [`
#foto{  
float: right;
}
.evaluado_finalizo{
opacity: .4;
background: gray;
font-size: 20px;
}
.emplSeleccionado{
    background: #a7c9e7;
}`],
    encapsulation: ViewEncapsulation.None
})
export class EncuestasComponent implements OnInit {
    servicioEvaluacion: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EvaluacionBO", environment.rutaWebORB, null, null);
    servicioEmpleadoDAO: any = webORB.bind("com.cfemex.lv.EmpleadoDAO", environment.rutaWebORB, null, null);
    servicioEncuesta: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", environment.rutaWebORB, null, null);
    servicioUtil: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.UtilBO", environment.rutaWebORB, null, null);

    evaluacionesPendientes: EvaluacionPendiente[] = [];
    evaluadosDatos: DatosEvaluacion[] = [];
    evaluadoSeleccionado: DatosEvaluacion;
    win: Window;
    fadingPhase: string = 'end';


    constructor(public loginService: LoginService,
                public router: Router,
                private utilService: UtilService,
                private adminService: AdminService,
                public evaluacionService: EvaluacionService,
                private winRef: WindowRef) {
        if (!loginService.usuarioValidado())
            this.router.navigate(['login']);
        else {
            this.evaluacionesPendientes = this.servicioEvaluacion.evaluacionesPendientes(this.loginService.usuario.empleadoNip);
            this.win = winRef.nativeWindow;
        }

    }

    ngOnInit() {
        for (let ev of this.evaluacionesPendientes) {
            let datosEvaluacion = new DatosEvaluacion();
            datosEvaluacion.evaluado = new Empleado();
            Object.assign(datosEvaluacion.evaluado, this.servicioEmpleadoDAO.seleccionarEmpleado(this.servicioUtil.getInfoEvaluado(ev.nip_de_evaluado).rpe));
            datosEvaluacion.encuestaId = ev.idte;
            datosEvaluacion.nombre_encuesta = ev.nombre_encuesta;
            datosEvaluacion.tipo_de_evaluador = ev.tipo_de_evaluador;
            datosEvaluacion.id_evaluacion = ev.id_evaluacion;
            datosEvaluacion.id_evaluador = ev.id_evaluador;
            datosEvaluacion.finalizo = ev.finalizo;
            this.evaluadosDatos.push(datosEvaluacion);
        }

    }

    seleccionarEvaluado(evaluado): void {
        if (this.evaluadoSeleccionado != evaluado) {
            this.evaluadoSeleccionado = evaluado;
            this.win.window.scrollTo(0, 0);
            this.fadingPhase = 'start';
            setTimeout(() => {
                this.fadingPhase = 'end';
            }, 100)
        }
    }

    iniciarEvaluacion(): void {

        Promise.resolve(this.evaluacionService.evaluadorFinalizoEncuesta(this.evaluadoSeleccionado.id_evaluador))
            .then(evaluacionFinalizada => {
                console.log(this.evaluadoSeleccionado.id_evaluador);
                if (evaluacionFinalizada == false) {
                    Object.assign(this.evaluacionService.evaluacion, this.evaluadoSeleccionado);
                    this.router.navigate(['contestar_encuesta']);
                }
                else {
                    this.utilService.mensajeExitoDialogo('La encuesta ya se contesto.')
                }

            });

    }

}
