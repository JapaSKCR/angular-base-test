import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../../models/note/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private NOTES_URL: string = environment.urls.notes;

  constructor(private httpClient: HttpClient) { }

  public getAllNotes() {
    return this.httpClient.get<Note[]>(this.NOTES_URL);
  }
  public createNote() {
    return ''
  }
  public updateNote() {
    return ''
  }
  public deleteNote() {
    return ''
  }
  public getNote() {
    return ''
  }

}
