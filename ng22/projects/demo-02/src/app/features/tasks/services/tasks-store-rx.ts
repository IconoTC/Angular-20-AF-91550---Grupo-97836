import { DestroyRef, inject, Service } from '@angular/core';
import { Task } from '../entities/task';
import { BehaviorSubject, delay } from 'rxjs';
import { ApiRepo } from './api-repo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Service()
export class TasksStoreRx {
  readonly #repo = inject(ApiRepo);
  readonly #destroyRef = inject(DestroyRef);
  readonly #tasks = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this.#tasks.asObservable();
  readonly #mockDelay = 500;

  get() {
    this.#repo
      .get()
      .pipe(delay(this.#mockDelay))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (tasks) => this.#tasks.next(tasks),
        error: (error) => this.#tasks.error(error),
      });
  }

  add(newTask: Omit<Task, 'id'>) {
    this.#repo
      .add(newTask)
      .pipe(delay(this.#mockDelay))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (task) => {
          const currentTasks = this.#tasks.getValue();
          this.#tasks.next([...currentTasks, task]);
        },
      });
  }

  delete(id: Task['id']) {
    this.#repo
      .delete(id)
      .pipe(delay(this.#mockDelay))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          const currentTasks = this.#tasks.getValue();
          this.#tasks.next(currentTasks.filter((task) => task.id !== id));
        },
      });
  }

  update(updatedTask: Task) {
    this.#repo
      .update(updatedTask)
      .pipe(delay(this.#mockDelay))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (task) => {
          const currentTasks = this.#tasks.getValue();
          this.#tasks.next(currentTasks.map((t) => (t.id === task.id ? task : t)));
        },
      });
  }
}
