import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcasPage } from './marcas.page';

describe('MarcasPage', () => {
  let component: MarcasPage;
  let fixture: ComponentFixture<MarcasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MarcasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
