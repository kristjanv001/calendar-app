import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { formatDateAsIso } from "../utils/utils";
import { CalendarEvent, CalendarEvents } from "../interfaces/calendar.interface";
import { nanoid } from "nanoid";

const initialEvents: CalendarEvents = {
  "2024-05-16": [
    {
      id: nanoid(),
      time: "07:45",
      title: "Event 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: nanoid(),
      time: "13:25",
      title: "Event 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
  "2024-05-30": [
    {
      id: nanoid(),
      time: "09:30",
      title: "Event 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
};

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  selectedMonth$ = new BehaviorSubject(new Date());
  events$: BehaviorSubject<CalendarEvents> = new BehaviorSubject<CalendarEvents>(initialEvents);
  pickedDay$ = new BehaviorSubject(new Date());

  constructor() {
    // this.events$.subscribe((events) => {
    //   console.log(events);
    // });
  }

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

  removeEvent(date: Date, eventToRemove: CalendarEvent) {
    // console.log("removing: ", date, event);
    const dateStr = formatDateAsIso(date);
    const prevState = this.events$.getValue();
    const dayEvents = prevState[dateStr] || [];
    const updatedEventList = dayEvents.filter((dayEvent) => dayEvent.id !== eventToRemove.id);

    this.events$.next({
      ...prevState,
      [dateStr]: updatedEventList,
    });
  }

  updateEvent(oldDate: Date, newDate: Date, event: CalendarEvent) {
    if (formatDateAsIso(oldDate) !== formatDateAsIso(newDate)) {
      this.moveEvent(oldDate, newDate, event);
    } else {
      this.moveEvent(oldDate, oldDate, event);
      // const dateStr = formatDateAsIso(date);
      // const prevState = this.events$.getValue();
      // const dayEvents = prevState[dateStr] || [];

      // const updatedEventList = dayEvents.map((e) => {
      //   if (e.id === event.id) {
      //     return {
      //       ...event,
      //       id: e.id,
      //     };
      //   } else {
      //     return e;
      //   }
      // });

      // this.events$.next({
      //   ...prevState,
      //   [dateStr]: updatedEventList,
      // });
    }
  }

  moveEvent(oldDate: Date, newDate: Date, event: CalendarEvent) {
    this.removeEvent(oldDate, event);
    this.addNewEvent(newDate, event);

    // console.log("prev date events: ", this.events$.getValue()[formatDateAsIso(previousDate)]);
    // console.log("new date events", this.events$.getValue()[formatDateAsIso(newDate)]);
  }
}
