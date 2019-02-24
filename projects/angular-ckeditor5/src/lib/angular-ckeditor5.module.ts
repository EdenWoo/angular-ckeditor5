import { NgModule } from '@angular/core';
import { AngularCkeditor5Component } from './angular-ckeditor5.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
@NgModule({
  declarations: [AngularCkeditor5Component],
  imports: [
    CKEditorModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [AngularCkeditor5Component]
})
export class AngularCkeditor5Module { }
