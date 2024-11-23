import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'ball-spin' }),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    }),
    HttpClientModule
  ],
  providers: [
      ToastrService,
    {
      provide: 'SPINNER_CONFIG',
      useValue: { type: 'ball-spin' },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
