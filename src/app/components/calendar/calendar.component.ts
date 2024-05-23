import { Component, WritableSignal, Signal, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent {
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  currentDate = new Date();
  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();

  selectedDate: WritableSignal<Date> = signal(new Date());
  selectedMonth: Signal<number> = computed(() => this.selectedDate().getMonth());
  selectedYear: Signal<number> = computed(() => this.selectedDate().getFullYear());
  selectedMonthName: Signal<string> = computed(() => this.getMonthName(this.selectedDate()));
  selectedMonthDays: Signal<number> = computed(() => this.getMonthDays(this.selectedDate()));

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
}
