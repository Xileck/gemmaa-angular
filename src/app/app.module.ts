import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import{FieldsetModule} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";
import {UtilService} from "./servicios/util.service";
import {AppRoutingModule} from "./app-routing.module";
import {PanelModule} from "primeng/components/panel/panel";
import {ButtonModule} from "primeng/components/button/button";
import {InplaceModule} from "primeng/components/inplace/inplace";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {AccordionModule} from "primeng/components/accordion/accordion";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {DataListModule} from "primeng/components/datalist/datalist";
import {DialogModule} from "primeng/components/dialog/dialog";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";
import {MessagesModule} from "primeng/components/messages/messages";
import {PanelMenuModule} from "primeng/components/panelmenu/panelmenu";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {OverlayPanelModule} from "primeng/components/overlaypanel/overlaypanel";
import {BlockUIModule} from "primeng/components/blockui/blockui";
import {SlideMenuModule} from "primeng/components/slidemenu/slidemenu";
import {RadioButtonModule} from "primeng/components/radiobutton/radiobutton";
import {ChartModule} from "primeng/components/chart/chart";
import {StepsModule} from "primeng/components/steps/steps";
import {ProgressBarModule} from "primeng/components/progressbar/progressbar";
import {TooltipModule} from "primeng/components/tooltip/tooltip";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {SeguridadService} from "./servicios/seguridad.service";
import {PrincipalComponent} from "./principal/principal.component";
import {EncabezadoComponent} from "./encabezado/encabezado.component";
import {FooterComponent} from "./encabezado/footer.component";
import {NavbarComponent} from "./encabezado/navbar.component";
import {GrowlModule} from "primeng/components/growl/growl";
import {DialogoComponent} from "./utilidades/dialogo.component";
import {MenuAdminComponent} from "./admin/admin_menu.component";
import {AdminEncuestasComponent} from "./admin/admin_encuestas/admin_encuestas.component";
import {AdminUsuariosComponent} from "./admin/admin_usuarios/admin_usuarios.component";
import {AdminService} from "./servicios/administracion.service";
import {EvaluacionService} from "./servicios/evaluacion.service";
import {WindowRef} from "./servicios/WindowRef";
import {AsignarEncuestasComponent} from "./admin/asignar_encuestas/asignar_encuestas.component";
import {BitacoraComponent} from "./admin/admin_encuestas/bitacora.component";
import {AgregarEmpleadoComponent} from "./admin/asignar_encuestas/empleado_asignado.component";
import {AsignarPonderadoComponent} from "./admin/asignar_encuestas/asignar_ponderado.component";
import {EncuestasComponent} from "./encuestas/encuestas_menu.component";
import {ContestarEncuestaComponent} from "./encuestas/contestar_encuesta.component";
import {ReportesComponent} from "./reportes/reportes_menu.component";
import {FortalezasMejorasComponent} from "./reportes/fortalezas_mejoras.component";
import {ReporteEvaluacionComponent} from "./reportes/reporte_evaluacion.component";
import {EvaluadoresComponent} from "./reportes/evaluadores.component";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PrincipalComponent,
        EncabezadoComponent,
        FooterComponent,
        NavbarComponent,
        DialogoComponent,
        MenuAdminComponent,
        AdminEncuestasComponent,
        AdminUsuariosComponent,
        AsignarEncuestasComponent,
        BitacoraComponent,
        AgregarEmpleadoComponent,
        AsignarPonderadoComponent,
        EncuestasComponent,
        ContestarEncuestaComponent,
        ReportesComponent,
        FortalezasMejorasComponent,
        ReporteEvaluacionComponent,
        EvaluadoresComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        FieldsetModule,
        AppRoutingModule,
        PanelModule,
        ButtonModule,
        InplaceModule,
        DataTableModule,
        AccordionModule,
        TabViewModule,
        DataListModule,
        DataTableModule,
        DialogModule,
        ConfirmDialogModule,
        MessagesModule,
        PanelMenuModule,
        DropdownModule,
        OverlayPanelModule,
        BlockUIModule,
        SlideMenuModule,
        RadioButtonModule,
        StepsModule,
        ChartModule,
        //ChartsModule,
        ProgressBarModule,
        TooltipModule,
        InputTextModule,
        GrowlModule
    ],
    providers: [
        LoginService,
        AdminService,
        UtilService,
        EvaluacionService,
        //Cambiar idioma a español para fechas, mensajes etc...
        {provide: LOCALE_ID, useValue: "es-MX"},
        WindowRef,
        SeguridadService,
      {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
