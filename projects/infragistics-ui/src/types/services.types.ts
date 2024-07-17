export interface IDateTimeService {
    startClock(format: string, separator: string): void,
    setUtcTimezone(timezone: string | null): void,
    getSeparator(): string
}