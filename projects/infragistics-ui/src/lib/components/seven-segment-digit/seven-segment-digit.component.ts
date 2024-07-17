import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'ig-seven-segment-digit',
  standalone: true,
  imports: [],
  templateUrl: './seven-segment-digit.component.html',
  styleUrl: './seven-segment-digit.component.css'
})
export class SevenSegmentDigitComponent implements OnChanges, AfterViewInit {
  private loaded: boolean = false;

  @Input() number: string = '';

  elementId: string = `id-${Math.random().toString(16).slice(2)}`;
  
  ngAfterViewInit(): void {
    this.loaded = true;
    this.updateNumberClass();
  }

  ngOnChanges(): void {
    if(this.loaded) {
      this.updateNumberClass();
    }
  }

  updateNumberClass(): void {
    const el = document.getElementById(this.elementId);
    if(!el) {
      throw Error('Invalid Element Id');
    }

	  el.className = `number number--${Number(this.number)}`;
  }
}
