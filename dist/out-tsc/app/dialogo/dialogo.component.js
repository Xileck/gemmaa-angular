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
import { Router } from "@angular/router";
import { UtilService } from "../servicios/util.service";
export var DialogoComponent = (function () {
    function DialogoComponent(router, utilService) {
        this.router = router;
        this.utilService = utilService;
        this.finalizo = false;
    }
    DialogoComponent.prototype.ngOnInit = function () {
        //si tiene un timer se escondera despues del timer seleccionado la variable timer cuenta como milisegundos
        if (this.tipo == null) {
            this.tipo = 'rgba(18, 156, 243, 1)';
            console.error('No se especifico el color del dialogo.');
        }
        else if (this.tipo.toLowerCase() == 'info')
            this.tipo = 'rgba(34, 193, 157, 1)';
        else if (this.tipo.toLowerCase() == 'success')
            this.tipo = 'rgba(44, 219, 16, 1)';
        else if (this.tipo.toLowerCase() == 'warn')
            this.tipo = 'orange';
        else if (this.tipo.toLowerCase() == 'danger')
            this.tipo = 'red';
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], DialogoComponent.prototype, "msg", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], DialogoComponent.prototype, "display", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], DialogoComponent.prototype, "timer", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], DialogoComponent.prototype, "title", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], DialogoComponent.prototype, "finalizo", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], DialogoComponent.prototype, "tipo", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], DialogoComponent.prototype, "pagina_regreso", void 0);
    DialogoComponent = __decorate([
        Component({
            selector: "app-dialogo",
            templateUrl: "./dialogo.component.html",
            styleUrls: ["./dialogo.component.css"]
        }), 
        __metadata('design:paramtypes', [Router, UtilService])
    ], DialogoComponent);
    return DialogoComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/dialogo/dialogo.component.js.map