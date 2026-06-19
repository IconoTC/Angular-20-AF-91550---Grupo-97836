import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NoteItem } from '../note-item/note-item';
import { NoteForm } from '../note-form/note-form';
import { Note } from '../../entities/note';
import NOTES from '../../data/notes-mock.json';

@Component({
  selector: 'ind-notes-list',
  imports: [NoteItem, NoteForm, JsonPipe],
  template: `
    @if (isLoading()) {
      <p>Loading notes...</p>
    } @else if (error()) {
      <p>Error: {{ error() }}</p>
    } @else {
      <details>
        <summary>Add Note</summary>
        <ind-note-form />
      </details>
      <div class="notes-list">
      @for (note of notes(); track note.id) {
        <!-- <ind-note-item [note]="note" (deleteEvent)="delete($event)" /> -->
         <ind-note-item [note]="note" (deleteEvent)="delete(note.id)" 
         (changeEvent)="change($event)"
         />
      }
      </div>
    }
    <pre>{{ notes() | json }}</pre>
  `,
  styles: `
  .notes-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  `,
})
export class NotesList {
  protected notes = signal<Note[]>([]);
  protected isLoading = signal<boolean>(true);
  protected error = signal<string | null>(null);

  constructor() {
    setTimeout(() => {
      this.notes.set(NOTES);
      this.isLoading.set(false);
    }, 500);
  }

  delete(id: Note['id']) {
    this.notes.set(this.notes().filter((note) => note.id !== id));
  }

  change(updatedNote: Note) {
    this.notes.set(
      this.notes().map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  }
}
