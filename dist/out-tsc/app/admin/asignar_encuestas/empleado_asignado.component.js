var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Empleado } from "../../clases/Usuario/Empleado";
import { UtilService } from "../../servicios/util.service";
export var AgregarEmpleadoComponent = (function () {
    function AgregarEmpleadoComponent(utilService) {
        this.utilService = utilService;
        this.empleadoEliminado = new EventEmitter();
        this.empleado = new Empleado();
    }
    __decorate([
        Input(), 
        __metadata('design:type', Empleado)
    ], AgregarEmpleadoComponent.prototype, "empleado", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], AgregarEmpleadoComponent.prototype, "titulo", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], AgregarEmpleadoComponent.prototype, "empleadoEliminado", void 0);
    AgregarEmpleadoComponent = __decorate([
        Component({
            selector: "app-empleado-asignado",
            templateUrl: "./empleado_asignado.component.html",
            styles: ["\n            \n            .error {\n    border-left: solid 1.5px;\n    border-left-color: red;\n}\n\n            "]
        }), 
        __metadata('design:paramtypes', [UtilService])
    ], AgregarEmpleadoComponent);
    return AgregarEmpleadoComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/admin/asignar_encuestas/empleado_asignado.component.js.map