import { Component, WritableSignal, Signal, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../../interfaces/task.interface";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent {
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  tasks: WritableSignal<Task[]> = signal([
    { date: "2024-05-12", title: "qsrgtrhtrhtr" },
    { date: "2024-05-15", title: "cdgergerg" },
    { date: "2024-05-15", title: "wefwefwe" },
    { date: "2024-05-15", title: "wefsqwsq" },
    { date: "2024-06-01", title: "dfwerfwfe" },
    { date: "2024-06-02", title: "qwdwqqdw" },
    { date: "2024-06-02", title: "geergherre" },
  ]);

  currentDate = new Date();
  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();

  selectedDate: WritableSignal<Date> = signal(new Date());
  selectedMonth: Signal<number> = computed(() => this.selectedDate().getMonth());
  selectedYear: Signal<number> = computed(() => this.selectedDate().getFullYear());
  selectedMonthName: Signal<string> = computed(() => this.getMonthName(this.selectedDate()));
  selectedMonthDays: Signal<number> = computed(() => this.getMonthDays(this.selectedDate()));

  pickedDate: WritableSignal<Date> = signal(new Date());
  pickedDateStr: Signal<string> = computed(() => this.getDateStr(this.pickedDate()));
  pickedDateTasks: Signal<Task[]> = computed(() => this.getDateTasks(this.pickedDate()));

  getMonthName(date: Date) {
    return date.toLocaleString("default", { month: "long" });
  }

  getMonthDays(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
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

  handleDateClick(day: number) {
    const year = this.selectedYear();
    const month = this.selectedMonth();
    const clickedDate = new Date(year, month, day);

    this.pickedDate.set(clickedDate);
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

  getDateTasks(date: Date): Task[] {
    const pickedDateIso = this.formatDateAsIso(date);

    return this.tasks().filter((task) => task.date === pickedDateIso);
  }

  formatDateAsIso(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
