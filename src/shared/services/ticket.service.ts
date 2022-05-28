import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, retry, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Ticket } from "../model/ticket.model";

@Injectable({
    providedIn: 'root'
})
export class TicketService{
    private apiUrl = 'https://localhost:44362/';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })
      };
    /**
     *
     */
    constructor(private http: HttpClient) {}

    getAllTicket(): Observable<Ticket[]>{
        return this.http.get<Ticket[]>(this.apiUrl + 'api/Ticket/GetTickets')
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        );
      }

      getTicket(id: any) : Observable<Ticket>{
          return this.http.get<Ticket>(this.apiUrl + 'api/Ticket/GetTicket' + id)
          .pipe(
              retry(1),
              catchError(this.errorHandler)
          );
      }

      scanTicket(id: number){
        return this.http.get(this.apiUrl + 'api/Ticket/ScanTicket?id=' + id,{responseType :'text'})
        .pipe(
            retry(1),
            catchError(this.errorHandler)
        );
      }

      BuyTicket(ticket: Ticket): Observable<Ticket>{
          return this.http.post<Ticket>(this.apiUrl + 'api/Ticket/BuyTicket', ticket)
          .pipe(
              retry(1),
              catchError(this.errorHandler)
          );
      }

      errorHandler(error:any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // console.log(errorMessage);
        return throwError(errorMessage);
      }
}