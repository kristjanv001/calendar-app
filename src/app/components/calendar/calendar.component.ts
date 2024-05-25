import { Component, WritableSignal, Signal, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { Task, WeekDayData, WeekDay } from "../../interfaces/calendar.interface";
import { DialogComponent } from "../dialog/dialog.component";
import { EventComposerComponent } from "../event-composer/event-composer.component";
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent {
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  weekDayData: WeekDayData[] = [
    { day: "2024-05-01", title: "Task 1" },
    { day: "2024-05-01", title: "Task 2" },
    { day: "2024-05-05", title: "Task 3" },
    { day: "2024-05-05", title: "Task 4" },
    { day: "2024-05-05", title: "Task 5" },
    { day: "2024-05-25", title: "Task 6" },
  ];

  selectedDate: WritableSignal<Date> = signal(new Date());
  selectedYear: Signal<number> = computed(() => this.getYear(this.selectedDate()));
  selectedMonth: Signal<number> = computed(() => this.getMonth(this.selectedDate()));
  selectedMonthStr: Signal<string> = computed(() => this.getMonthStr(this.selectedDate()));
  selectedMonthDates: Signal<WeekDay[]> = computed(() => this.getMonthDays(this.selectedDate()));

  currentDate = signal(new Date());
  currentDay: Signal<number> = computed(() => this.getDay(this.currentDate()));

  pickedDate: WritableSignal<Date> = signal(this.currentDate());
  pickedDateTasks: Signal<Task[]> = computed(() => this.getTasksForDay(this.pickedDate()));
  pickedDateStr: Signal<string> = computed(() => this.getDateStr(this.pickedDate()));

  constructor(public dialog: MatDialog) {}

  drop(event: CdkDragDrop<any>) {
    console.log("event: ", event);

    if (event.previousContainer.id === event.container.id) {
      console.log("❌ SAME CONTAINER");
    } else {
      console.log("✅ DIFFERENT CONTAINER");
    }

    if (event.previousContainer === event.container) {
      console.log(event.container.data);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  getTasksForDay(date: Date): Task[] {
    return this.weekDayData.filter((task) => task.day === this.formatDateAsIso(date));
  }

  isSameDate(dateA: Date, dateB: Date) {
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  }

  getDay(date: Date) {
    return date.getDate();
  }

  getMonth(date: Date): number {
    return date.getMonth();
  }

  getYear(date: Date): number {
    return date.getFullYear();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Create a New Event",
        component: EventComposerComponent,
        payload: {
          date: this.formatDateAsIso(this.pickedDate()),
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.weekDayData.push({ day: result.date, title: result.title });
      }
    });
  }

  getMonthStr(date: Date) {
    return date.toLocaleString("default", { month: "long" });
  }

  getMonthDays(date: Date): WeekDay[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: WeekDay[] = new Array(daysInMonth).fill(null).map((_, index) => {
      const dayDate = new Date(year, month, index + 1);
      // const day = index + 1;

      return { date: dayDate };
    });

    return days;
  }

  getOffset(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    return firstDayOfMonth > 0 ? firstDayOfMonth - 1 : 0;
  }

  setPrevMonth() {
    const prevDate = new Date(this.selectedDate());
    prevDate.setMonth(prevDate.getMonth() - 1);
    this.selectedDate.set(prevDate);
  }

  setNextMonth() {
    const nextDate = new Date(this.selectedDate());
    nextDate.setMonth(nextDate.getMonth() + 1);
    this.selectedDate.set(nextDate);
  }

  setCurrMonth() {
    this.selectedDate.set(new Date());
  }

  handleDateClick(date: Date) {
    this.pickedDate.set(date);
  }

  getDateStr(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  formatDateAsIso(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
