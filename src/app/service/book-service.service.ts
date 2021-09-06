import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Book} from './../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private api_url = 'https://6100c215bca46600171cf999.mockapi.io/book';

  constructor(private _httpClient: HttpClient) {}
  getAllBook(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this.api_url);
  }

  // getList(): Observable<Product[]> {
  //     return this._httpClient.get<Product[]>(endpoint)
  // }

  getById(id: number): Observable<Book> {
    return this._httpClient.get<Book>(this.api_url + '/' + id);
  }

  add(dto: Book): Observable<Book> {
    return this._httpClient.post<Book>(this.api_url, dto);
  }

  update(id: number, dto: Book): Observable<Book> {
    return this._httpClient.put<Book>(this.api_url + '/' + id, dto);
  }

  delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.api_url + '/' + id);
  }
}
