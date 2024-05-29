import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { EventRemoveConfirmComponent } from "../event-remove-confirm/event-remove-confirm.component";
import { CalendarService } from "../../services/calendar.service";
import { CalendarEvent } from "../../interfaces/calendar.interface";
import { EventComposerComponent } from "../event-composer/event-composer.component";
import { formatDateAsIso } from "../../utils/utils";

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

  // payload: { date: this.formatDateAsIso(this.pickedDay$.getValue()) },
  openEditDialog(event: CalendarEvent) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: `Edit ${event.title}`,
        component: EventComposerComponent,
        payload: { date: formatDateAsIso(this.pickedDay$.getValue()), calendarEvent: event },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedEvent = {
          ...result,
          id: event.id,
          date: new Date(result.date),
        };

        this.calendarService.updateEvent(this.pickedDay$.getValue(), updatedEvent);
      }
    });
  }
}
