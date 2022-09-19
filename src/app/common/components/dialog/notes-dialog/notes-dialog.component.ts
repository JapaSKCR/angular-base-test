import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/common/models/note/note.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss']
})
export class NotesDialogComponent implements OnInit {


  public noteForm: FormGroup;

  public important: string = '#F0699F';

  public social: string = '#3CB0D4';

  public business: string = '#98B938';


  public constructor(
                     private fb: FormBuilder,
                     private dialogRef: MatDialogRef<NotesDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public note: Note) { }


  public ngOnInit(): void {
    this.setNoteForm();
  }

  public submitNote(): void {
    const note: Note = {
      ...this.note,
      title: this.noteForm.get('title')?.value,
      content: this.noteForm.get('content')?.value,
      color: this.noteForm.get('color')?.value,
    }
    console.log(note);
    this.dialogRef.close(note);
  }

  private setNoteForm(): void {
    this.noteForm = this.fb.group({
      title: [this.note?.title ? this.note?.title : '', [Validators.required]],
      content: [this.note?.content ? this.note?.content: '',[Validators.required]],
      color: [this.note?.color ? this.note?.color:  '']
    });
  }

  public get contentLength(): number {
    return this.noteForm.get('content')?.value.length;
  }

  public compareColorStrings(color1: string, color2: string): boolean {
    return color1.toLowerCase() === color2.toLowerCase();
}

}
