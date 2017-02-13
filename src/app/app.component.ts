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
    }


}
