import { async, TestBed } from '@angular/core/testing';
import { NavegadorComponent } from './navegador.component';
describe('NavegadorComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [NavegadorComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NavegadorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/navegador/navegador.component.spec.js.map