import {UtilService} from "../servicios/util.service";
declare var webORB: any;
import {Component} from "@angular/core";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-encabezado",
    templateUrl: "./encabezado.component.html",
    styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent {
    public isCollapsed: boolean = true;

    constructor(public loginService: LoginService, public router: Router, private utilService: UtilService) {
        if (!loginService.usuarioValidado())
            this.router.navigate(['login']);
    }

    logout(): void {
        this.loginService.usuario = null;
        this.router.navigate(['/login']);
    }

    cargarEvaluaciones() {
        this.utilService.displayDialogo('Cargando evaluaciones pendientes', 'info');
        setTimeout(() => {
            this.utilService.reiniciarDialogo();
            this.router.navigate(['/encuestas']);
        }, 100);
    }

} 