import { Component, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-event-remove-confirm",
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: "./event-remove-confirm.component.html",
})
export class EventRemoveConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<EventRemoveConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
