import { async, TestBed } from '@angular/core/testing';
import { EditarReporteComponent } from './editar-reporte.component';
describe('EditarReporteComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EditarReporteComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EditarReporteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/GEMMAA/GEMMAA_CLI/src/app/admin/admin_reportes/editar-reporte/editar-reporte.component.spec.js.map