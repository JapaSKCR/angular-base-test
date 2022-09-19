import { NotesDialogComponent } from './../../common/components/dialog/notes-dialog/notes-dialog.component';
import { NotesComponent } from './notes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRouting } from './notes.routing';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteConfirmationComponent } from 'src/app/common/components/dialog/delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [
    NotesComponent,
    NotesDialogComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    NotesRouting,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
  ]
})
export class NotesModule { }
