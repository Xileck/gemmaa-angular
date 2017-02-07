import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
import Util = jasmine.Util;
import {UtilService} from "../servicios/util.service";


@Component({
    selector: "app-dialogo",
    templateUrl: "./dialogo.component.html",
    styleUrls: ["./dialogo.component.css"]
})
export class DialogoComponent implements OnInit {

    @Input() public msg: string;
    @Input() public display: boolean;
    @Input() public timer: number;
    @Input() public title: string;
    @Input() public finalizo: boolean = false;
    @Input() public tipo: string;
    @Input() public pagina_regreso: string;

    constructor(private router: Router, private utilService: UtilService) {

    }


    ngOnInit() {
        //si tiene un timer se escondera despues del timer seleccionado la variable timer cuenta como milisegundos
        if (this.tipo == null) {
            this.tipo = 'rgba(18, 156, 243, 1)';
            console.error('No se especifico el color del dialogo.')
        }
        else if (this.tipo.toLowerCase() == 'info')
            this.tipo = 'rgba(34, 193, 157, 1)';
        else if (this.tipo.toLowerCase() == 'success')
            this.tipo = 'rgba(44, 219, 16, 1)';
        else if (this.tipo.toLowerCase() == 'warn')
            this.tipo = 'orange';
        else if (this.tipo.toLowerCase() == 'danger')
            this.tipo = 'red'
    }

}