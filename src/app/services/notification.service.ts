import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string = "", duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['success'],
    });
  }
}
