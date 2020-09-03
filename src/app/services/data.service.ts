import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { delay, map, share, shareReplay, switchMap, toArray } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<any> {
    return this.http.get('https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json');
  }

  getBookImage(): Observable<any> {
    return this.getBooks().pipe(
      switchMap(book => this.http.get(book['ISBN:0451526538'].thumbnail_url).pipe(
        map(response => response.toString())
      )),
      map(responseString => responseString.toUpperCase())
    );
  }

  getArrayObservable(): Observable<string[]> {
    return of({ records: [1, 2, 3, 4, 5] }).pipe(
      map(result => result.records),
      switchMap(records => from(records)),
      map(element => element.toString() + ' --- '),
      delay(1000),
      toArray(),
    );
  }

}
