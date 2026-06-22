import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NoteItem } from '../note-item/note-item';
import { NoteForm } from '../note-form/note-form';
import { Note } from '../../entities/note';
import { ApiRepo } from '../../services/api-repo';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ind-notes-list',
  imports: [NoteItem, NoteForm],
  template: `
    @if (isLoading()) {
      <p>Loading notes...</p>
    } @else if (error()) {
      <p>Error: {{ error() }}</p>
    } @else {
      <details #details>
        <summary>Add Note</summary>
        <ind-note-form (addEvent)="add($event)" />
      </details>
      <div class="notes-list">
        @for (note of notes(); track note.id) {
          <!-- <ind-note-item [note]="note" (deleteEvent)="delete($event)" /> -->
          <ind-note-item
            [note]="note"
            (deleteEvent)="delete(note.id)"
            (changeEvent)="change($event)"
          />
        }
      </div>
    }
    <!-- <pre>{{ notes() | json }}</pre> -->
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
  readonly repo = inject(ApiRepo);
  readonly #destroyRef = inject(DestroyRef);

  protected readonly notes = signal<Note[]>([]);
  protected readonly isLoading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.repo.get()
    .pipe(
      takeUntilDestroyed(this.#destroyRef)
    )
    .subscribe({
      next: (notes) => {
        // En caso de Observable exitoso
        this.notes.set(notes);
      },
      complete: () => {
        // Si se completa el Observable
        console.log('Load notes completed');
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.error.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  delete(id: Note['id']) {


    this.repo.delete(id).subscribe({
      next: () => {
        this.notes.set(this.notes().filter((note) => note.id !== id))
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.error.set(err.message);
      },
    }); 
  }

  change(updatedNote: Note) {
    this.repo.update(updatedNote).subscribe({
      next: (note) => {
        this.notes.set(this.notes().map((n) => (n.id === note.id ? note : n)));
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.error.set(err.message);
      },
    });
  }

  add(newNote: Omit<Note, 'id'>) {
    this.repo.add(newNote).subscribe({
      next: (note) => {
        this.notes.set([...this.notes(), note]);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.error.set(err.message);
      },
    });
  }
}


