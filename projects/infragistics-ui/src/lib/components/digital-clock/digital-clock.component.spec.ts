import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalClockComponent } from './digital-clock.component';
import TimeUnit from '../../enums/time-unit';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalClockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  [
    { format: 'hh:mm:ss:tt', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.SECONDS, valueAmPm: TimeUnit.AMPM },
    { format: 'h:m:s:tt', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.SECONDS, valueAmPm: TimeUnit.AMPM },
    { format: 'hh:mm:ss', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.SECONDS, valueAmPm: null },
    { format: 'HH:mm:ss', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.SECONDS, valueAmPm: null },
    { format: 'H:m:s', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.SECONDS, valueAmPm: null },
    { format: 'hh:m:ss:tt', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.SECONDS, valueAmPm: TimeUnit.AMPM },
    { format: 'hh:mm:s:tt', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.SECONDS, valueAmPm: TimeUnit.AMPM },
    { format: 'hh:mm:tt', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: null, valueAmPm: TimeUnit.AMPM },
    { format: 'HH:mm', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: null, valueAmPm: null },
    { format: 'mm:ss', valueOne: TimeUnit.MINUTES, valueTwo: TimeUnit.SECONDS, valueThree: null, valueAmPm: null },
    { format: 'm:s', valueOne: TimeUnit.MINUTES, valueTwo: TimeUnit.SECONDS, valueThree: null, valueAmPm: null },
    { format: 'm:ss', valueOne: TimeUnit.MINUTES, valueTwo: TimeUnit.SECONDS, valueThree: null, valueAmPm: null },
    { format: 'hh:mm:tt', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.MINUTES, valueThree: null, valueAmPm: TimeUnit.AMPM },
    { format: 'ss:mm:hh:tt', valueOne: TimeUnit.SECONDS, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.HOUR, valueAmPm: TimeUnit.AMPM },
    { format: 's:m:h:tt', valueOne: TimeUnit.SECONDS, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.HOUR, valueAmPm: TimeUnit.AMPM },
    { format: 'ss:mm:H', valueOne: TimeUnit.SECONDS, valueTwo: TimeUnit.MINUTES, valueThree: TimeUnit.HOUR, valueAmPm: null },
    { format: 'mm:hh:tt', valueOne: TimeUnit.MINUTES, valueTwo: TimeUnit.HOUR, valueThree: null, valueAmPm: TimeUnit.AMPM },
    { format: 'ss:mm', valueOne: TimeUnit.SECONDS, valueTwo: TimeUnit.MINUTES, valueThree: null, valueAmPm: null },
    { format: 's:mm:tt', valueOne: TimeUnit.SECONDS, valueTwo: TimeUnit.MINUTES, valueThree: null, valueAmPm: TimeUnit.AMPM },
    { format: 'H:ss:m:tt', valueOne: TimeUnit.HOUR, valueTwo: TimeUnit.SECONDS, valueThree: TimeUnit.MINUTES, valueAmPm: TimeUnit.AMPM },

  ].forEach ((testCase) => {
    it(`should display the time correctly for ${testCase.format} format`, () => {
      component.format = testCase.format;

      component.ngOnInit();

      expect(component.segmentOneTimeUnit).toBe(testCase.valueOne ?? null);
      expect(component.segmentTwoTimeUnit).toBe(testCase.valueTwo ?? null);
      expect(component.segmentThreeTimeUnit).toBe(testCase.valueThree ?? null);
      expect(component.amPmSegmentTimeUnit).toBe(testCase.valueAmPm ?? null);
    });
  });

  [
    {separator: ':', format: 'hh:mm:ss:tt'},
    {separator: '-', format: 'hh-mm-ss-tt'},
    {separator: '*', format: 'hh*mm*ss*tt'},
    {separator: '@', format: 'hh@mm@ss@tt'},
    {separator: '\\', format: 'hh\\mm\\ss\\tt'},
    {separator: '^', format: 'hh^mm^ss^tt'},
  ].forEach((testCase) => {
    it(`should use provided separator to work with the format format. Separator: ${testCase.separator}`, () => {  
      component.separator = testCase.separator;
      component.format = testCase.format;

      expect(component.segmentOneTimeUnit).toBe(TimeUnit.HOUR);
      expect(component.segmentTwoTimeUnit).toBe(TimeUnit.MINUTES);
      expect(component.segmentThreeTimeUnit).toBe(TimeUnit.SECONDS);
      expect(component.amPmSegmentTimeUnit).toBe(TimeUnit.AMPM);
    });
  });

  it('should throw error if provided separator and format do not match', () => {
    component.separator = '%';
    component.format = 'hh:mm:ss';

    expect(() => component.ngOnInit()).toThrowError('Invalid Format! Format: hh:mm:ss; Segment Format: hh:mm:ss');
  });
})
