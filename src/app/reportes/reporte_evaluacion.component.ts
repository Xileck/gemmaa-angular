import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {ReportesService} from "../servicios/reportes.service";
import {GrupoEvaluacion} from "../clases/Reportes/GrupoEvaluacion";
import {WindowRef} from "../servicios/WindowRef";
import {ComportamientoReactivoEscala} from "../clases/Encuesta/ComportamientoReactivoEscala";
import {Evaluador} from "../clases/Evaluador";
import {Promedios} from "../clases/Reportes/Promedios";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../login/login.service";

//TODO:
//- Agregar promedios de mejoras y fortalezas.
//-

@Component({
    selector: "app-prueba",
    templateUrl: "./reporte_evaluacion.component.html",
    styleUrls: ["./reporte_evaluacion.component.css"],
    providers: [ReportesService],
    encapsulation: ViewEncapsulation.None
})
export class ReporteEvaluacionComponent {
    grupoSeleccionado: GrupoEvaluacion;
    win: Window;
    fortalezas: any = {
        total: {cre: [], re: [], atr: [], nombre: 'total'}
    };
    mejoras: any = {
        total: {cre: [], re: [], atr: [], nombre: 'total'}
    };
    promediosData: any = {evaluador: null, jefe: null, par: null, cliente: null, colaborador: null, total: null};
    dataResultadosEsperados: any;
    dataAtributos: any;
    optionsRadarRE: any;
    optionsRadarATR: any;
    optionsBarGraphs: any;


    constructor(private reportesService: ReportesService,
                private router: Router,
                private winRef: WindowRef,
                private route: ActivatedRoute,
                private loginService: LoginService) {
        if (!this.loginService.usuarioValidado()) {
            this.router.navigate(['login']);
        }
        else {
            this.route.params.forEach((params: Params) => {
                let idEvaluacion = +params['id']; // (+) converts string 'id' to a number
                this.cargarEvaluacion(idEvaluacion);
            });
        }
    }

    cargarEvaluacion(id_eval: number): void {
        Promise.resolve(this.reportesService.getGrupoEvaluacion(id_eval))
            .then(resultadoPromesa => {
                this.grupoSeleccionado = resultadoPromesa;
                Promise.resolve(this.sacarPromediosDeResultadosEsperadosAtributos(this.grupoSeleccionado.evaluadores)).then(op => {
                    for (let evaluador of this.grupoSeleccionado.evaluadores) {
                        for (let cre of evaluador.encuesta.listaCRE) {
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
                    Promise.resolve(this.getPromedioTotal()).then(op => {
                            this.getMejorasFortalezasPromedio(this.fortalezas.total, this.mejoras.total, this.grupoSeleccionado.promedios);
                            this.dataResultadosEsperados = {
                                labels: this.getNombresResultadosEsperados(),
                                datasets: [
                                    {
                                        label: 'Promedio',
                                        backgroundColor: 'rgba(32, 255, 44, 0.2)',
                                        borderColor: 'rgba(32, 255, 44, 1)',
                                        pointBackgroundColor: 'rgba(32, 255, 44, 1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(32, 255, 44, 1)',
                                        data: this.getPromedioTotalFixed('resultados_esperados')
                                    },
                                    {
                                        label: 'Evaluador',
                                        backgroundColor: 'rgba(121, 255, 255,0.2)',
                                        borderColor: 'rgba(121, 255, 255,1)',
                                        pointBackgroundColor: 'rgba(121, 255, 255,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(121, 255, 255,1)',
                                        data: this.getPromediosResultadoEsperados('EVAL')
                                    },
                                    {
                                        label: 'Jefe',
                                        backgroundColor: 'rgba(255,99,132,0.2)',
                                        borderColor: 'rgba(255,99,132,1)',
                                        pointBackgroundColor: 'rgba(255,99,132,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                                        data: this.getPromediosResultadoEsperados('JEFE')
                                    }
                                    ,
                                    {
                                        label: 'Par',
                                        backgroundColor: 'rgba(0, 44, 227,0.2)',
                                        borderColor: 'rgba(0, 44, 227,1)',
                                        pointBackgroundColor: 'rgba(0, 44, 227,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(0, 44, 227,1)',
                                        data: this.getPromediosResultadoEsperados('PAR')
                                    }
                                    ,
                                    {
                                        label: 'Cliente',
                                        backgroundColor: 'rgba(162, 0, 253, 0.3)',
                                        borderColor: 'rgba(162, 0, 253, 0.9)',
                                        pointBackgroundColor: 'rgba(162, 0, 253, 0.9)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(162, 0, 253, 0.9)',
                                        data: this.getPromediosResultadoEsperados('CLIENTE')
                                    }
                                    ,
                                    {
                                        label: 'Colaborador',
                                        backgroundColor: 'rgba(255, 152, 13,0.2)',
                                        borderColor: 'rgba(255, 152, 13,1)',
                                        pointBackgroundColor: 'rgba(255, 152, 13,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(255, 152, 13,1)',
                                        data: this.getPromediosResultadoEsperados('COLAB')
                                    }
                                ]
                            };
                            this.dataAtributos = {
                                labels: this.getNombresAtributos(),
                                datasets: [
                                    {
                                        label: 'Promedio',
                                        backgroundColor: 'rgba(32, 255, 44, 0.2)',
                                        borderColor: 'rgba(32, 255, 44, 1)',
                                        pointBackgroundColor: 'rgba(32, 255, 44, 1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(32, 255, 44, 1)',
                                        data: this.getPromedioTotalFixed('atributos')
                                    },
                                    {
                                        label: 'Evaluador',
                                        backgroundColor: 'rgba(121, 255, 255,0.2)',
                                        borderColor: 'rgba(121, 255, 255,1)',
                                        pointBackgroundColor: 'rgba(121, 255, 255,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(121, 255, 255,1)',
                                        data: this.getPromediosAtributos('EVAL')
                                    },
                                    {
                                        label: 'Jefe',
                                        backgroundColor: 'rgba(255,99,132,0.2)',
                                        borderColor: 'rgba(255,99,132,1)',
                                        pointBackgroundColor: 'rgba(255,99,132,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                                        data: this.getPromediosAtributos('JEFE')
                                    },
                                    {
                                        label: 'Par',
                                        backgroundColor: 'rgba(0, 44, 227,0.2)',
                                        borderColor: 'rgba(0, 44, 227,1)',
                                        pointBackgroundColor: 'rgba(0, 44, 227,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(0, 44, 227,1)',
                                        data: this.getPromediosAtributos('PAR')
                                    },
                                    {
                                        label: 'Cliente',
                                        backgroundColor: 'rgba(162, 0, 253, 0.3)',
                                        borderColor: 'rgba(162, 0, 253, 0.9)',
                                        pointBackgroundColor: 'rgba(162, 0, 253, 0.9)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(162, 0, 253, 0.9)',
                                        data: this.getPromediosAtributos('CLIENTE')
                                    },
                                    {
                                        label: 'Colaborador',
                                        backgroundColor: 'rgba(255, 152, 13,0.2)',
                                        borderColor: 'rgba(255, 152, 13,1)',
                                        pointBackgroundColor: 'rgba(255, 152, 13,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(255, 152, 13,1)',
                                        data: this.getPromediosAtributos('COLAB')
                                    }

                                ]
                            };
                            this.promediosData.evaluador = {
                                labels: this.getNombresAtributos(),
                                datasets: [
                                    {
                                        label: 'Evaluador',
                                        backgroundColor: 'rgba(121, 255, 255,.8)',
                                        borderColor: 'rgba(121, 255, 255,1)',
                                        data: this.getPromediosAtributos('EVAL')
                                    }
                                ]
                            };
                            this.promediosData.par = {
                                labels: this.getNombresAtributos(),
                                datasets: [
                                    {
                                        label: 'Par',
                                        backgroundColor: 'rgba(0, 44, 227,.8)',
                                        borderColor: 'rgba(0, 44, 227,1)',
                                        data: this.getPromediosAtributos('PAR')
                                    }
                                ]
                            };
                            this.promediosData.jefe = {
                                labels: this.getNombresAtributos(),
                                datasets: [
                                    {
                                        label: 'Jefe',
                                        backgroundColor: 'rgba(255,99,132,.8)',
                                        borderColor: 'rgba(255,99,132,1)',
                                        data: this.getPromediosAtributos('JEFE')
                                    }
                                ]
                            };
                            this.promediosData.cliente = {
                                labels: this.getNombresAtributos(),
                                datasets: [
                                    {
                                        label: 'Cliente',
                                        backgroundColor: 'rgba(162, 0, 253, 0.9)',
                                        borderColor: 'rgba(162, 0, 253, 0.9)',
                                        data: this.getPromediosAtributos('CLIENTE')
                                    }
                                ]
                            };
                            this.promediosData.colaborador = {
                                labels: this.getNombresAtributos(),
                                datasets: [
                                    {
                                        label: 'Colaborador',
                                        backgroundColor: 'rgba(255, 152, 13,.8)',
                                        borderColor: 'rgba(255, 152, 13,1)',
                                        data: this.getPromediosAtributos('COLA')
                                    }
                                ]
                            };
                            this.promediosData.total = {
                                labels: this.getNombresAtributos(),
                                datasets: [
                                    {
                                        label: 'Promedio',
                                        backgroundColor: 'rgba(13, 135, 45, 0.8)',
                                        borderColor: 'rgba(13, 135, 45, 1)',
                                        data: this.getPromedioTotalFixed('atr')
                                    }
                                ]
                            };
                        }
                    )
                });
                this.win = this.winRef.nativeWindow;
                this.optionsRadarRE = {
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
                            max: 100
                        }
                    }
                };
                this.optionsRadarATR = {
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Promedio por atributos',
                        fontSize: 16
                    },
                    legend: {
                        position: 'bottom'
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                };
                this.optionsBarGraphs = {
                    scales: {
                        xAxes: [{
                            ticks: {
                                display: false
                            }
                        },],
                        yAxes: [{
                            ticks: {
                                suggestedMax: 100,
                                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                // OR //
                                beginAtZero: true   // min
                            }
                        }]
                    }
                };
            })
    }

    test(event) {
        console.log(event.target);
    }

    getMejorasFortalezasPromedio(fortalezas: any, mejoras: any, promedios: Promedios) {

        for (let cre of promedios.listaCRE) {
            if (Math.round(cre.promedio) >= 3) {
                fortalezas.cre.push(cre);
            }
            else if (Math.round(cre.promedio) <= 2)
                mejoras.cre.push(cre);
        }
        for (let atr of promedios.atributos) {
            if (Math.round(atr.promedio) >= 3) {
                fortalezas.atr.push(atr);
            }
            else if (Math.round(atr.promedio) <= 2)
                mejoras.atr.push(atr);
        }
        for (let re of promedios.resultados_esperados) {
            if (Math.round(re.promedio) >= 3) {
                fortalezas.re.push(re);
            }
            else if (Math.round(re.promedio) <= 2)
                mejoras.re.push(re);
        }
    }

    getMejorasFortalezasEvaluador(fortalezas: any, mejoras: any, evaluador: Evaluador) {

        for (let cre of evaluador.encuesta.listaCRE) {
            if (Math.round(cre.promedio) >= 3) {
                fortalezas.cre.push(cre);
            }
            else if (Math.round(cre.promedio) <= 2)
                mejoras.cre.push(cre);
        }
        for (let atr of evaluador.encuesta.atributos) {
            if (Math.round(atr.promedio) >= 3) {
                fortalezas.atr.push(atr);
            }
            else if (Math.round(atr.promedio) <= 2)
                mejoras.atr.push(atr);
        }
        for (let re of evaluador.encuesta.resultados_esperados) {
            if (Math.round(re.promedio) >= 3) {
                fortalezas.re.push(re);
            }
            else if (Math.round(re.promedio) <= 2)
                mejoras.re.push(re);
        }
    }

    getPonderadoEvaluador(evaluador: Evaluador): number {
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
    }

    getPromedioRE(i: number): number {
        let promedioList: any = [];
        let promedio: number = 0;
        for (let evaluador of this.grupoSeleccionado.evaluadores) {
            promedioList.push((((evaluador.encuesta.resultados_esperados[i].promedio * 100) / 4) / 100) * (this.getPonderadoEvaluador(evaluador) / 100));

        }
        for (let p of promedioList) {
            promedio += p;
        }
        return (promedio * 4);
    }

    getPromedioATR(i: number): number {
        let promedioList: any = [];
        let promedio: number = 0;
        for (let evaluador of this.grupoSeleccionado.evaluadores) {
            promedioList.push((((evaluador.encuesta.atributos[i].promedio * 100) / 4) / 100) * (this.getPonderadoEvaluador(evaluador) / 100));
        }
        for (let p of promedioList) {
            promedio += p;
        }
        return (promedio * 4);
    }

    getPromedioCRE(i: number): number {
        let promedioList: any = [];
        let promedio: number = 0;
        for (let evaluador of this.grupoSeleccionado.evaluadores) {
            promedioList.push((((this.getEscala(evaluador.encuesta.listaCRE[i]) * 100) / 4) / 100) * (this.getPonderadoEvaluador(evaluador) / 100));
        }
        for (let p of promedioList) {
            promedio += p;
        }
        return (promedio * 4);
    }

    getPromedioTotal() {
        for (let i = 0; i < this.grupoSeleccionado.promedios.resultados_esperados.length; i++) {
            this.grupoSeleccionado.promedios.resultados_esperados[i].promedio = Number(this.getPromedioRE(i).toFixed(2));
        }
        for (let i = 0; i < this.grupoSeleccionado.promedios.atributos.length; i++) {
            this.grupoSeleccionado.promedios.atributos[i].promedio = Number(this.getPromedioATR(i).toFixed(2));
        }
        for (let i = 0; i < this.grupoSeleccionado.promedios.listaCRE.length; i++) {
            this.grupoSeleccionado.promedios.listaCRE[i].promedio = Number(this.getPromedioCRE(i).toFixed(2));
        }
    }

    getPromedioTotalFixed(choice: string) {
        let promedio: any = [];
        if (choice.toLowerCase().indexOf('atr') >= 0) {
            for (let atr of this.grupoSeleccionado.promedios.atributos) {
                promedio.push(((atr.promedio * 100) / 4).toFixed(2));
            }
        }
        else if (choice.toLowerCase().indexOf('res') >= 0) {
            for (let re of this.grupoSeleccionado.promedios.resultados_esperados) {
                promedio.push(((re.promedio * 100) / 4).toFixed(2));
            }
        }
        else if (choice.toLowerCase().indexOf('cre') >= 0) {
            for (let cre of this.grupoSeleccionado.promedios.listaCRE) {
                promedio.push(cre.promedio);
            }
        }
        return promedio;
    }

    getNombresResultadosEsperados(): string [] {
        let nombres: string[] = [];
        for (let re of this.grupoSeleccionado.evaluadores[0].encuesta.resultados_esperados) {
            nombres.push(re.descripcion);
        }
        return nombres;
    }

    getNombresAtributos() {
        let nombres: any = [];
        for (let atr of this.grupoSeleccionado.evaluadores[0].encuesta.atributos) {
            nombres.push(atr.nombre);
        }
        return nombres;
    }

    getPromediosResultadoEsperados(tipo_evaluador: string): any {
        let promedios: any = [];
        for (let evaluador of this.grupoSeleccionado.evaluadores) {
            for (let re of evaluador.encuesta.resultados_esperados) {
                if (evaluador.tipo_de_evaluador.indexOf(tipo_evaluador.toUpperCase()) >= 0)
                    promedios.push(((re.promedio * 100) / 4).toFixed(2));
            }
        }
        return promedios;
    }

    getPromediosAtributos(tipo_evaluador: string) {
        let promedios: any = [];
        for (let evaluador of this.grupoSeleccionado.evaluadores) {
            for (let atr of evaluador.encuesta.atributos) {
                if (evaluador.tipo_de_evaluador.indexOf(tipo_evaluador.toUpperCase()) >= 0)
                    promedios.push(((atr.promedio * 100) / 4).toFixed(2));
            }
        }
        return promedios;
    }

    getEscala(cre: ComportamientoReactivoEscala): number {
        if (cre.respuesta == 'A')
            return cre.escala_a;
        else if (cre.respuesta == 'B')
            return cre.escala_b;
        else if (cre.respuesta == 'C')
            return cre.escala_c;
        else if (cre.respuesta == 'D')
            return cre.escala_d;
    }

    sacarPromediosDeResultadosEsperadosAtributos(evaluadores: Evaluador[]) {
        for (let evaluador of evaluadores) {
            for (let re of evaluador.encuesta.resultados_esperados) {
                let count = 0;
                for (let atr of evaluador.encuesta.atributos) {
                    for (let cre of evaluador.encuesta.listaCRE) {
                        if (atr.idAtributo == cre.idAtributo && re.idResultadoEsperado == atr.idResultadoEsperado) {
                            re.promedio += this.getEscala(cre);
                            count++;
                        }
                    }
                }
                re.promedio = (re.promedio / count);
            }
        }
        for (let evaluador of evaluadores) {
            for (let atr of evaluador.encuesta.atributos) {
                let count = 0;
                for (let cre of evaluador.encuesta.listaCRE) {
                    if (atr.idAtributo == cre.idAtributo) {
                        atr.promedio += this.getEscala(cre);
                        count++;
                    }
                }
                atr.promedio = (atr.promedio / count);
            }
        }
    }

    update(chart, chart1, chart2, chart3, chart4, chart5) {
        chart.refresh();
        chart1.refresh();
        chart2.refresh();
        chart3.refresh();
        chart4.refresh();
        chart5.refresh();
    }

}
