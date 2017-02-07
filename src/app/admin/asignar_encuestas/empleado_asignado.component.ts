import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Empleado} from "../../clases/Usuario/Empleado";
import {UtilService} from "../../servicios/util.service";

@Component({
    selector: "app-empleado-asignado",
    templateUrl: "./empleado_asignado.component.html",
    styles: [`
            
            .error {
    border-left: solid 1.5px;
    border-left-color: red;
}

            `]

})
export class AgregarEmpleadoComponent {

    @Input() empleado: Empleado;
    @Input() titulo: String;
    @Output() empleadoEliminado = new EventEmitter();

    constructor(private utilService: UtilService) {
        this.empleado = new Empleado();
    }


}
