import { Component } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule, FormControl, FormGroup,Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-event-composer",
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: "./event-composer.component.html",
})
export class EventComposerComponent {
  constructor(private dialogRef: MatDialogRef<EventComposerComponent>) {}

  eventForm = new FormGroup({
    title: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
  });

  onSubmit() {
    if (this.eventForm.valid) {
      // Perform any additional validation or data manipulation here
      const formData = this.eventForm.value;
      console.log(formData)
      this.dialogRef.close(formData);
    } else {
      // Handle form errors
      console.log("Form is invalid");
    }
  }
}
