import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotesComponent } from './notes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: NotesComponent}]),
  ],
  exports: [RouterModule]
})
export class NotesRouting { }
