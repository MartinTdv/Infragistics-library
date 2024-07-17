import TimeFormat from '../enums/time-format';
import { formatDate } from './date-helper';

describe('FormatDatePipe', () => {

  [
    {timeFormat: TimeFormat.HOUR_12_PADDED, value: 5, expectedValue: '05'},
    {timeFormat: TimeFormat.HOUR_12, value: 5, expectedValue: '5'},
    {timeFormat: TimeFormat.HOUR_24_PADDED, value: 5, expectedValue: '05'},
    {timeFormat: TimeFormat.HOUR_24, value: 5, expectedValue: '5'},
    {timeFormat: TimeFormat.MINUTE_PADDED, value: 5, expectedValue: '05'},
    {timeFormat: TimeFormat.MINUTE, value: 5, expectedValue: '5'},
    {timeFormat: TimeFormat.SECOND_PADDED, value: 5, expectedValue: '05'},
    {timeFormat: TimeFormat.SECOND, value: 5, expectedValue: '5'}
  ].forEach((testCase) => {
    it('should format hour in 12-hour padded format', () => {
      const result = formatDate(testCase.value, testCase.timeFormat);
      expect(result).toBe(testCase.expectedValue);
    });
  })
});
