import { TestBed } from '@angular/core/testing';

import { DateTimeService } from './date-time.service';

describe('DateTimeService', () => {
  let service: DateTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeService]
    });
    service = TestBed.inject(DateTimeService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  [
    {format: 'hh:mm:ss', hourValue: '01', minutesValue: '02', secondsValue: '05'},
    {format: 'hh:mm:s', hourValue: '01', minutesValue: '02', secondsValue: '5'},
    {format: 'hh:m:ss', hourValue: '01', minutesValue: '2', secondsValue: '05'},
    {format: 'h:mm:ss', hourValue: '1', minutesValue: '02', secondsValue: '05'},
    {format: 'HH:mm:ss', hourValue: '13', minutesValue: '02', secondsValue: '05'},
  ].forEach((testCase) => {
    it(`should push values through the observables formated correctly for the format ${testCase.format}`, (() => {
      const customDate = new Date(2024, 0, 1, 12, 0, 0);
      jasmine.clock().install();
      jasmine.clock().mockDate(customDate);
  
      service.startClock(testCase.format, ':');
  
      let formattedHour: string | undefined;
      let formattedMinutes: string | undefined;
      let formattedSeconds: string | undefined;
  
      const hourSubscription = service.currentHourChanges$.subscribe(hour => {
        formattedHour = hour;
      });
      
      const minutesSubscription = service.currentMinutesChanges$.subscribe(minutes => {
        formattedMinutes = minutes;
      });
      
      const secondsSubscription = service.currentSecondsChanges$.subscribe(seconds => {
        formattedSeconds = seconds;
      });
  
      jasmine.clock().tick((1000 * 62 * 60) + 5000); // 1 hour 2 minute and 5 seconds
  
      expect(formattedHour).toBeDefined();
      expect(formattedHour).toBe(testCase.hourValue);
  
      expect(formattedMinutes).toBeDefined();
      expect(formattedMinutes).toBe(testCase.minutesValue);
  
      expect(formattedSeconds).toBeDefined();
      expect(formattedSeconds).toBe(testCase.secondsValue);
  
      hourSubscription.unsubscribe();
      minutesSubscription.unsubscribe();
      secondsSubscription.unsubscribe();
  
      jasmine.clock().uninstall();
    }));
  })

  it(`should push values through the AmPm observable correctly`, (() => {
    const customDate = new Date(2024, 0, 1, 10, 0, 0);
    jasmine.clock().install();
    jasmine.clock().mockDate(customDate);

    service.startClock('hh:mm:ss:tt', ':');

    let amPm: string | undefined;

    const amPmSubscription = service.currentAmPmChanges$.subscribe(value => {
      amPm = value;
    });

    jasmine.clock().tick(1000 * 60 * 60); //1 hour

    expect(amPm).toBeDefined();
    expect(amPm).toBe('am');

    jasmine.clock().tick(1000 * 60 * 60); //1 hour

    expect(amPm).toBe('pm');

    amPmSubscription.unsubscribe();
    jasmine.clock().uninstall();
  }));

  it('should push values through the observables applying passed UtcTimezone', (() => {
    const customDate = new Date(2023, 0, 1, 15, 30, 0);
    jasmine.clock().install();
    jasmine.clock().mockDate(customDate);

    const format = 'hh:mm:ss:tt';
    service.setUtcTimezone('UTC+5');
    service.startClock(format, ':');

    let formattedHour: string | undefined;
    let formattedMinutes: string | undefined;
    let formattedSeconds: string | undefined;

    const hourSubscription = service.currentHourChanges$.subscribe(hour => {
      formattedHour = hour;
    });
    
    const minutesSubscription = service.currentMinutesChanges$.subscribe(minutes => {
      formattedMinutes = minutes;
    });
    
    const secondsSubscription = service.currentSecondsChanges$.subscribe(seconds => {
      formattedSeconds = seconds;
    });

    jasmine.clock().tick((1000 * 60 * 61) + 5000); //1 hour 1 minute and 5 seconds

    expect(formattedHour).toBeDefined();
    expect(formattedHour).toBe('07');

    expect(formattedMinutes).toBeDefined();
    expect(formattedMinutes).toBe('31');

    expect(formattedSeconds).toBeDefined();
    expect(formattedSeconds).toBe('05');

    hourSubscription.unsubscribe();
    minutesSubscription.unsubscribe();
    secondsSubscription.unsubscribe();

    jasmine.clock().uninstall();
  }));
});
