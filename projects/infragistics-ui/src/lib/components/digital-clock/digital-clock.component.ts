import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DigitalSegmentComponent } from '../digital-segment/digital-segment.component';
import TimeFormat from '../../enums/time-format';
import { DateTimeService } from '../../services/date-time.service';
import TimeUnit from '../../enums/time-unit';

@Component({
  selector: 'ig-digital-clock',
  standalone: true,
  imports: [CommonModule, DigitalSegmentComponent],
  providers: [DateTimeService],
  templateUrl: './digital-clock.component.html',
  styleUrl: './digital-clock.component.css'
})
export class DigitalClockComponent {
  constructor(private dateTimeService: DateTimeService) { }

  @Input() separator: string = ':'
  @Input() format: string = 'hh:mm:ss:tt'
  @Input() utcTimezone: string | null = null;
  @Input() backgroundColor: string | null = null;
  @Input() digitColor: string | null = null;
  @Input() clockColor: string | null = null;

  segmentOneTimeUnit: TimeUnit | null = TimeUnit.HOUR;
  segmentTwoTimeUnit: TimeUnit | null = TimeUnit.MINUTES;
  segmentThreeTimeUnit: TimeUnit | null = TimeUnit.SECONDS;
  amPmSegmentTimeUnit: TimeUnit | null = null;

  ngOnInit(): void {
    this.dateTimeService.setUtcTimezone(this.utcTimezone);

    const formatArray = this.format.replace(this.separator + TimeFormat.AM_PM, '').split(this.separator);
    this.segmentOneTimeUnit = this.getTimeUnit(formatArray[0]);
    this.segmentTwoTimeUnit = this.getTimeUnit(formatArray[1]);
    this.segmentThreeTimeUnit = this.getTimeUnit(formatArray[2]);
    this.amPmSegmentTimeUnit = this.format.includes(TimeFormat.AM_PM) ? this.getTimeUnit(TimeFormat.AM_PM) : null;

    this.dateTimeService.startClock(this.format, this.separator);
  }

  private getTimeUnit(segmentFormat: string | null): TimeUnit | null {
      if(!segmentFormat) {
        return null;
      }

      switch(segmentFormat) {
        case TimeFormat.HOUR_12:
        case TimeFormat.HOUR_12_PADDED:
        case TimeFormat.HOUR_24:
        case TimeFormat.HOUR_24_PADDED:
          return TimeUnit.HOUR;
        case TimeFormat.MINUTE:
        case TimeFormat.MINUTE_PADDED:
          return TimeUnit.MINUTES;
        case TimeFormat.SECOND:
        case TimeFormat.SECOND_PADDED:
          return TimeUnit.SECONDS;
        case TimeFormat.AM_PM:
          return TimeUnit.AMPM;
        default:
          throw Error(`Invalid Format! Format: ${this.format}; Segment Format: ${segmentFormat}`)
      }
  }
}
