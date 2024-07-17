import { TestBed } from '@angular/core/testing';

import { InfragisticsUiService } from './infragistics-ui.service';

describe('InfragisticsUiService', () => {
  let service: InfragisticsUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfragisticsUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
