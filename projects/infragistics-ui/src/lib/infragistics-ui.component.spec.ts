import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfragisticsUiComponent } from './infragistics-ui.component';

describe('InfragisticsUiComponent', () => {
  let component: InfragisticsUiComponent;
  let fixture: ComponentFixture<InfragisticsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfragisticsUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfragisticsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
