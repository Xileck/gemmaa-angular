// Pendientes:
// cambiar minusculas a mayusculas cuando se esta escribiendo dinamicamente.
// Arreglar que el usuario puede presionar multiple veces el boton.
import {UtilService} from "../servicios/util.service";
declare var webORB: any;
import {Component} from '@angular/core';
import {Router}      from '@angular/router';
import {LoginService} from './login.service';

@Component({
    selector: 'login-app',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    usuarioInput: string = '';
    contraseniaInput: string = '';

    constructor(private loginService: LoginService, public router: Router, private utilService: UtilService) {
        if (this.loginService.usuarioValidado())
            this.router.navigate(['principal'])
        if (this.loginService.godlike) {
            this.usuarioInput = '174P6';
            this.contraseniaInput = '123';
        }
    }

    soloMayusculas(event: any) {
        if (isNaN(Number(event))) {
            let inputChar = String.fromCharCode(event.charCode);
            // console.log(inputChar, e.charCode);
            if (inputChar.toUpperCase() != inputChar && this.usuarioInput.length <= 5) {
                event.preventDefault();
                this.usuarioInput += inputChar.toUpperCase();
            }
        }
    }

    validarEmpleado(usuarioInput: string, contraseniaInput: string): any {
        return this.loginService.validarEmpleado(usuarioInput, contraseniaInput);
    }

    informacionCorrecta(): boolean {
        this.loginService.mensajesGlobales = [];
        if (this.usuarioInput.length == 5 && this.contraseniaInput.length > 0) {
            return true;
        } else if (this.usuarioInput.length == 0 && this.contraseniaInput.length == 0) {
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Ingrese RPE y Contraseña.'
            });
            return false;
        } else if (this.usuarioInput.length != 5) {
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Ingrese RPE valido.'
            });
            return false;
        } else if (this.contraseniaInput.length == 0) {
            this.loginService.mensajesGlobales.push({
                severity: 'error',
                summary: 'Error:',
                detail: 'Ingrese contraseña.'
            });
            return false;
        }
    }

    loginBoton(): void {
        if (this.informacionCorrecta()) {
            this.utilService.displayDialogo('Validando Usuario', 'info');
            setTimeout(() => {
                this.validarEmpleado(this.usuarioInput, this.contraseniaInput);
                this.utilService.reiniciarDialogo();
            }, 100);
        }

    }
}
