import { Component, inject, signal } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { TaskForm } from '../task-form/task-form';
import { Task } from '../../entities/task';
import { TasksStoreRx } from '../../services/tasks-store-rx';

@Component({
  selector: 'ind-tasks-list',
  imports: [TaskItem, TaskForm],
  template: `
    @if (isLoading()) {
      <p>Loading tasks...</p>
    } @else if (error()) {
      <p>Error: {{ error() }}</p>
    } @else {
      <details #details>
        <summary>Add Task</summary>
        <ind-task-form />
      </details>
      <div class="tasks-list">
        @for (task of tasks(); track task.id) {
          <!-- <ind-task-item [task]="task" (deleteEvent)="delete($event)" /> -->
          <ind-task-item [task]="task" />
        }
      </div>
    }
    <p>Lista que utiliza el servicio con Observable de RxJS</p>
    <!-- <pre>{{ tasks() | json }}</pre> -->
  `,
  styles: `
    .tasks-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `,
})
export class TasksList {
  private tasksStore = inject(TasksStoreRx);

  protected tasks = signal<Task[]>([]);
  protected isLoading = signal<boolean>(true);
  protected error = signal<string | null>(null);

  constructor() {
    this.tasksStore.tasks$.subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.error.set(error.message);
      },
    });


  }
}
