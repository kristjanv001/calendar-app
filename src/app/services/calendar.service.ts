import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, map, of } from "rxjs";
import { formatDateAsIso } from "../utils/utils";

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  selectedMonth$ = new BehaviorSubject(new Date());
  events$ = new BehaviorSubject<any>({
    "2024-05-16": ["task1", "task2", "task3"],
    "2024-05-25": ["task4", "task5"],
    "2024-05-27": ["task6", "task7"],
    "2024-06-01": ["task8", "task9", "task10"],
  });
  pickedDay$ = new BehaviorSubject(new Date());

  constructor() {}

  setSelectedMonth(date: Date) {
    this.selectedMonth$.next(date);
  }

  setPickedDay(date: Date) {
    this.pickedDay$.next(date);
  }

  addNewEvent(date: Date, event: string) {
    console.log(date, event)
    const dateStr = formatDateAsIso(date);
    const prevState = this.events$.getValue();
    const dayEvents = prevState[dateStr] || [];
    const updatedEventList = [...dayEvents, event];

    this.events$.next({
      ...prevState,
      [dateStr]: updatedEventList,
    });
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
