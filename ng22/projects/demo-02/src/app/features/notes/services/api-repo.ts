import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StoreRx as Repo } from '../../../core/types/store.rx';
import { Note } from '../entities/note';
import { map, Observable } from 'rxjs';

@Service()
export class ApiRepo implements Repo<Note> {

  readonly #http = inject(HttpClient);
  readonly apiUrl = environment.apiUrl+'/notes';

  // Funcionamiento de fetch
  // agrupando errores (de red o del servidor)
  async getFetch() {
    const response = await fetch(this.apiUrl)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Note[]>;
  }

  get(): Observable<Note[]> {
    return this.#http.get<Note[]>(this.apiUrl);
  }

  getById(id: string): Observable<Note> {
    const url = `${this.apiUrl}/${id}`;
    return this.#http.get<Note>(url);
  }
  add(newItem: Omit<Note, 'id'>): Observable<Note> {
    return this.#http.post<Note>(this.apiUrl, newItem);
  }
  update(updatedItem: Note): Observable<Note> {
    const url = `${this.apiUrl}/${updatedItem.id}`;
    return this.#http.put<Note>(url, updatedItem);
  }
  patch?(id: string, pathData: Partial<Omit<Note, 'id'>>): Observable<Note> {
    const url = `${this.apiUrl}/${id}`;
    return this.#http.patch<Note>(url, pathData);
  }
  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.#http.delete<void>(url).pipe(
      map(() => undefined)
    );
  }


}
