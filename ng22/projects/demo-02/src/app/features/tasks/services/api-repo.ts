import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StoreRx as Repo } from '../../../core/types/store.rx';
import { Task } from '../entities/task';
import { map, Observable } from 'rxjs';

@Service()
export class ApiRepo implements Repo<Task> {

  readonly #http = inject(HttpClient);
  readonly apiUrl = environment.apiUrl+'/tasks';

  // Funcionamiento de fetch
  // agrupando errores (de red o del servidor)
  async getFetch() {
    const response = await fetch(this.apiUrl)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Task[]>;
  }

  get(): Observable<Task[]> {
    return this.#http.get<Task[]>(this.apiUrl);
  }

  getById(id: string): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.#http.get<Task>(url);
  }
  add(newItem: Omit<Task, 'id'>): Observable<Task> {
    return this.#http.post<Task>(this.apiUrl, newItem);
  }
  update(updatedItem: Task): Observable<Task> {
    const url = `${this.apiUrl}/${updatedItem.id}`;
    return this.#http.put<Task>(url, updatedItem);
  }
  patch?(id: string, pathData: Partial<Omit<Task, 'id'>>): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.#http.patch<Task>(url, pathData);
  }
  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.#http.delete<void>(url).pipe(
      map(() => undefined)
    );
  }


}
