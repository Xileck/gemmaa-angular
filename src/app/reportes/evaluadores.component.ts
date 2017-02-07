import {Component, Input} from "@angular/core";
import {GrupoEvaluacion} from "../clases/Reportes/GrupoEvaluacion";
import {UtilService} from "../servicios/util.service";

@Component({
    selector: "app-evaluadores",
    templateUrl: "./evaluadores.component.html",
    styleUrls:["./evaluadores.component.css"]

})
export class EvaluadoresComponent {
    @Input() public grupo :GrupoEvaluacion;
    @Input() public soloEvaluado : boolean = false;
    constructor(private utilService: UtilService) {

    }

}