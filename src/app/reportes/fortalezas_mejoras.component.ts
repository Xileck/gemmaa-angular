import {Component, Input, OnInit} from "@angular/core";
import {Encuesta} from "../clases/Encuesta/encuesta";
import {Evaluador} from "../clases/Evaluador";

@Component({
    selector: "app-fortalezas-mejoras",
    templateUrl: "./fortalezas_mejoras.component.html",
    styles: [`.seleccion{
                    background: #a7c9c7;
            }
tr:hover{
     background: #a7c9e7;
}`]
})
export class FortalezasMejorasComponent implements OnInit {

    @Input() fortalezas: any = {cre: [], re: [], atr: []};
    @Input() mejoras: any = {cre: [], re: [], atr: []};
    @Input() evaluador: Evaluador;
    @Input() encuesta: Encuesta;
    @Input() titulo;
    seleccion: any;
    eleccion: string;

    ngOnInit() {
        if (this.evaluador != null) {
            this.getMejorasFortalezasEvaluador(this.evaluador);
            this.encuesta = this.evaluador.encuesta;
        }
        if (this.titulo == null) {
            this.titulo = "Fortalezas y mejoras del rol " + this.evaluador.tipo_de_evaluador.toLowerCase() + "";
        }
        this.eleccion = "resultados_esperados";
    }

    getAtributo(id_atributo: number, encuesta: Encuesta): string {
        for (let atr of encuesta.atributos) {
            if (atr.idAtributo == id_atributo)
                return atr.nombre;
        }
    }

    getResultadoEsperado(id_resuldato_esperado: number, encuesta: Encuesta): string {
        for (let re of encuesta.resultados_esperados) {
            if (re.idResultadoEsperado == id_resuldato_esperado)
                return re.descripcion;
        }
    }

    getFortalezas(seleccion: any, opcion: string): any {
        let fort: any[] = [];
        if (opcion.toLowerCase().indexOf('atr') >= 0) {
            for (let f of this.fortalezas.atr) {
                if (f.idResultadoEsperado == seleccion.idResultadoEsperado)
                    fort.push(f);
            }
        }
        else if (opcion.toLowerCase().indexOf('cre') >= 0) {
            for (let f of this.fortalezas.cre) {
                if (f.idAtributo == seleccion.idAtributo)
                    fort.push(f);
            }
        }
        return fort;
    }

    test(e) {
        console.log(e);
    }

    getMejoras(seleccion, opcion): any {
        let mejor: any[] = [];
        if (opcion.toLowerCase().indexOf('atr') >= 0) {
            for (let f of this.mejoras.atr) {
                if (f.idResultadoEsperado == seleccion.idResultadoEsperado)
                    mejor.push(f);
            }
        }
        else if (opcion.toLowerCase().indexOf('cre') >= 0) {
            for (let f of this.mejoras.cre) {
                if (f.idAtributo == seleccion.idAtributo)
                    mejor.push(f);
            }
        }
        return mejor;
    }

    getMejorasFortalezasEvaluador(evaluador: Evaluador) {

        for (let cre of evaluador.encuesta.listaCRE) {
            if (Math.round(cre.promedio) >= 3) {
                this.fortalezas.cre.push(cre);
            }
            else if (Math.round(cre.promedio) <= 2)
                this.mejoras.cre.push(cre);
        }
        for (let atr of evaluador.encuesta.atributos) {
            if (Math.round(atr.promedio) >= 3) {
                this.fortalezas.atr.push(atr);
            }
            else if (Math.round(atr.promedio) <= 2)
                this.mejoras.atr.push(atr);
        }
        for (let re of evaluador.encuesta.resultados_esperados) {
            if (Math.round(re.promedio) >= 3) {
                this.fortalezas.re.push(re);
            }
            else if (Math.round(re.promedio) <= 2)
                this.mejoras.re.push(re);
        }
    }
}