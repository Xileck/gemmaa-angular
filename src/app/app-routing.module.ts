import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PrincipalComponent} from "./principal/principal.component";
import {MenuAdminComponent} from "./admin/admin_menu.component";
import {AdminEncuestasComponent} from "./admin/admin_encuestas/admin_encuestas.component";
import {BitacoraComponent} from "./admin/admin_encuestas/bitacora.component";
import {AdminUsuariosComponent} from "./admin/admin_usuarios/admin_usuarios.component";
import {AsignarEncuestasComponent} from "./admin/asignar_encuestas/asignar_encuestas.component";
import {EncuestasComponent} from "./encuestas/encuestas_menu.component";
import {ContestarEncuestaComponent} from "./encuestas/contestar_encuesta.component";
import {ReportesComponent} from "./reportes/reportes_menu.component";
import {ReporteEvaluacionComponent} from "./reportes/reporte_evaluacion.component";
import {AdminReportesComponent} from "./admin/admin_reportes/admin_reportes.component";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'principal', component: PrincipalComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: MenuAdminComponent},
    {path: 'asignar_encuestas', component: AsignarEncuestasComponent},
    {path: 'menu_encuestas/:id', component: AdminEncuestasComponent},
    {path: 'encuestas', component: EncuestasComponent},
    {path: 'contestar_encuesta', component: ContestarEncuestaComponent},
    {path: 'reportes', component: ReportesComponent},
    {path: 'bitacora', component: BitacoraComponent},
    {path: 'admin_usuarios', component: AdminUsuariosComponent},
    {path: 'admin_reportes', component: AdminReportesComponent},
    {path: 'reporte_evaluacion/:id', component: ReporteEvaluacionComponent},
    {path: '**', component: PrincipalComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
