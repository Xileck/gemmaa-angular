var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from "@angular/core";
import { ReportesService } from "../servicios/reportes.service";
import { WindowRef } from "../servicios/WindowRef";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../login/login.service";
//TODO:
//- Agregar promedios de mejoras y fortalezas.
//-
export var ReporteEvaluacionComponent = (function () {
    function ReporteEvaluacionComponent(reportesService, router, winRef, route, loginService) {
        var _this = this;
        this.reportesService = reportesService;
        this.router = router;
        this.winRef = winRef;
        this.route = route;
        this.loginService = loginService;
        this.fortalezas = {
            total: { cre: [], re: [], atr: [], nombre: 'total' }
        };
        this.mejoras = {
            total: { cre: [], re: [], atr: [], nombre: 'total' }
        };
        this.promediosData = { evaluador: null, jefe: null, par: null, cliente: null, colaborador: null, total: null };
        if (!this.loginService.usuarioValidado()) {
            this.router.navigate(['login']);
        }
        else {
            this.route.params.forEach(function (params) {
                var idEvaluacion = +params['id']; // (+) converts string 'id' to a number
                _this.cargarEvaluacion(idEvaluacion);
            });
        }
    }
    ReporteEvaluacionComponent.prototype.cargarEvaluacion = function (id_eval) {
        var _this = this;
        Promise.resolve(this.reportesService.getGrupoEvaluacion(id_eval))
            .then(function (resultadoPromesa) {
            _this.grupoSeleccionado = resultadoPromesa;
            Promise.resolve(_this.sacarPromediosDeResultadosEsperadosAtributos(_this.grupoSeleccionado.evaluadores)).then(function (op) {
                for (var _i = 0, _a = _this.grupoSeleccionado.evaluadores; _i < _a.length; _i++) {
                    var evaluador = _a[_i];
                    for (var _b = 0, _c = evaluador.encuesta.listaCRE; _b < _c.length; _b++) {
                        var cre = _c[_b];
                        if (cre.respuesta == 'A') {
                            cre.promedio = cre.escala_a;
                        }
                        else if (cre.respuesta == 'B')
                            cre.promedio = cre.escala_b;
                        else if (cre.respuesta == 'C')
                            cre.promedio = cre.escala_c;
                        else if (cre.respuesta == 'D')
                            cre.promedio = cre.escala_d;
                    }
                }
                Promise.resolve(_this.getPromedioTotal()).then(function (op) {
                    _this.getMejorasFortalezasPromedio(_this.fortalezas.total, _this.mejoras.total, _this.grupoSeleccionado.promedios);
                    _this.dataResultadosEsperados = {
                        labels: _this.getNombresResultadosEsperados(),
                        datasets: [
                            {
                                label: 'Promedio',
                                backgroundColor: 'rgba(32, 255, 44, 0.2)',
                                borderColor: 'rgba(32, 255, 44, 1)',
                                pointBackgroundColor: 'rgba(32, 255, 44, 1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(32, 255, 44, 1)',
                                data: _this.getPromedioTotalFixed('resultados_esperados')
                            },
                            {
                                label: 'Evaluador',
                                backgroundColor: 'rgba(121, 255, 255,0.2)',
                                borderColor: 'rgba(121, 255, 255,1)',
                                pointBackgroundColor: 'rgba(121, 255, 255,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(121, 255, 255,1)',
                                data: _this.getPromediosResultadoEsperados('EVAL')
                            },
                            {
                                label: 'Jefe',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                pointBackgroundColor: 'rgba(255,99,132,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(255,99,132,1)',
                                data: _this.getPromediosResultadoEsperados('JEFE')
                            },
                            {
                                label: 'Par',
                                backgroundColor: 'rgba(0, 44, 227,0.2)',
                                borderColor: 'rgba(0, 44, 227,1)',
                                pointBackgroundColor: 'rgba(0, 44, 227,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(0, 44, 227,1)',
                                data: _this.getPromediosResultadoEsperados('PAR')
                            },
                            {
                                label: 'Cliente',
                                backgroundColor: 'rgba(162, 0, 253, 0.3)',
                                borderColor: 'rgba(162, 0, 253, 0.9)',
                                pointBackgroundColor: 'rgba(162, 0, 253, 0.9)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(162, 0, 253, 0.9)',
                                data: _this.getPromediosResultadoEsperados('CLIENTE')
                            },
                            {
                                label: 'Colaborador',
                                backgroundColor: 'rgba(255, 152, 13,0.2)',
                                borderColor: 'rgba(255, 152, 13,1)',
                                pointBackgroundColor: 'rgba(255, 152, 13,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(255, 152, 13,1)',
                                data: _this.getPromediosResultadoEsperados('COLAB')
                            }
                        ]
                    };
                    _this.dataAtributos = {
                        labels: _this.getNombresAtributos(),
                        datasets: [
                            {
                                label: 'Promedio',
                                backgroundColor: 'rgba(32, 255, 44, 0.2)',
                                borderColor: 'rgba(32, 255, 44, 1)',
                                pointBackgroundColor: 'rgba(32, 255, 44, 1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(32, 255, 44, 1)',
                                data: _this.getPromedioTotalFixed('atributos')
                            },
                            {
                                label: 'Evaluador',
                                backgroundColor: 'rgba(121, 255, 255,0.2)',
                                borderColor: 'rgba(121, 255, 255,1)',
                                pointBackgroundColor: 'rgba(121, 255, 255,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(121, 255, 255,1)',
                                data: _this.getPromediosAtributos('EVAL')
                            },
                            {
                                label: 'Jefe',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                pointBackgroundColor: 'rgba(255,99,132,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(255,99,132,1)',
                                data: _this.getPromediosAtributos('JEFE')
                            },
                            {
                                label: 'Par',
                                backgroundColor: 'rgba(0, 44, 227,0.2)',
                                borderColor: 'rgba(0, 44, 227,1)',
                                pointBackgroundColor: 'rgba(0, 44, 227,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(0, 44, 227,1)',
                                data: _this.getPromediosAtributos('PAR')
                            },
                            {
                                label: 'Cliente',
                                backgroundColor: 'rgba(162, 0, 253, 0.3)',
                                borderColor: 'rgba(162, 0, 253, 0.9)',
                                pointBackgroundColor: 'rgba(162, 0, 253, 0.9)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(162, 0, 253, 0.9)',
                                data: _this.getPromediosAtributos('CLIENTE')
                            },
                            {
                                label: 'Colaborador',
                                backgroundColor: 'rgba(255, 152, 13,0.2)',
                                borderColor: 'rgba(255, 152, 13,1)',
                                pointBackgroundColor: 'rgba(255, 152, 13,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(255, 152, 13,1)',
                                data: _this.getPromediosAtributos('COLAB')
                            }
                        ]
                    };
                    _this.promediosData.evaluador = {
                        labels: _this.getNombresAtributos(),
                        datasets: [
                            {
                                label: 'Evaluador',
                                backgroundColor: 'rgba(121, 255, 255,.8)',
                                borderColor: 'rgba(121, 255, 255,1)',
                                data: _this.getPromediosAtributos('EVAL')
                            }
                        ]
                    };
                    _this.promediosData.par = {
                        labels: _this.getNombresAtributos(),
                        datasets: [
                            {
                                label: 'Par',
                                backgroundColor: 'rgba(0, 44, 227,.8)',
                                borderColor: 'rgba(0, 44, 227,1)',
                                data: _this.getPromediosAtributos('PAR')
                            }
                        ]
                    };
                    _this.promediosData.jefe = {
                        labels: _this.getNombresAtributos(),
                        datasets: [
                            {
                                label: 'Jefe',
                                backgroundColor: 'rgba(255,99,132,.8)',
                                borderColor: 'rgba(255,99,132,1)',
                                data: _this.getPromediosAtributos('JEFE')
                            }
                        ]
                    };
                    _this.promediosData.cliente = {
                        labels: _this.getNombresAtributos(),
                        datasets: [
                            {
                                label: 'Cliente',
                                backgroundColor: 'rgba(162, 0, 253, 0.9)',
                                borderColor: 'rgba(162, 0, 253, 0.9)',
                                data: _this.getPromediosAtributos('CLIENTE')
                            }
                        ]
                    };
                    _this.promediosData.colaborador = {
                        labels: _this.getNombresAtributos(),
                        datasets: [
                            {
                                label: 'Colaborador',
                                backgroundColor: 'rgba(255, 152, 13,.8)',
                                borderColor: 'rgba(255, 152, 13,1)',
                                data: _this.getPromediosAtributos('COLA')
                            }
                        ]
                    };
                    _this.promediosData.total = {
                        labels: _this.getNombresAtributos(),
                        datasets: [
                            {
                                label: 'Promedio',
                                backgroundColor: 'rgba(13, 135, 45, 0.8)',
                                borderColor: 'rgba(13, 135, 45, 1)',
                                data: _this.getPromedioTotalFixed('atr')
                            }
                        ]
                    };
                });
            });
            _this.win = _this.winRef.nativeWindow;
            _this.optionsRadarRE = {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Promedio por resultados esperados',
                    fontSize: 16
                },
                legend: {
                    position: 'bottom'
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 4
                    }
                }
            };
            _this.optionsRadarATR = {
                title: {
                    display: true,
                    text: 'Promedio por atributos',
                    fontSize: 16
                },
                label: {
                    display: false
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 4
                    }
                }
            };
            _this.optionsBarGraphs = {
                scales: {
                    xAxes: [{
                            ticks: {
                                display: false
                            }
                        },],
                    yAxes: [{
                            ticks: {
                                suggestedMax: 4,
                                suggestedMin: 0,
                                // OR //
                                beginAtZero: true // min
                            }
                        }]
                }
            };
        });
    };
    ReporteEvaluacionComponent.prototype.test = function (event) {
        console.log(event.target);
    };
    ReporteEvaluacionComponent.prototype.getMejorasFortalezasPromedio = function (fortalezas, mejoras, promedios) {
        for (var _i = 0, _a = promedios.listaCRE; _i < _a.length; _i++) {
            var cre = _a[_i];
            if (Math.round(cre.promedio) >= 3) {
                fortalezas.cre.push(cre);
            }
            else if (Math.round(cre.promedio) <= 2)
                mejoras.cre.push(cre);
        }
        for (var _b = 0, _c = promedios.atributos; _b < _c.length; _b++) {
            var atr = _c[_b];
            if (Math.round(atr.promedio) >= 3) {
                fortalezas.atr.push(atr);
            }
            else if (Math.round(atr.promedio) <= 2)
                mejoras.atr.push(atr);
        }
        for (var _d = 0, _e = promedios.resultados_esperados; _d < _e.length; _d++) {
            var re = _e[_d];
            if (Math.round(re.promedio) >= 3) {
                fortalezas.re.push(re);
            }
            else if (Math.round(re.promedio) <= 2)
                mejoras.re.push(re);
        }
    };
    ReporteEvaluacionComponent.prototype.getMejorasFortalezasEvaluador = function (fortalezas, mejoras, evaluador) {
        for (var _i = 0, _a = evaluador.encuesta.listaCRE; _i < _a.length; _i++) {
            var cre = _a[_i];
            if (Math.round(cre.promedio) >= 3) {
                fortalezas.cre.push(cre);
            }
            else if (Math.round(cre.promedio) <= 2)
                mejoras.cre.push(cre);
        }
        for (var _b = 0, _c = evaluador.encuesta.atributos; _b < _c.length; _b++) {
            var atr = _c[_b];
            if (Math.round(atr.promedio) >= 3) {
                fortalezas.atr.push(atr);
            }
            else if (Math.round(atr.promedio) <= 2)
                mejoras.atr.push(atr);
        }
        for (var _d = 0, _e = evaluador.encuesta.resultados_esperados; _d < _e.length; _d++) {
            var re = _e[_d];
            if (Math.round(re.promedio) >= 3) {
                fortalezas.re.push(re);
            }
            else if (Math.round(re.promedio) <= 2)
                mejoras.re.push(re);
        }
    };
    ReporteEvaluacionComponent.prototype.getPonderadoEvaluador = function (evaluador) {
        if (evaluador.tipo_de_evaluador.indexOf('EVAL') >= 0) {
            return this.grupoSeleccionado.ponderados.evaluado;
        }
        else if (evaluador.tipo_de_evaluador.indexOf('PAR') >= 0) {
            return this.grupoSeleccionado.ponderados.par;
        }
        else if (evaluador.tipo_de_evaluador.indexOf('JEFE') >= 0) {
            return this.grupoSeleccionado.ponderados.jefe;
        }
        else if (evaluador.tipo_de_evaluador.indexOf('COLAB') >= 0) {
            return this.grupoSeleccionado.ponderados.colaborador;
        }
        else if (evaluador.tipo_de_evaluador.indexOf('CLIENTE') >= 0) {
            return this.grupoSeleccionado.ponderados.cliente;
        }
        else
            return null;
    };
    ReporteEvaluacionComponent.prototype.getPromedioRE = function (i) {
        var promedioList = [];
        var promedio = 0;
        for (var _i = 0, _a = this.grupoSeleccionado.evaluadores; _i < _a.length; _i++) {
            var evaluador = _a[_i];
            promedioList.push((((evaluador.encuesta.resultados_esperados[i].promedio * 100) / 4) / 100) * (this.getPonderadoEvaluador(evaluador) / 100));
        }
        for (var _b = 0, promedioList_1 = promedioList; _b < promedioList_1.length; _b++) {
            var p = promedioList_1[_b];
            promedio += p;
        }
        return (promedio * 4);
    };
    ReporteEvaluacionComponent.prototype.getPromedioATR = function (i) {
        var promedioList = [];
        var promedio = 0;
        for (var _i = 0, _a = this.grupoSeleccionado.evaluadores; _i < _a.length; _i++) {
            var evaluador = _a[_i];
            promedioList.push((((evaluador.encuesta.atributos[i].promedio * 100) / 4) / 100) * (this.getPonderadoEvaluador(evaluador) / 100));
        }
        for (var _b = 0, promedioList_2 = promedioList; _b < promedioList_2.length; _b++) {
            var p = promedioList_2[_b];
            promedio += p;
        }
        return (promedio * 4);
    };
    ReporteEvaluacionComponent.prototype.getPromedioCRE = function (i) {
        var promedioList = [];
        var promedio = 0;
        for (var _i = 0, _a = this.grupoSeleccionado.evaluadores; _i < _a.length; _i++) {
            var evaluador = _a[_i];
            promedioList.push((((this.getEscala(evaluador.encuesta.listaCRE[i]) * 100) / 4) / 100) * (this.getPonderadoEvaluador(evaluador) / 100));
        }
        for (var _b = 0, promedioList_3 = promedioList; _b < promedioList_3.length; _b++) {
            var p = promedioList_3[_b];
            promedio += p;
        }
        return (promedio * 4);
    };
    ReporteEvaluacionComponent.prototype.getPromedioTotal = function () {
        for (var i = 0; i < this.grupoSeleccionado.promedios.resultados_esperados.length; i++) {
            this.grupoSeleccionado.promedios.resultados_esperados[i].promedio = Number(this.getPromedioRE(i).toFixed(2));
        }
        for (var i = 0; i < this.grupoSeleccionado.promedios.atributos.length; i++) {
            this.grupoSeleccionado.promedios.atributos[i].promedio = Number(this.getPromedioATR(i).toFixed(2));
        }
        for (var i = 0; i < this.grupoSeleccionado.promedios.listaCRE.length; i++) {
            this.grupoSeleccionado.promedios.listaCRE[i].promedio = Number(this.getPromedioCRE(i).toFixed(2));
        }
    };
    ReporteEvaluacionComponent.prototype.getPromedioTotalFixed = function (choice) {
        var promedio = [];
        if (choice.toLowerCase().indexOf('atr') >= 0) {
            for (var _i = 0, _a = this.grupoSeleccionado.promedios.atributos; _i < _a.length; _i++) {
                var atr = _a[_i];
                promedio.push(atr.promedio);
            }
        }
        else if (choice.toLowerCase().indexOf('res') >= 0) {
            for (var _b = 0, _c = this.grupoSeleccionado.promedios.resultados_esperados; _b < _c.length; _b++) {
                var re = _c[_b];
                promedio.push(re.promedio);
            }
        }
        else if (choice.toLowerCase().indexOf('cre') >= 0) {
            for (var _d = 0, _e = this.grupoSeleccionado.promedios.listaCRE; _d < _e.length; _d++) {
                var cre = _e[_d];
                promedio.push(cre.promedio);
            }
        }
        return promedio;
    };
    ReporteEvaluacionComponent.prototype.getNombresResultadosEsperados = function () {
        var nombres = [];
        for (var _i = 0, _a = this.grupoSeleccionado.evaluadores[0].encuesta.resultados_esperados; _i < _a.length; _i++) {
            var re = _a[_i];
            nombres.push(re.descripcion);
        }
        return nombres;
    };
    ReporteEvaluacionComponent.prototype.getNombresAtributos = function () {
        var nombres = [];
        for (var _i = 0, _a = this.grupoSeleccionado.evaluadores[0].encuesta.atributos; _i < _a.length; _i++) {
            var atr = _a[_i];
            nombres.push(atr.nombre);
        }
        return nombres;
    };
    ReporteEvaluacionComponent.prototype.getPromediosResultadoEsperados = function (tipo_evaluador) {
        var promedios = [];
        for (var _i = 0, _a = this.grupoSeleccionado.evaluadores; _i < _a.length; _i++) {
            var evaluador = _a[_i];
            for (var _b = 0, _c = evaluador.encuesta.resultados_esperados; _b < _c.length; _b++) {
                var re = _c[_b];
                if (evaluador.tipo_de_evaluador.indexOf(tipo_evaluador.toUpperCase()) >= 0)
                    promedios.push(re.promedio.toFixed(2));
            }
        }
        return promedios;
    };
    ReporteEvaluacionComponent.prototype.getPromediosAtributos = function (tipo_evaluador) {
        var promedios = [];
        for (var _i = 0, _a = this.grupoSeleccionado.evaluadores; _i < _a.length; _i++) {
            var evaluador = _a[_i];
            for (var _b = 0, _c = evaluador.encuesta.atributos; _b < _c.length; _b++) {
                var atr = _c[_b];
                if (evaluador.tipo_de_evaluador.indexOf(tipo_evaluador.toUpperCase()) >= 0)
                    promedios.push(atr.promedio.toFixed(2));
            }
        }
        return promedios;
    };
    ReporteEvaluacionComponent.prototype.getEscala = function (cre) {
        if (cre.respuesta == 'A')
            return cre.escala_a;
        else if (cre.respuesta == 'B')
            return cre.escala_b;
        else if (cre.respuesta == 'C')
            return cre.escala_c;
        else if (cre.respuesta == 'D')
            return cre.escala_d;
    };
    ReporteEvaluacionComponent.prototype.sacarPromediosDeResultadosEsperadosAtributos = function (evaluadores) {
        for (var _i = 0, evaluadores_1 = evaluadores; _i < evaluadores_1.length; _i++) {
            var evaluador = evaluadores_1[_i];
            for (var _a = 0, _b = evaluador.encuesta.resultados_esperados; _a < _b.length; _a++) {
                var re = _b[_a];
                var count = 0;
                for (var _c = 0, _d = evaluador.encuesta.atributos; _c < _d.length; _c++) {
                    var atr = _d[_c];
                    for (var _e = 0, _f = evaluador.encuesta.listaCRE; _e < _f.length; _e++) {
                        var cre = _f[_e];
                        if (atr.idAtributo == cre.idAtributo && re.idResultadoEsperado == atr.idResultadoEsperado) {
                            re.promedio += this.getEscala(cre);
                            count++;
                        }
                    }
                }
                re.promedio = re.promedio / count;
            }
        }
        for (var _g = 0, evaluadores_2 = evaluadores; _g < evaluadores_2.length; _g++) {
            var evaluador = evaluadores_2[_g];
            for (var _h = 0, _j = evaluador.encuesta.atributos; _h < _j.length; _h++) {
                var atr = _j[_h];
                var count = 0;
                for (var _k = 0, _l = evaluador.encuesta.listaCRE; _k < _l.length; _k++) {
                    var cre = _l[_k];
                    if (atr.idAtributo == cre.idAtributo) {
                        atr.promedio += this.getEscala(cre);
                        count++;
                    }
                }
                atr.promedio = atr.promedio / count;
            }
        }
    };
    ReporteEvaluacionComponent.prototype.update = function (chart, chart1, chart2, chart3, chart4, chart5) {
        chart.refresh();
        chart1.refresh();
        chart2.refresh();
        chart3.refresh();
        chart4.refresh();
        chart5.refresh();
    };
    ReporteEvaluacionComponent = __decorate([
        Component({
            selector: "app-prueba",
            templateUrl: "./reporte_evaluacion.component.html",
            styleUrls: ["./reporte_evaluacion.component.css"],
            providers: [ReportesService],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ReportesService, Router, WindowRef, ActivatedRoute, LoginService])
    ], ReporteEvaluacionComponent);
    return ReporteEvaluacionComponent;
}());
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/reportes/reporte_evaluacion.component.js.map