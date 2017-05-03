import { BrowserModule } from '@angular/platform-browser/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AppComponent],
    imports: [ 
        CommonModule,
        BrowserModule
    ],
    exports: [ AppModule ],
    providers: [],
    bootstrap: [ BrowserModule ]
})
export class AppModule {}