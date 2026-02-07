import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, item);
  }

  updateItem(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/members/${id}/`, data);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/items/${id}/`);
  }
}
