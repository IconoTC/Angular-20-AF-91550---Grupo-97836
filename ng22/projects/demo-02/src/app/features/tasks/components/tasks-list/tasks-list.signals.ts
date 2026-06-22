import { Component, inject } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { TaskForm } from '../task-form/task-form';
import { TasksStoreSignal } from '../../services/tasks-store-signal';

@Component({
  selector: 'ind-tasks-list',
  imports: [TaskItem, TaskForm],
  template: `
    @if (state().isLoading) {
      <p>Loading tasks...</p>
    } @else if (state().error) {
      <p>Error: {{ state().error }}</p>
    } @else {
      <details #details>
        <summary>Add Task</summary>
        <ind-task-form />
      </details>
      <div class="tasks-list">
        @for (task of state().tasks; track task.id) {
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
  private tasksStore = inject(TasksStoreSignal);
  readonly state = this.tasksStore.tasks;

  // protected tasks = computed(() => this.tasksStore.tasks().tasks);
  // protected isLoading = computed(() => this.tasksStore.tasks().isLoading);
  // protected error = computed(() => this.tasksStore.tasks().error);

  // constructor() {
  //   this.tasksStore.tasks$.subscribe({
  //     next: (tasks) => {
  //       this.tasks.set(tasks);
  //       this.isLoading.set(false);
  //     },
  //     error: (error) => {
  //       this.isLoading.set(false);
  //       this.error.set(error.message);
  //     },
  //   });


  // }
}
