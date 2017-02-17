 * tslint;
disable: no - unused - variable * /;
import { async, TestBed } from '@angular/core/testing';
import { WrongBrowserComponent } from './wrong-browser.component';
describe('WrongBrowserComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [WrongBrowserComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(WrongBrowserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/wrong-browser/wrong-browser.component.spec.js.map