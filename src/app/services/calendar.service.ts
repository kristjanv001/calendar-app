import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { formatDateAsIso } from "../utils/utils";
import { CalendarEvent, CalendarEvents } from "../interfaces/calendar.interface";
import { nanoid } from "nanoid";

const initialEvents = {
  "2024-05-16": [
    { id: nanoid(), date: new Date("2024-05-16"), title: "task1", description: "Description for task1" },
    { id: nanoid(), date: new Date("2024-05-16"), title: "task2", description: "Description for task2" },
    { id: nanoid(), date: new Date("2024-05-16"), title: "task3", description: "Description for task3" },
  ],
  "2024-05-25": [
    { id: nanoid(), date: new Date("2024-05-25"), title: "task4", description: "Description for task4" },
    { id: nanoid(), date: new Date("2024-05-25"), title: "task5", description: "Description for task5" },
  ],
  "2024-05-27": [
    { id: nanoid(), date: new Date("2024-05-27"), title: "task6", description: "Description for task6" },
    { id: nanoid(), date: new Date("2024-05-27"), title: "task7", description: "Description for task7" },
  ],
  "2024-05-29": [
    { id: nanoid(), date: new Date("2024-05-29"), title: "task8", description: "Description for task8" },
    { id: nanoid(), date: new Date("2024-05-29"), title: "task9", description: "Description for task9" },
    { id: nanoid(), date: new Date("2024-05-29"), title: "task10", description: "Description for task10" },
  ],
  "2024-06-01": [
    { id: nanoid(), date: new Date("2024-06-01"), title: "tyjt", description: "Description for tyjt" },
    { id: nanoid(), date: new Date("2024-06-01"), title: "axsfre", description: "Description for axsfre" },
    { id: nanoid(), date: new Date("2024-06-01"), title: "rbhtr", description: "Description for rbhtr" },
  ],
};

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  selectedMonth$ = new BehaviorSubject(new Date());
  events$: BehaviorSubject<CalendarEvents> = new BehaviorSubject<CalendarEvents>(initialEvents);
  pickedDay$ = new BehaviorSubject(new Date());

  constructor() {}

  setSelectedMonth(date: Date) {
    this.selectedMonth$.next(date);
  }

  setPickedDay(date: Date) {
    this.pickedDay$.next(date);
  }

  addNewEvent(date: Date, event: CalendarEvent) {
    // console.log("adding to date: ", date);
    const dateStr = formatDateAsIso(date);
    const prevState: CalendarEvents = this.events$.getValue();
    const dayEvents: CalendarEvent[] = prevState[dateStr] || [];
    const updatedEventList: CalendarEvent[] = [...dayEvents, event];

    this.events$.next({
      ...prevState,
      [dateStr]: updatedEventList,
    });
  }

  removeEvent(date: Date, event: CalendarEvent) {
    // console.log("removing: ", date, event);
    const dateStr = formatDateAsIso(date);
    const prevState = this.events$.getValue();
    const dayEvents = prevState[dateStr] || [];
    const updatedEventList = dayEvents.filter((e) => e.id !== event.id);

    this.events$.next({
      ...prevState,
      [dateStr]: updatedEventList,
    });
  }

  updateEvent(date: Date, event: CalendarEvent) {
    const dateStr = formatDateAsIso(date);
    const prevState = this.events$.getValue();
    const dayEvents = prevState[dateStr] || [];

    const originalDate = formatDateAsIso(date);
    const newDate = formatDateAsIso(event.date);

    if (newDate !== originalDate) {
      this.moveEvent(date, new Date(newDate), event);
    } else {
      const updatedEventList = dayEvents.map((e) => {
        if (e.id === event.id) {
          return {
            ...event,
            id: e.id,
          };
        } else {
          return e;
        }
      });

      this.events$.next({
        ...prevState,
        [dateStr]: updatedEventList,
      });
    }
  }

  moveEvent(previousDate: Date, newDate: Date, event: CalendarEvent) {
    this.removeEvent(previousDate, event);
    this.addNewEvent(newDate, event);
  }
}
