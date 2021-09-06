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
  selector: 'app-book',
  template: `
    <h1 class="mb-5" style="text-align: center;">Cập nhật sách</h1>
    <a routerLink="/book"
      ><button class="mb-5 btn btn-primary">Xem danh sách</button></a
    >
    <form [formGroup]="editBook" (ngSubmit)="update()">
      <div class="container">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Tên sách</label>
            <input
              type="text"
              class="form-control"
              formControlName="nameBook"
              id="nameBook"
              placeholder="Nhập tên"
            />
            <span
              class="text-danger"
              *ngIf="
                editBook?.controls?.nameBook?.dirty &&
                editBook?.controls?.nameBook?.errors
              "
            >
              {{
                editBook?.controls?.nameBook?.errors?.required
                  ? 'This field is required'
                  : 'Tên sách quá dài'
              }}
            </span>
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Tên tác giả</label>
            <input
              type="text"
              class="form-control"
              formControlName="nameAuthor"
              id="nameAuthor"
              placeholder="tên tác giả"
            />
            <span
              class="text-danger"
              *ngIf="
                editBook?.controls?.nameAuthor?.dirty &&
                editBook?.controls?.nameAuthor?.errors
              "
            >
              {{
                editBook?.controls?.nameAuthor?.errors?.required
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
              placeholder="Mô tả"
            />
            <span
              class="text-danger"
              *ngIf="
                editBook?.controls?.description?.dirty &&
                editBook?.controls?.description?.errors
              "
            >
              {{
                editBook?.controls?.description?.errors?.required
                  ? 'This field is required'
                  : 'Tên sách quá dài'
              }}
            </span>
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-4">
          Lưu Thông tin
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./book/book.component.css'],
})
export class EditComponent implements OnInit {
  editBook!: FormGroup;

  constructor(
    private bookService: BookServiceService,
    private router: ActivatedRoute,
    private toast: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editBook = new FormGroup({
      nameBook: new FormControl(),
      nameAuthor: new FormControl(),
      description: new FormControl(),
    });

    this.editBook = this.formBuilder.group({
      nameBook: ['', [Validators.required, Validators.maxLength(30)]], // Tuple [string, Array]
      nameAuthor: ['', [Validators.required, Validators.min(3)]],
      description: ['', [Validators.required]],
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

  update() {
    this.bookService
      .update(this.router.snapshot.params.id, this.editBook.value)
      .subscribe(
        (resutl) => {
          this.toast.success('Thay đổi thành công !', resutl.nameBook);
        },
        (error) => alert(error.message)
      );
  }
}
