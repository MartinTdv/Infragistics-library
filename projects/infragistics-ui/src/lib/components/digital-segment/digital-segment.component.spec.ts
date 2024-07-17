import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalSegmentComponent } from './digital-segment.component';
import TimeUnit from '../../enums/time-unit';
import { DateTimeService } from '../../services/date-time.service';
import { of } from 'rxjs';

describe('DigitalSegmentComponent', () => {
  const CURRENT_HOUR = '14';
  const CURRENT_MINUTES = '15';
  const CURRENT_SECONDS = '16';
  const CURRENT_AMPM = 'PM';

  let component: DigitalSegmentComponent;
  let fixture: ComponentFixture<DigitalSegmentComponent>;
  let mockDateTimeService: jasmine.SpyObj<DateTimeService>;

  beforeEach(async () => {
    mockDateTimeService = jasmine.createSpyObj('DateTimeService', [
      'getSeparator',
      'currentHourChanges$',
      'currentMinutesChanges$',
      'currentSecondsChanges$',
      'currentAmPmChanges$'
    ]);

    mockDateTimeService.currentHourChanges$ = of(CURRENT_HOUR);
    mockDateTimeService.currentMinutesChanges$ = of(CURRENT_MINUTES);
    mockDateTimeService.currentSecondsChanges$ = of(CURRENT_SECONDS);
    mockDateTimeService.currentAmPmChanges$ = of(CURRENT_AMPM);

    await TestBed.configureTestingModule({
      imports: [DigitalSegmentComponent],
      providers: [
        { provide: DateTimeService, useValue: mockDateTimeService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalSegmentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    {timeUnit: TimeUnit.HOUR, value: CURRENT_HOUR, observableName: 'currentHourChanges$'},
    {timeUnit: TimeUnit.MINUTES, value: CURRENT_MINUTES, observableName: 'currentMinutesChanges$' },
    {timeUnit: TimeUnit.SECONDS, value: CURRENT_SECONDS, observableName: 'currentSecondsChanges$' },
    {timeUnit: TimeUnit.AMPM, value: CURRENT_AMPM, observableName: 'currentAmPmChanges$' },

  ].forEach(testCase => {
    it(`should subscribe to ${testCase.observableName} and update formattedValue`, () => {
      component.timeUnit = testCase.timeUnit;
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.formattedValue).toBe(testCase.value);
    });
  });

  it('should throw error if provided TimeUnit is not valid', () => {
    //@ts-ignore
    component.timeUnit = 'invalid';

    expect(() => component.ngOnInit()).toThrowError('Invalid Time Unit!');
  });
});
