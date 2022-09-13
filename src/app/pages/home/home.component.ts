import { NotesService } from './../../common/services/notes/notes.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/common/models/note/note.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private noteList: Note[] = [];

  public constructor(private notesService: NotesService ) {}

  public ngOnInit(): void {
    this.getAllNotes();
  }




  public getAllNotes() {
    return this.notesService.getAllNotes().subscribe({
      next: (notes: Note[]) => {
        this.noteList = notes;
      },
      error: () => {}
    });
  }


}
