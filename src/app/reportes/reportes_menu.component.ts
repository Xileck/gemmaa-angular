import {Component} from "@angular/core";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {ReportesService} from "../servicios/reportes.service";
import {GrupoEvaluacion} from "../clases/Reportes/GrupoEvaluacion";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes_menu.component.html",
  styles: [
    `
            .dp
                {
                    border:10px solid #eee;
                    transition: all 0.2s ease-in-out;
                }
            .dp:hover
                {
                    border:2px solid #eee;
                    transform:rotate(360deg);
                    -ms-transform:rotate(360deg);  
                    -webkit-transform:rotate(360deg);  
                    /*-webkit-font-smoothing:antialiased;*/
                }
            `
  ],
  providers: [ReportesService]
})
export class ReportesComponent {

  evaluaciones: GrupoEvaluacion[];
  evaluacionSeleccionada: GrupoEvaluacion;

  constructor(public loginService: LoginService, public router: Router, private reportesService: ReportesService) {
    if (!loginService.usuarioValidado())
      this.router.navigate(['login']);
    else {
      this.evaluaciones = [];
      this.evaluaciones = reportesService.getEvaluacionesUsuario(loginService.usuario.empleado.nip);
    }
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
