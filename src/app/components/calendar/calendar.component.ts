import { Component, OnInit, WritableSignal, Signal, signal, computed } from "@angular/core";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent {
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  currDate: WritableSignal<Date> = signal(new Date());
  currMonthDays = computed(() => this.getMonthDays(this.currDate()));
  currMonthName = computed(() => this.getMonthName(this.currDate()));
  currYear = computed(() => this.currDate().getFullYear());

  getMonthName(date: Date) {
    return date.toLocaleString("default", { month: "long" });
  }

  getMonthDays(date: Date): number {
    console.log("runs");
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getOffset(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    return firstDayOfMonth > 0 ? firstDayOfMonth - 1 : 0;
  }

  setPrevMonth() {
    const prevDate = new Date(this.currDate());
    prevDate.setMonth(prevDate.getMonth() - 1);

    this.currDate.set(prevDate);
  }

  setNextMonth() {
    const nextDate = new Date(this.currDate());
    nextDate.setMonth(nextDate.getMonth() + 1);

    this.currDate.set(nextDate);
  }
}
