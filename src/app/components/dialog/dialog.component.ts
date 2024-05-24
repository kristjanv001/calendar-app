import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";

interface DialogData {
  title: string;
  component: any;
}

@Component({
  selector: "app-dialog",
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: "./dialog.component.html",
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
