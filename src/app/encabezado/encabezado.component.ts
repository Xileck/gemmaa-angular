import {UtilService} from "../servicios/util.service";
declare var webORB: any;
import {Component, ViewEncapsulation} from "@angular/core";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-encabezado",
    templateUrl: "./encabezado.component.html",
    styles: [`
                li { cursor: pointer; cursor: hand; }
                            #left{float:left;display:inline-block;}
                            #right{float:right;display:inline-block;}
                            #center{margin:0 auto;}
                            h5{
                    margin:0;
                    padding:0;
                }
                h6{
                    margin:0;
                    padding:0;
                }
                body{padding-top:30px;}
                
                    .glyphicon {  margin-bottom: 10px;margin-right: 10px;}
                
                small {
                    display: block;
                    line-height: 1.428571429;
                
                color: #999;
                } `]
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