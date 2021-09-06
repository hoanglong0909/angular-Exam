import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { BookServiceService } from './../service/book-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  template: `
    <h1 class="mb-5" style="text-align: center;">Chi tiết sách</h1>
    <a routerLink="/book"
      ><button class="mb-5 btn btn-primary">Xem danh sách</button></a
    >

    <h4 class="mb-5">Chi tiết sách</h4>
    <form [formGroup]="editBook">
      <div class="container">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Tên sách</label>
            <input
              type="text"
              class="form-control"
              formControlName="nameBook"
              id="nameBook"
              [readonly]="true"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Tên tác giả</label>
            <input
              type="text"
              class="form-control"
              formControlName="nameAuthor"
              id="nameAuthor"
              [readonly]="true"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Mô tả</label>
            <input
              type="text"
              class="form-control"
              formControlName="description"
              id="description"
              [readonly]="true"
            />
          </div>
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./book/book.component.css'],
})
export class DetailComponent implements OnInit {
  editBook!: FormGroup;

  constructor(
    private bookService: BookServiceService,
    private router: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.editBook = new FormGroup({
      nameBook: new FormControl(),
      nameAuthor: new FormControl(),
      description: new FormControl(),
    });

    this.bookService
      .getById(this.router.snapshot.params.id)
      .subscribe((resutl) => {
        this.editBook = new FormGroup({
          nameBook: new FormControl(resutl['nameBook']),
          nameAuthor: new FormControl(resutl['nameAuthor']),
          description: new FormControl(resutl['description']),
        });
      });
  }
}
