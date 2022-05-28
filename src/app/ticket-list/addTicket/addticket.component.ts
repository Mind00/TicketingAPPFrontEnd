import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from 'src/shared/services/ticket.service';

import { Ticket } from 'src/shared/model/ticket.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {
  // minDate: Date;
  // maxDate: Date;

  ticketForm!:FormGroup;
  isLoading: boolean = false;
  submitted: boolean = false;

  constructor(
    private ticketService: TicketService,
    private route: Router,
   ) { 


    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 20, 0, 1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
     
  }


}
