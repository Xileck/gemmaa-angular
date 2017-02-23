var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from "./principal/principal.component";
import { MenuAdminComponent } from "./admin/admin_menu.component";
import { AdminEncuestasComponent } from "./admin/admin_encuestas/admin_encuestas.component";
import { AdminUsuariosComponent } from "./admin/admin_usuarios/admin_usuarios.component";
import { AsignarEncuestasComponent } from "./admin/asignar_encuestas/asignar_encuestas.component";
import { EncuestasComponent } from "./encuestas/encuestas_menu.component";
import { ContestarEncuestaComponent } from "./encuestas/contestar_encuesta.component";
import { ReportesComponent } from "./reportes/reportes_menu.component";
import { ReporteEvaluacionComponent } from "./reportes/reporte_evaluacion.component";
import { AdminReportesComponent } from "./admin/admin_reportes/admin_reportes.component";
var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'principal', component: PrincipalComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: MenuAdminComponent },
    { path: 'asignar_encuestas', component: AsignarEncuestasComponent },
    { path: 'menu_encuestas/:id', component: AdminEncuestasComponent },
    { path: 'encuestas', component: EncuestasComponent },
    { path: 'contestar_encuesta', component: ContestarEncuestaComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'admin_usuarios', component: AdminUsuariosComponent },
    { path: 'admin_reportes', component: AdminReportesComponent },
    { path: 'reporte_evaluacion/:id', component: ReporteEvaluacionComponent },
    { path: '**', component: PrincipalComponent }
];
export var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/app-routing.module.js.map