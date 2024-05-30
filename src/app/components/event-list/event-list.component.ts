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
import { SvgIconDirective } from "../../directives/svg-icon.directive";

@Component({
  selector: "app-event-list",
  standalone: true,
  imports: [CommonModule, CdkAccordionModule, SvgIconDirective],
  templateUrl: "./event-list.component.html",
})
export class EventListComponent {
  calendarService = inject(CalendarService);
  @Input() events: CalendarEvent[] | null = [];
  pickedDay$ = this.calendarService.pickedDay$; //⚠️ remove?

  constructor(public dialog: MatDialog) {}

  openRemoveConfirmDialog(eventToRemove: CalendarEvent) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Are you sure?",
        component: EventRemoveConfirmComponent,
        payload: {
          event: eventToRemove,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.calendarService.removeEvent(this.pickedDay$.getValue(), eventToRemove);
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
        const { title, description, time } = result;
        const updatedEvent: CalendarEvent = {
          title,
          description,
          id: event.id,
          time,
        };

        const oldDate = this.pickedDay$.getValue();
        const newDate = new Date(result.date);

        this.calendarService.updateEvent(oldDate, newDate, updatedEvent);
      }
    });
  }
}
