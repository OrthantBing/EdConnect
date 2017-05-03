import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [AppComponent],
    imports: [ 
        CommonModule,
        BrowserModule,
        NgbModule.forRoot()
    ],
    exports: [],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}