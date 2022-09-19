import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Note } from 'src/app/common/models/note/note.model';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

  private yesOpt: boolean = true;
  private noOpt: boolean = false;

  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) public note: Note) { }

  public handleNoOpt(): void {
    this.dialogRef.close(this.noOpt);
  }

  public handleYesOpt(): void {
    this.dialogRef.close(this.yesOpt);
  }

}
