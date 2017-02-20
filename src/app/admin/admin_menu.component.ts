import {Component} from "@angular/core";
import {LoginService} from "../login/login.service";
import {Router, ActivatedRoute} from "@angular/router";
import {UtilService} from "../servicios/util.service";
import {environment} from "../../environments/environment";

@Component({
    selector: "app-admin",
    templateUrl: "./admin_menu.component.html",
    styles: ['li { cursor: pointer; cursor: hand; }']

})
export class MenuAdminComponent {
    display: boolean = false;
    encuesta: any;
    catalogoEncuestas: any;
    servicio: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.EncuestaBO", environment.rutaWebORB, null, null);

    dialogo = {
        finalizo: false,
        display: false,
        msg: 'Espera un momento',
        title: 'Cargando panel de administración de usuarios',
        timer: null,
        tipo: 'info'
    }


    constructor(private route: ActivatedRoute, public loginService: LoginService, public router: Router, private utilService: UtilService) {
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        this.catalogoEncuestas = this.servicio.getCatalogoEncuestas();
    }

    cargarEncuesta(idEncuesta: number): void {
        this.router.navigate(['/menu_encuestas', idEncuesta]);
    }

    cargarAdminUsuarios() {
        this.utilService.displayDialogo('Cargando panel de administración de usuarios', 'info');
        setTimeout(() => {
            this.utilService.reiniciarDialogo();
            this.router.navigate(['/admin_usuarios']);
        }, 100);
    }

} 