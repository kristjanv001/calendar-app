export interface WeekDay {
  date: Date;
}

export interface Task {
  title: string;
}

export interface WeekDayData {
  [date: string]: Task[];
}
