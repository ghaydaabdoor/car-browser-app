import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleResultsComponent } from './vehicle-results.component';

describe('VehicleResultsComponent', () => {
  let component: VehicleResultsComponent;
  let fixture: ComponentFixture<VehicleResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
