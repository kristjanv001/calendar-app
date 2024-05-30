export interface CalendarEvents {
  [date: string]: CalendarEvent[];
}

export interface CalendarEvent {
  id: string;
  time: string;
  title: string
  description: string
}

export interface CalendarDay {
  date: Date;
  day: number;

}

export interface CalendarMonth {
  date: Date;
  days: CalendarDay[];
}
