import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { EventRemoveConfirmComponent } from "../event-remove-confirm/event-remove-confirm.component";
import { formatDateAsIso } from "../../utils/utils";

@Component({
  selector: "app-event-list",
  standalone: true,
  imports: [CommonModule, CdkAccordionModule],
  templateUrl: "./event-list.component.html",
})
export class EventListComponent {
  @Input() events: string[] | null = [];

  constructor(public dialog: MatDialog) {}

  openConfirmDialog(event: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Are you sure?",
        component: EventRemoveConfirmComponent,
        payload: { date: formatDateAsIso(new Date()) },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        // ⚠️ get event name and date --> call service
        // this.calendarService.addNewEvent(new Date(result.date), result.title);
      }
    });
  }



}
