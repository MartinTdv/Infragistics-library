import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import TimeFormat from '../enums/time-format';
import { formatDate } from '../helpers/date-helper';
import { IDateTimeService } from '../../types/services.types';


@Injectable()
export class DateTimeService implements IDateTimeService, OnDestroy {
  private intervalId: number | null = null;

  private format: string = '';
  private separator: string = ''
  private utcTimezone: string | null = null;
  private hourFormat: string = '';
  private minutesFormat: string = '';
  private secondsFormat: string = '';

  private currentHour = new BehaviorSubject<number>(0);
  currentHourChanges$: Observable<string> = this.currentHour.asObservable().pipe(
    map(hour => formatDate(hour, this.hourFormat))
  );

  private currentMinutes = new BehaviorSubject<number>(0);
  currentMinutesChanges$: Observable<string> = this.currentMinutes.asObservable().pipe(
    map(minutes => formatDate(minutes, this.minutesFormat))
  );

  private currentSeconds = new BehaviorSubject<number>(0);
  currentSecondsChanges$: Observable<string> = this.currentSeconds.asObservable().pipe(
    map(seconds => formatDate(seconds, this.secondsFormat))
  );

  private currentAmPm = new BehaviorSubject<string>('');
  currentAmPmChanges$: Observable<string> = this.currentAmPm.asObservable();

  ngOnDestroy(): void {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startClock(format: string, separator: string): void {
    this.format = format;
    this.separator = separator;
    this.setFormats();

    this.setTime();
    this.intervalId = Number(setInterval(() => this.setTime(), 1000));
  }

  setUtcTimezone(timezone: string | null): void {
    this.utcTimezone = timezone;
  }

  getSeparator(): string {
    return this.separator;
  };

  private setTime() {
    const date = this.getDate()

    if(date.getHours() !== this.currentHour.getValue()) {
      this.currentHour.next(date.getHours());
    }
    if(date.getMinutes() !== this.currentMinutes.getValue()) {
      this.currentMinutes.next(date.getMinutes());
    }
    if(date.getSeconds() !== this.currentSeconds.getValue()) {
      this.currentSeconds.next(date.getSeconds());
    }
    if(this.getAmPm(date) !== this.currentAmPm.getValue()) {
      this.currentAmPm.next(this.getAmPm(date));
    }
  }

  private setFormats(): void {
    const formatArray = this.format.replace(`${this.separator}tt`, '').split(this.separator);

    formatArray.forEach(format => {
      switch(format) {
        case TimeFormat.HOUR_12:
        case TimeFormat.HOUR_12_PADDED:
        case TimeFormat.HOUR_24:
        case TimeFormat.HOUR_24_PADDED:
          this.hourFormat = format;
          break;
        case TimeFormat.MINUTE:
        case TimeFormat.MINUTE_PADDED:
          this.minutesFormat = format;
          break;
        case TimeFormat.SECOND:
        case TimeFormat.SECOND_PADDED:
          this.secondsFormat = format;
          break;
        default:
          throw Error(`Invalid Format! Format: ${this.format}`)
      }
    });
  }

  private getDate(): Date {
    const date = new Date();
    if(!this.utcTimezone) {
      return date;
    }

    let timezone = this.utcTimezone
      .replace('UTC', 'GMT');
    timezone = timezone.includes('+') 
      ? timezone.replace('+', '-')
      : timezone.replace('-', '+');

    const options = { timeZone: 'Etc/' + timezone };
    return new Date(date.toLocaleString("en-US", options));
  }
  
  private getAmPm(dateTime: Date) {
    return dateTime.getHours() < 12 ? 'am' : 'pm';
  }
}

