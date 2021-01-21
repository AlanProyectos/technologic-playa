import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReparacionesFinalizadasPage } from './reparaciones-finalizadas.page';

describe('ReparacionesFinalizadasPage', () => {
  let component: ReparacionesFinalizadasPage;
  let fixture: ComponentFixture<ReparacionesFinalizadasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparacionesFinalizadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReparacionesFinalizadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
