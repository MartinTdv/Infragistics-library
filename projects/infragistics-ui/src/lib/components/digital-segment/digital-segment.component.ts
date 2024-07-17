import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SevenSegmentDigitComponent } from '../seven-segment-digit/seven-segment-digit.component';
import { DateTimeService } from '../../services/date-time.service';
import TimeUnit from '../../enums/time-unit';
import { Observable } from 'rxjs';

@Component({
  selector: 'ig-digital-segment',
  standalone: true,
  imports: [CommonModule, SevenSegmentDigitComponent],
  templateUrl: './digital-segment.component.html',
  styleUrl: './digital-segment.component.css'
})
export class DigitalSegmentComponent implements OnInit {
  private valueObservable: Observable<string> = null!;

  constructor(private dateTimeService: DateTimeService) {}

  @Input() backgroundColor: string | null = null;
  @Input() digitColor: string | null = null;
  @Input() timeUnit: TimeUnit = null!;
  @Input() showSeparator: boolean = false;

  formattedValue: string = '';
  separator: string = '';
  isAmPm: boolean = false;

  ngOnInit(): void {
    this.separator = this.dateTimeService.getSeparator();
    this.isAmPm = this.timeUnit === TimeUnit.AMPM;

    this.subscribeForValue();
  }

  private subscribeForValue() {
    this.setValueObservable();
    this.valueObservable.subscribe({
      next: value => {
        this.formattedValue = value;
      },
    });
  }

  private setValueObservable() {
    switch(this.timeUnit) {
      case TimeUnit.HOUR:
        this.valueObservable = this.dateTimeService.currentHourChanges$;
        break;
      case TimeUnit.MINUTES:
        this.valueObservable = this.dateTimeService.currentMinutesChanges$;
        break;
      case TimeUnit.SECONDS:
        this.valueObservable = this.dateTimeService.currentSecondsChanges$;
        break;
      case TimeUnit.AMPM:
        this.valueObservable = this.dateTimeService.currentAmPmChanges$;
        break;
      default:
        throw Error("Invalid Time Unit!")
    }
  }
}
