import {Component} from "@angular/core";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";
import {UtilService} from "../../servicios/util.service";
declare var webORB: any;

@Component({
    selector: "app-bitacora",
    templateUrl: "./bitacora.component.html"
})
export class BitacoraComponent {

    registros: any;
    servicioBitacora: any = webORB.bind("com.cfemex.lv.is.GEMMAA.BO.BitacoraBO", this.utilService.urlWebOrb, null, null);

    constructor(private loginService: LoginService, private router: Router, private utilService:UtilService) {
        if (!loginService.usuarioValidado() || !loginService.usuario.emplHasAccess('admin'))
            this.router.navigate(['login']);
        this.registros = this.servicioBitacora.getCatalogoEncuesta();

    }
}