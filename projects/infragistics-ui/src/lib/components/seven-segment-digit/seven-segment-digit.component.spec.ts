import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenSegmentDigitComponent } from './seven-segment-digit.component';
import { By } from '@angular/platform-browser';

describe('SevenSegmentDigitComponent', () => {
  let component: SevenSegmentDigitComponent;
  let fixture: ComponentFixture<SevenSegmentDigitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SevenSegmentDigitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SevenSegmentDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a unique elementId', () => {
    const id = component.elementId;

    fixture.destroy();
    const fixture2 = TestBed.createComponent(SevenSegmentDigitComponent);
    const component2 = fixture2.componentInstance;

    expect(component2.elementId).not.toBe(id);
  });

  it('should update class name based on the number input after view init', () => {
    component.number = '5';
    fixture.detectChanges();
    component.ngAfterViewInit();
    
    const el = fixture.debugElement.query(By.css(`#${component.elementId}`));
    expect(el.nativeElement.className).toBe('number number--5');
  });

  it('should update class name when the number input changes', () => {
    component.number = '3';
    fixture.detectChanges();
    component.ngAfterViewInit();
    
    let el = fixture.debugElement.query(By.css(`#${component.elementId}`));
    expect(el.nativeElement.className).toBe('number number--3');

    component.number = '7';
    component.ngOnChanges();
    fixture.detectChanges();
    
    el = fixture.debugElement.query(By.css(`#${component.elementId}`));
    expect(el.nativeElement.className).toBe('number number--7');
  });

  it('should throw error if element with elementId is not found', () => {
    component.elementId = 'nonexistent-id';
    expect(() => component.updateNumberClass()).toThrowError('Invalid Element Id');
  });
});
