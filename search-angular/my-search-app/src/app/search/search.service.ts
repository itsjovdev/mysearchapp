import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SearchResult {
  id?: number;
  title: string;
  icon: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/api/entries';

  constructor(private http: HttpClient) {}

  getEntries(): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.apiUrl);
  }

  addEntry(entry: SearchResult): Observable<SearchResult> {
    return this.http.post<SearchResult>(this.apiUrl, entry);
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
