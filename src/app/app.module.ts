import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { NavbarComponent } from './navbar/navbar.component';
import { AddticketComponent } from './ticket-list/addTicket/addticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,TicketListComponent, AdminComponent,AddticketComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule, FormsModule,
    AppRoutingModule,HttpClientModule,
    BrowserAnimationsModule,ToastrModule.forRoot(),
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
