import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReparacionesFinalizadasDetallePage } from './reparaciones-finalizadas-detalle.page';

describe('ReparacionesFinalizadasDetallePage', () => {
  let component: ReparacionesFinalizadasDetallePage;
  let fixture: ComponentFixture<ReparacionesFinalizadasDetallePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparacionesFinalizadasDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReparacionesFinalizadasDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
