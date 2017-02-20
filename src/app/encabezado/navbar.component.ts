import {Component} from "@angular/core";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {UtilService} from "../servicios/util.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styles: ['li { cursor: pointer; cursor: hand; }']
})
export class NavbarComponent {
    currentPath: string = 'principal';

    constructor(public loginService: LoginService, public router: Router, private utilService: UtilService) {
        router.events.subscribe((val) => {
            this.currentPath = val.url;
            this.isIn = false;
        });
    }

    isIn = false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
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

    cargarReportes() {
        this.utilService.displayDialogo('Cargando reportes', 'info');
        setTimeout(() => {
            this.utilService.reiniciarDialogo();
            this.router.navigate(['/reportes']);
        }, 100);
    }
}
