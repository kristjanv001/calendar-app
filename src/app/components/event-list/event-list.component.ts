import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { EventRemoveConfirmComponent } from "../event-remove-confirm/event-remove-confirm.component";
import { CalendarService } from "../../services/calendar.service";
import { CalendarEvent } from "../../interfaces/calendar.interface";

@Component({
  selector: "app-event-list",
  standalone: true,
  imports: [CommonModule, CdkAccordionModule],
  templateUrl: "./event-list.component.html",
})
export class EventListComponent {
  calendarService = inject(CalendarService);
  @Input() events: CalendarEvent[] | null = [];
  pickedDay$ = this.calendarService.pickedDay$;

  constructor(public dialog: MatDialog) {}

  openConfirmDialog(event: CalendarEvent) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Are you sure?",
        component: EventRemoveConfirmComponent,
        payload: {
          event: event,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.calendarService.removeEvent(this.pickedDay$.getValue(), event);
      }
    });
  }
}
