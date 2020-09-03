import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  bookData$: Observable<any>;
  bookImg$: Observable<any>;

  numberArray$: Observable<string[]>;

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.bookData$ = this.data.getBooks().pipe(
      map(data => data['ISBN:0451526538'])
    );
    this.bookImg$ = this.data.getBookImage();

    this.numberArray$ = this.data.getArrayObservable();
  }
}
