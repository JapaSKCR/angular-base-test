import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  public constructor(private snackbar: MatSnackBar) {

  }

  public success(message: string, action: string = 'X', duration: number = 5000): void {
     this.snackbar.open(message, action, {
      duration: duration,
      panelClass: 'snackbar-success'
     })
  }

  public error(message: string, action: string = 'X', duration: number = 5000): void {
    this.snackbar.open(message, action, {
      duration: duration,
      panelClass: 'snackbar-error'
     })
  }
}
