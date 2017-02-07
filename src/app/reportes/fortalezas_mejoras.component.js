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
var encuesta_1 = require("../clases/Encuesta/encuesta");
var Evaluador_1 = require("../clases/Evaluador");
var FortalezasMejorasComponent = (function () {
    function FortalezasMejorasComponent() {
        this.fortalezas = { cre: [], re: [], atr: [] };
        this.mejoras = { cre: [], re: [], atr: [] };
    }
    FortalezasMejorasComponent.prototype.ngOnInit = function () {
        if (this.evaluador != null) {
            this.getMejorasFortalezasEvaluador(this.evaluador);
            this.encuesta = this.evaluador.encuesta;
        }
        if (this.titulo == null) {
            this.titulo = "Fortalezas y mejoras del rol " + this.evaluador.tipo_de_evaluador.toLowerCase() + "";
        }
        this.eleccion = "resultados_esperados";
    };
    FortalezasMejorasComponent.prototype.getAtributo = function (id_atributo, encuesta) {
        for (var _i = 0, _a = encuesta.atributos; _i < _a.length; _i++) {
            var atr = _a[_i];
            if (atr.idAtributo == id_atributo)
                return atr.nombre;
        }
    };
    FortalezasMejorasComponent.prototype.getResultadoEsperado = function (id_resuldato_esperado, encuesta) {
        for (var _i = 0, _a = encuesta.resultados_esperados; _i < _a.length; _i++) {
            var re = _a[_i];
            if (re.idResultadoEsperado == id_resuldato_esperado)
                return re.descripcion;
        }
    };
    FortalezasMejorasComponent.prototype.getFortalezas = function (seleccion, opcion) {
        var fort = [];
        if (opcion.toLowerCase().indexOf('atr') >= 0) {
            for (var _i = 0, _a = this.fortalezas.atr; _i < _a.length; _i++) {
                var f = _a[_i];
                if (f.idResultadoEsperado == seleccion.idResultadoEsperado)
                    fort.push(f);
            }
        }
        else if (opcion.toLowerCase().indexOf('cre') >= 0) {
            for (var _b = 0, _c = this.fortalezas.cre; _b < _c.length; _b++) {
                var f = _c[_b];
                if (f.idAtributo == seleccion.idAtributo)
                    fort.push(f);
            }
        }
        return fort;
    };
    FortalezasMejorasComponent.prototype.test = function (e) {
        console.log(e);
    };
    FortalezasMejorasComponent.prototype.getMejoras = function (seleccion, opcion) {
        var mejor = [];
        if (opcion.toLowerCase().indexOf('atr') >= 0) {
            for (var _i = 0, _a = this.mejoras.atr; _i < _a.length; _i++) {
                var f = _a[_i];
                if (f.idResultadoEsperado == seleccion.idResultadoEsperado)
                    mejor.push(f);
            }
        }
        else if (opcion.toLowerCase().indexOf('cre') >= 0) {
            for (var _b = 0, _c = this.mejoras.cre; _b < _c.length; _b++) {
                var f = _c[_b];
                if (f.idAtributo == seleccion.idAtributo)
                    mejor.push(f);
            }
        }
        return mejor;
    };
    FortalezasMejorasComponent.prototype.getMejorasFortalezasEvaluador = function (evaluador) {
        for (var _i = 0, _a = evaluador.encuesta.listaCRE; _i < _a.length; _i++) {
            var cre = _a[_i];
            if (Math.round(cre.promedio) >= 3) {
                this.fortalezas.cre.push(cre);
            }
            else if (Math.round(cre.promedio) <= 2)
                this.mejoras.cre.push(cre);
        }
        for (var _b = 0, _c = evaluador.encuesta.atributos; _b < _c.length; _b++) {
            var atr = _c[_b];
            if (Math.round(atr.promedio) >= 3) {
                this.fortalezas.atr.push(atr);
            }
            else if (Math.round(atr.promedio) <= 2)
                this.mejoras.atr.push(atr);
        }
        for (var _d = 0, _e = evaluador.encuesta.resultados_esperados; _d < _e.length; _d++) {
            var re = _e[_d];
            if (Math.round(re.promedio) >= 3) {
                this.fortalezas.re.push(re);
            }
            else if (Math.round(re.promedio) <= 2)
                this.mejoras.re.push(re);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FortalezasMejorasComponent.prototype, "fortalezas", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FortalezasMejorasComponent.prototype, "mejoras", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Evaluador_1.Evaluador)
    ], FortalezasMejorasComponent.prototype, "evaluador", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', encuesta_1.Encuesta)
    ], FortalezasMejorasComponent.prototype, "encuesta", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FortalezasMejorasComponent.prototype, "titulo", void 0);
    FortalezasMejorasComponent = __decorate([
        core_1.Component({
            selector: "app-fortalezas-mejoras",
            templateUrl: "./app/reportes/fortalezas_mejoras.component.html",
            styles: [".seleccion{\n                    background: #a7c9c7;\n            }\ntr:hover{\n     background: #a7c9e7;\n}"]
        }), 
        __metadata('design:paramtypes', [])
    ], FortalezasMejorasComponent);
    return FortalezasMejorasComponent;
}());
exports.FortalezasMejorasComponent = FortalezasMejorasComponent;
//# sourceMappingURL=fortalezas_mejoras.component.js.map