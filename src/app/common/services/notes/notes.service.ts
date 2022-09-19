import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../../models/note/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private NOTES_URL: string = environment.urls.notes;

  constructor(private httpClient: HttpClient) { }

  public getAllNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.NOTES_URL);
  }

  public createNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>(this.NOTES_URL, note);
  }

  public updateNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`${this.NOTES_URL}/${note.id}`, note);
  }

  public deleteNote(noteId: number): Observable<Note> {
    return this.httpClient.delete<Note>(`${this.NOTES_URL}/${noteId}`);
  }

  public getNoteById(noteId: number): Observable<Note> {
    return this.httpClient.get<Note>(`${this.NOTES_URL}/${noteId}`);
  }

}
