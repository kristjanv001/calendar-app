
export interface CalendarDay {
  date: Date;
  day: number;
  events: string[];
}

export interface CalendarMonth {
  date: Date;
  days: CalendarDay[];
}
