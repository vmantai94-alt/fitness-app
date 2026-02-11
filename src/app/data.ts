import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './shared/models/member';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getItems(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}`);
  }

  addItem(item: Member): Observable<Member> {
    return this.http.post<Member>(`${this.apiUrl}`, item);
  }

  updateItem(id: number, data: Member) {
    return this.http.patch(`${this.apiUrl}/${id}/`, data);
  }

  deleteItem(id: number): Observable<Member> {
    return this.http.delete<Member>(`${this.apiUrl}/${id}/`);
  }
}
