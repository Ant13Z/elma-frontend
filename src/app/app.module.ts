import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppStore } from './app.store';
import { HttpClientModule }   from '@angular/common/http';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { FormsModule }   from '@angular/forms';
import { NgForm} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModalModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AppStore,
    NgbModalStack,
    NgbModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
