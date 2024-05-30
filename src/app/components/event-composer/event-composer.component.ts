import { Component, Inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { formatDateAsIso, formatTime } from "../../utils/utils";

@Component({
  selector: "app-event-composer",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./event-composer.component.html",
})
export class EventComposerComponent {
  triedToSubmit = false;

  constructor(
    private dialogRef: MatDialogRef<EventComposerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payload: any },
  ) {}

  ngOnInit() {
    const calendarEvent = this.data.payload.calendarEvent;

    if (calendarEvent) {
      this.eventForm.patchValue({
        ...calendarEvent,
        time: calendarEvent.time,
      });
    }
  }

  eventForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    description: new FormControl("", [Validators.maxLength(50000)]),
    date: new FormControl(this.data.payload.date, Validators.required),
    time: new FormControl("09:00", Validators.required),
  });

  onSubmit() {
    if (this.eventForm.valid) {
      this.dialogRef.close(this.eventForm.value);
    } else {
      this.validateForm();
      console.log("Form is invalid");
    }
  }

  onDialogClose() {
    this.triedToSubmit = false;
    this.dialogRef.close();
  }

  validateForm() {
    this.triedToSubmit = true;

    Object.keys(this.eventForm.controls).forEach((key) => {
      const control = this.eventForm.get(key);

      if (control && control.invalid) {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.eventForm.get(controlName);

    if (control && control.touched && control.errors) {
      if (control.errors["required"]) {
        return "This field is required";
      }
      if (control.errors["minlength"]) {
        return `Minimum length is ${control.errors["minlength"].requiredLength}`;
      }
      if (control.errors["maxlength"]) {
        return `Maximum length is ${control.errors["maxlength"].requiredLength}`;
      }
    }
    return null;
  }
}
