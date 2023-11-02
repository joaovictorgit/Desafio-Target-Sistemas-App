import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReleaseComponent } from './GridReleaseComponent.1';

describe('GridReleaseComponent', () => {
  let component: GridReleaseComponent;
  let fixture: ComponentFixture<GridReleaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridReleaseComponent]
    });
    fixture = TestBed.createComponent(GridReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
