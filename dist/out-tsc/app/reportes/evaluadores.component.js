var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { GrupoEvaluacion } from "../clases/Reportes/GrupoEvaluacion";
import { UtilService } from "../servicios/util.service";
export var EvaluadoresComponent = (function () {
    function EvaluadoresComponent(utilService) {
        this.utilService = utilService;
        this.soloEvaluado = false;
    }
    __decorate([
        Input(), 
        __metadata('design:type', GrupoEvaluacion)
    ], EvaluadoresComponent.prototype, "grupo", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], EvaluadoresComponent.prototype, "soloEvaluado", void 0);
    EvaluadoresComponent = __decorate([
        Component({
            selector: "app-evaluadores",
            templateUrl: "./evaluadores.component.html",
            styleUrls: ["./evaluadores.component.css"]
        }), 
        __metadata('design:paramtypes', [UtilService])
    ], EvaluadoresComponent);
    return EvaluadoresComponent;
}());
//# sourceMappingURL=C:/Users/cfe/Desktop/GEMMAA_CLI/src/app/reportes/evaluadores.component.js.map