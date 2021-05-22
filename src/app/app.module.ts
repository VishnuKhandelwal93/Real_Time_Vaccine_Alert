import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppService} from "./app.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {AngMusicPlayerModule} from "ang-music-player";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngMusicPlayerModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
