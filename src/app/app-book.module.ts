import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BookComponent } from './book/book/book.component';
import { CreateComponent } from './book/create-book.component';
import { EditComponent } from './book/edit-book.component';
import { DetailComponent } from './book/detail-book.component';

const routesConfig: Routes = [
  { path: 'book', component: BookComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '', redirectTo: '/book', pathMatch: 'full' },
  { path: '**', component: BookComponent },
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routesConfig), CommonModule],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
