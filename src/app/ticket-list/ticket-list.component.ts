import { HtmlParser } from '@angular/compiler';
import { Component, OnInit , Inject, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Ticket } from 'src/shared/model/ticket.model';
import { TicketService } from 'src/shared/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {

  
  @ViewChild('closeDownloadBtn') closeDownloadBtnRef: ElementRef = <ElementRef>{};
  @ViewChild('closeSaveBtn') closeSaveBtnRef: ElementRef = <ElementRef>{};

  ticketForm!:FormGroup;
  isLoading: boolean = false;
  submitted: boolean = false;
  ticketList: Ticket[] = [];
  ticket!: Ticket;
  selectedTicket: string = '';

  private unsubscribed$: Subject<void>;

  constructor(private ticketService: TicketService,
    private toastrService: ToastrService) { 
      this.unsubscribed$ = new Subject();
    }

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      fullname: new FormControl(null,{validators:[Validators.required]}),
      ticketType: new FormControl(null, {validators: [Validators.required]}),
      price: new FormControl(null, {validators: [Validators.required]})
    });

    this.getTicketList();
  }

  getTicketList(){
    this.isLoading = true;
    this.ticketService.getAllTicket()
    .pipe(takeUntil(this.unsubscribed$))
    .subscribe((data)=>{
      this.isLoading = false;
      this.ticketList = data;
    });
  }
 

  getTicket(id:any){
    this.isLoading = true;
    this.ticketService.getTicket(id)
    .pipe(takeUntil(this.unsubscribed$))
    .subscribe((data)=>{
      this.isLoading = false;
      this.ticket = data;
    })
  }

  save(){
    this.submitted = true;
    if(this.ticketForm.invalid){
        return;
    }
    this.isLoading = true;
    this.buyTicket();
  }
    private buyTicket(){
      const inputTicket: any = {
        fullname: this.ticketForm.get('fullname')?.value,
        ticketType: this.ticketForm.get('ticketType')?.value,
        price: this.ticketForm.get('price')?.value,
        expire: ''
      };
      this.ticketService.BuyTicket(inputTicket)
      .pipe(takeUntil(this.unsubscribed$))
      .subscribe({
        next: () =>{
          this.ticketForm.reset();
          this.clickCloseSaveBtn();
          this.getTicketList();
          this.toastrService.success("Ticket Buy Successfully!");
        },
        error: error=>{
          this.toastrService.error(error);
          this.isLoading = false;
        }
      });
    }
    get f(){
      return this.ticketForm.controls;
    }



    downloadQRCode(qrModal: HTMLDivElement){
      let doc = new jsPDF();
  
      let imageData= qrModal?.querySelector('img')?.src || '';
      if(imageData){
        const ticket: Ticket= JSON.parse(this.selectedTicket) || <Ticket>{};
        doc.setFontSize(15);
        doc.text('Welcome to ABC park  '+ ticket?.fullname || '',15,25)
        doc.text('Ticket type : '+ ticket?.ticketType || '',15,35)
        doc.text('Price : '+ ticket?.price,15,40)
        doc.addImage(imageData, "png", 45,45,100,80);
        doc.save(ticket?.fullname || '' + 'Ticket.pdf');
        this.clickCloseDownloadBtn();
        this.closeQrModal();
      }
    }
  
    print(t:any){
      this.selectedTicket = JSON.stringify(t);
    }

    closeQrModal(){
      this.selectedTicket = '';
    }

    clickCloseDownloadBtn(){
      this.closeDownloadBtnRef.nativeElement.click();
    }

    clickCloseSaveBtn(){
      this.closeSaveBtnRef.nativeElement.click();
    }

    scanTicket(t:number){
      this.isLoading = true;
      this.ticketService.scanTicket(t)
        .pipe(takeUntil(this.unsubscribed$)).subscribe({
          next:(msg:any)=>{
            this.isLoading = false;
            this.getTicketList();
            this.toastrService.info(msg);
          },
          error: error=>{
            this.isLoading=false;
            this.toastrService.error(error);
          }
          
        })
    }

    ngOnDestroy(): void {
      this.unsubscribed$.next();
      this.unsubscribed$.complete();
    }

}
