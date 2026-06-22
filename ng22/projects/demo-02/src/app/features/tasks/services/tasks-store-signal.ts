import { DestroyRef, inject, Service, signal } from '@angular/core';

import { Task } from '../entities/task';
import { ApiRepo } from './api-repo';
import { delay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


interface TasksStore {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
}


@Service()
export class TasksStoreSignal {

  readonly #repo = inject(ApiRepo);
  readonly #destroyRef = inject(DestroyRef);
  
  readonly #tasks = signal<TasksStore>({ tasks: [], isLoading: false, error: null });
  readonly tasks = this.#tasks.asReadonly();
  // computed(() => this.#tasks());
  

  readonly #mockDelay = 500;

  get() {
    this.#tasks.set({ tasks: [], isLoading: true, error: null });
    this.#repo
      .get()
      .pipe(delay(this.#mockDelay))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (tasks) => this.#tasks.set({ tasks, isLoading: false, error: null }),
        error: (error) => this.#tasks.set({ tasks: [], isLoading: false, error }),
      });
  }
  
}

