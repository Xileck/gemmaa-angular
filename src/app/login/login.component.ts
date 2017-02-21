// Pendientes:
// cambiar minusculas a mayusculas cuando se esta escribiendo dinamicamente.
// Arreglar que el usuario puede presionar multiple veces el boton.
import {UtilService} from "../servicios/util.service";
import {Component} from '@angular/core';
import {Router}      from '@angular/router';
import {LoginService} from './login.service';
import {environment} from "../../environments/environment";

@Component({
    selector: 'login-app',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    usuarioInput: string = '';
    contraseniaInput: string = '';
    environment = environment;
    constructor(private loginService: LoginService, public router: Router, private utilService: UtilService) {
        if (this.loginService.usuarioValidado())
            this.router.navigate(['principal'])
        if (environment.modoDios) {
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
        if (this.usuarioInput.length == 5 && this.contraseniaInput.length > 0) {
            return true;
        } else if (this.usuarioInput.length == 0 && this.contraseniaInput.length == 0) {
            this.loginService.mensajeError('Error', 'Ingresa RPE y contraseña.');
            return false;
        } else if (this.usuarioInput.length != 5) {
            this.loginService.mensajeError('Error', 'Ingresa RPE valido.');
            return false;
        } else if (this.contraseniaInput.length == 0) {
            this.loginService.mensajeError('Error', 'Ingresa contraseña.');
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
