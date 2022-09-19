import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DeleteConfirmationComponent } from 'src/app/common/components/dialog/delete-confirmation/delete-confirmation.component';
import { NotesDialogComponent } from 'src/app/common/components/dialog/notes-dialog/notes-dialog.component';
import { Note } from 'src/app/common/models/note/note.model';
import { NotesService } from 'src/app/common/services/notes/notes.service';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { ViewStateService } from 'src/app/common/services/view-state/view-state.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public noteForm: FormGroup;
  public noteList$: Observable<Note[]>;
  public noteQuery$: Observable<string>;
  public noteList: Note[] = [];
  public noteResult: Note[] = [];
  public notesResult$: Observable<Note[]>;
  public colSpan: number;
  public isPhone: boolean;
  public isTablet: boolean;
  public isAscending: boolean = false;

  private subscriptions: Subscription[] = [];

  public constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private viewState: ViewStateService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
  ) {

  }

  public ngOnInit(): void {
    this.setupColSpanHandling();
    this.setForm();
    this.getAllNotes();
    this.setFilter();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public getAllNotes(): void {
    this.subscriptions.push(
      this.notesService.getAllNotes().subscribe({
        next: (notes: Note[]): void => {
          this.noteList = notes;
          this.noteResult = notes;
        },
        error: (): void => {
          this.snackbar.error('Something went wrong');
        }
      })
    );
  }

  private setForm(): void {
    this.noteForm = this.fb.group({
      search: ['']
    });
  }

  private setFilter(): void {
    this.noteForm.get('search')?.valueChanges.pipe(
      startWith(''),
      map((value: string): void => {
        return this._filter(value);
      }),
    ).subscribe();
  }

  private _filter(query: string): void {
    this.noteResult = this.noteList.filter((note: Note): boolean => (
      note.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      note.content.toLowerCase().indexOf(query.toLowerCase()) !== -1 ))
  }

  public sortNotes(): void {
    this.isAscending = !this.isAscending;
    if( this.isAscending ) {
      this.noteResult = this.noteResult.sort((a, b): number => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
    } else {
      this.noteResult = this.noteResult.sort((a, b): number => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1);
    }
  }

  public openNoteDialog(note?: Note): void {
    this.dialog.open(NotesDialogComponent, {
      width: '350px',
      data: note
    }).afterClosed().subscribe((note: Note): void => {

      if(note) {
        note.id ? this.updateNote(note) : this.createNote(note);
      }
    });
  }

  public openDeleteDialog(note: Note): void {
    this.dialog.open(DeleteConfirmationComponent, {
      width: '350px',
      data: note
    }).afterClosed().subscribe((confirm: boolean): void => {

      if(confirm) {
        if(note && note.id) {
          this.removeNote(note);
        }
      }
    });
  }

  private createNote(note: Note): void {
    this.subscriptions.push(
      this.notesService.createNote(note).subscribe({
        next: (): void => {
          this.snackbar.success('Note saved successfully');
          this.getAllNotes();
        },
        error: (): void => {
          this.snackbar.error('Something went wrong');
        }
      })
    );
  }

  public removeNote(note: Note) {
    this.subscriptions.push(
      this.notesService.deleteNote(note.id).subscribe({
        next: () => {
          this.snackbar.success('Note deleted successfully');
          this.getAllNotes();
        },
        error: () => {
          this.snackbar.error('Something went wrong');
        }
      })
    );
  }

  private updateNote(note: Note) {
    this.subscriptions.push(
      this.notesService.updateNote(note).subscribe({
        next: () => {
          this.snackbar.success('Note saved successfully');
          this.getAllNotes();
        },
        error: () => {
          this.snackbar.error('Something went wrong');
        }
      })
    );
  }

  private setupColSpanHandling() {
    this.subscriptions.push(
      this.viewState.isTabletView.subscribe((is) => {
        this.isTablet = is;
        this.setColSpan();
      }),
      this.viewState.isPhoneView.subscribe((is) => {
        this.isPhone = is;
        this.setColSpan();
      })
    );
  }

  private setColSpan() {
    if (this.isPhone) {
      this.colSpan = 1;
    } else if (this.isTablet) {
      this.colSpan = 2;
    } else {
      this.colSpan = 3;
    }
  }

  public formatDate(noteDate: string) {
    return moment(noteDate, 'DD-MM-YYYY').format('MMM-DD-yyyy').toLocaleUpperCase();
  }



}
