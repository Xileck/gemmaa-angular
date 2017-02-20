// Pendientes:
// cambiar minusculas a mayusculas cuando se esta escribiendo dinamicamente.
// Arreglar que el usuario puede presionar multiple veces el boton.
import {LoginService} from "../login/login.service";
declare var webORB: any;
import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UtilService} from "../servicios/util.service";

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styles: ['li { cursor: pointer; cursor: hand; }']
})
export class PrincipalComponent {
    constructor(public loginService: LoginService, public router: Router, private utilService: UtilService) {
        if (!loginService.usuarioValidado())
            this.router.navigate(['login']);
    }

    cargarEvaluaciones() {
    this.utilService.displayDialogo('Cargando evaluaciones pendientes', 'info');
    setTimeout(() => {
        this.utilService.reiniciarDialogo();
        this.router.navigate(['/encuestas']);
    }, 100);
}

    cargarReportes() {
        this.utilService.displayDialogo('Cargando reportes', 'info');
        setTimeout(() => {
            this.utilService.reiniciarDialogo();
            this.router.navigate(['/reportes']);
        }, 100);
    }
}