import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { formatDateAsIso } from "../utils/utils";
import { CalendarEvent, CalendarEvents } from "../interfaces/calendar.interface";
import { nanoid } from "nanoid";

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  selectedMonth$ = new BehaviorSubject(new Date());
  events$: BehaviorSubject<CalendarEvents> = new BehaviorSubject<CalendarEvents>(this.genMockEvents());
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
    }
  }

  moveEvent(oldDate: Date, newDate: Date, event: CalendarEvent) {
    this.removeEvent(oldDate, event);
    this.addNewEvent(newDate, event);
  }

  private genMockEvents() {
    const today = new Date();
    const fifth = new Date(today.getFullYear(), today.getMonth(), 5);


    const initialEvents: CalendarEvents = {
      [formatDateAsIso(today)]: [
        {
          id: nanoid(),
          time: "13:15",
          title: "Meeting",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: nanoid(),
          time: "09:25",
          title: "Meeting",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: nanoid(),
          time: "08:30",
          title: "Dentist",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: nanoid(),
          time: "10:15",
          title: "Meeting",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
      [formatDateAsIso(fifth)]: [
        {
          id: nanoid(),
          time: "09:30",
          title: "Interview",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    };

    return initialEvents;
  }
}
