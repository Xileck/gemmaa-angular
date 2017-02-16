import {Component, Compiler} from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private _compiler: Compiler) {
        // this._compiler.clearCache();
        document.addEventListener('contextmenu', event => event.preventDefault());
        if (this.detectIE()) {
            alert("Este navegador no es comatible:" + this.detectIE() + ".");
        }
    }


    detectIE(): any {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie < 9) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        // other browser
        return false;
    }

}
