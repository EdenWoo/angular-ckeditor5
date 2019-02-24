import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularCkeditor5Module} from '../../projects/angular-ckeditor5/src/lib/angular-ckeditor5.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularCkeditor5Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
