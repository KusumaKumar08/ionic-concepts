import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScannersPage } from './scanners.page';

describe('ScannersPage', () => {
  let component: ScannersPage;
  let fixture: ComponentFixture<ScannersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
