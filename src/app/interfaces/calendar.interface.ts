export interface Event {
  date: Date
  title: string;
}

export interface CalendarDay {
  date: Date;
  day: number;
  events: Event[];
}

export interface CalendarMonth {
  date: Date;
  days: CalendarDay[];
}
