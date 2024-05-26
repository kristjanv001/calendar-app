import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, map, of } from "rxjs";
import { Event } from "../interfaces/calendar.interface";

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  selectedMonth$ = new BehaviorSubject(new Date());
  events$ = new BehaviorSubject<Event[]>([
    {
      title: "fff",
      date: new Date(2024, 4, 16),
    },
    {
      title: "sleep",
      date: new Date(2024, 4, 10),
    },
    {
      title: "run",
      date: new Date(2024, 4, 15),
    },
    {
      title: "play",
      date: new Date(2024, 5, 15),
    },
    {
      title: "cook",
      date: new Date(2024, 5, 12),
    },
  ]);

  events2$ = new BehaviorSubject<any>({
    "2024-05-16": ["task1", "task2", "task3"],
    "2024-05-25": ["task4", "task5"],
    "2024-05-27": ["task6", "task7"],
    "2024-06-01": ["task8", "task9", "task10"]
  });

  constructor() {}

  setSelectedMonth(date: Date) {
    this.selectedMonth$.next(date);
  }

  // getEventsForMonth(year: number, month: number): Observable<Event[]> {
  //   return of(this.events).pipe(
  //     map((events) =>
  //       events.filter((event) => {
  //         return event.date.getFullYear() === year && event.date.getMonth() === month;
  //       }),
  //     ),
  //   );
  // }
}
