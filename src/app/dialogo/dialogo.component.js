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
var router_1 = require("@angular/router");
var util_service_1 = require("../servicios/util.service");
var DialogoComponent = (function () {
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
        core_1.Input(), 
        __metadata('design:type', String)
    ], DialogoComponent.prototype, "msg", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DialogoComponent.prototype, "display", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DialogoComponent.prototype, "timer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DialogoComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DialogoComponent.prototype, "finalizo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DialogoComponent.prototype, "tipo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DialogoComponent.prototype, "pagina_regreso", void 0);
    DialogoComponent = __decorate([
        core_1.Component({
            selector: "app-dialogo",
            templateUrl: "./app/dialogo/dialogo.component.html",
            styleUrls: ["./app/dialogo/dialogo.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router, util_service_1.UtilService])
    ], DialogoComponent);
    return DialogoComponent;
}());
exports.DialogoComponent = DialogoComponent;
//# sourceMappingURL=dialogo.component.js.map