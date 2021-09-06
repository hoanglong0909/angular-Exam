import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Book } from './../../models/book';
import { BookServiceService } from './../../service/book-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  public book: Book[] = [];
  constructor(
    private _bookService: BookServiceService,
    private toast: ToastrService
  ) {}
  getAllBook() {
    this.subscriptions = this._bookService.getAllBook().subscribe(
      (data) => {
        this.book = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    this.getAllBook();
  }

  delete(dto: Book): void {
    if (confirm('Are you sure?')) {
      this._bookService.delete(dto.id).subscribe(
        (res) => (
          this.toast.success('Xóa thành công !', dto.nameBook),
          (this.book = this.book.filter((d) => d != dto))
        ),

        (error) => alert('Error!')
      );
    }
  }
}
