import TimeFormat from '../enums/time-format';

export function formatDate(value: number, format: string): string {
  return format
    .replaceAll(TimeFormat.HOUR_12_PADDED, String(value % 12 || 12).padStart(2, '0'))
    .replaceAll(TimeFormat.HOUR_12, String(value % 12 || 12))
    .replaceAll(TimeFormat.HOUR_24_PADDED, String(value).padStart(2, '0'))
    .replaceAll(TimeFormat.HOUR_24, String(value))
    .replaceAll(TimeFormat.MINUTE_PADDED, String(value).padStart(2, '0'))
    .replaceAll(TimeFormat.MINUTE, String(value))
    .replaceAll(TimeFormat.SECOND_PADDED, String(value).padStart(2, '0'))
    .replaceAll(TimeFormat.SECOND, String(value))
}