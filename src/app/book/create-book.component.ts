import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Book } from './../models/book';
import { BookServiceService } from './../service/book-service.service';

const initFormValue = {
  nameBook: '',
  nameAuthor: '',
  description: '',
};

@Component({
  selector: 'app-book',
  template: `
    <h1 class="mb-5" style="text-align: center;">Tạo mới sách</h1>
    <a routerLink="/book"
      ><button class="mb-5 btn btn-primary">Xem danh sách</button></a
    >
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="container">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Tên sách</label>
            <input
              type="text"
              class="form-control"
              formControlName="nameBook"
              id="bookName"
              placeholder="Nhập tên sách"
            />
            <span
              class="text-danger"
              *ngIf="
                form?.controls?.nameBook?.dirty &&
                form?.controls?.nameBook?.errors
              "
            >
              {{
                form?.controls?.nameBook?.errors?.required
                  ? 'This field is required'
                  : 'Tên sách quá dài'
              }}
            </span>
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Nhập tên tác giả</label>
            <input
              type="text"
              class="form-control"
              formControlName="nameAuthor"
              id="nameAuthor"
              placeholder="Tên tác giả"
            />
            <span
              class="text-danger"
              *ngIf="
                form?.controls?.nameAuthor?.dirty &&
                form?.controls?.nameAuthor?.errors
              "
            >
              {{
                form?.controls?.nameAuthor?.errors?.required
                  ? 'This field is required'
                  : 'Tên sách quá dài'
              }}
            </span>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Mô tả</label>
            <input
              type="text"
              class="form-control"
              formControlName="description"
              id="description"
              placeholder="Nhập mô tả"
            />
            <span
              class="text-danger"
              *ngIf="
                form?.controls?.description?.dirty &&
                form?.controls?.description?.errors
              "
            >
              {{
                form?.controls?.description?.errors?.required
                  ? 'This field is required'
                  : 'Tên sách quá dài'
              }}
            </span>
          </div>
        </div>

        <button type="submit" class="btn btn-primary mt-4">Tạo mới</button>
      </div>
    </form>
  `,
  styleUrls: ['./book/book.component.css'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private bookService: BookServiceService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(),
      quantity: new FormControl(),
      price: new FormControl(),
    });

    this.form = this.formBuilder.group({
      nameBook: ['', [Validators.required, Validators.maxLength(30)]],
      nameAuthor: ['', [Validators.required, Validators.min(3)]],
      description: ['', [Validators.required]],
    });
  }

  submit() {
    Object.keys(this.form.controls)
      .forEach((key) => this.form.controls[key].markAsDirty());

    if (this.form.invalid) return;

    const { nameBook, nameAuthor, description } = this.form.value;

    const dto: Book = {
      nameBook: nameBook,
      nameAuthor: nameAuthor,
      description: description,
    } as Book;

    this.bookService.add(dto).subscribe(
      (res) => {
        this.toast.success('Tạo mới thành công !', dto.nameBook);
        this.form.reset(), this.form.patchValue(initFormValue);
      },
      (error) => alert(error.message)
    );
  }
}
