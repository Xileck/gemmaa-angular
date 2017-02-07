"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Empleado_1 = require("../../clases/Usuario/Empleado");
var util_service_1 = require("../../servicios/util.service");
var AgregarEmpleadoComponent = (function () {
    function AgregarEmpleadoComponent(utilService) {
        this.utilService = utilService;
        this.empleadoEliminado = new core_1.EventEmitter();
        this.empleado = new Empleado_1.Empleado();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Empleado_1.Empleado)
    ], AgregarEmpleadoComponent.prototype, "empleado", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AgregarEmpleadoComponent.prototype, "titulo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AgregarEmpleadoComponent.prototype, "empleadoEliminado", void 0);
    AgregarEmpleadoComponent = __decorate([
        core_1.Component({
            selector: "app-empleado-asignado",
            templateUrl: "app/admin/asignar_encuestas/empleado_asignado.component.html",
            styles: ["\n            \n            .error {\n    border-left: solid 1.5px;\n    border-left-color: red;\n}\n\n            "]
        }), 
        __metadata('design:paramtypes', [util_service_1.UtilService])
    ], AgregarEmpleadoComponent);
    return AgregarEmpleadoComponent;
}());
exports.AgregarEmpleadoComponent = AgregarEmpleadoComponent;
//# sourceMappingURL=empleado_asignado.component.js.map