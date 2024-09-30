import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
// import { JsonPipe } from '@angular/common';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  //To handle the data-logic

  private apiUrl : string = "http://localhost:3001";

  private reservations : Reservation[] = []; //this property should not be empty, if using storage.

  //The constructor the service will invoked before the ngOnInit lifecycle hook
 /* constructor(){
    //this.reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    let savedReservations = localStorage.getItem('reservations');
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }
*/

constructor(private http: HttpClient) { 

}

 
//getReservations(): Reservation[] {
  getReservations(): Observable<Reservation[]> {
    //return this.reservations;
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  // getReservation(id : string) : Reservation | undefined {
  getReservation(id : string) : Observable<Reservation> {
    // return this.reservations.find(x => x.id === id);
    return this.http.get<Reservation>(this.apiUrl + '/reservation/'+id);
  }

  /*
  addReservation(reservation : Reservation):void {

    //id should not be created by the user which creates by the db server. but here the case is, we are using localstorage for demo purpose.
    reservation.id = Date.now().toString(); 

    this.reservations.push(reservation);
    console.log(this.reservations);

    //localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }*/
    addReservation(reservation : Reservation):Observable<void> {
      return this.http.post<void>(this.apiUrl + '/reservation', reservation);
    }

  deleteReservation(id: string): Observable<void> {
    /*// this.reservations = this.reservations.filter(x => x.id != id);
    let index = this.reservations.findIndex(x => x.id === id);
    this.reservations.splice(index, 1);

    //localStorage.setItem('reservations', JSON.stringify(this.reservations));
    */

    return this.http.delete<void>(this.apiUrl + '/reservation/'+id);
  }

  /*
  updateReservation(id : string, updatedReservation : Reservation): void { //updatedReservation will not have the "id", so pass id explicitly
    // let index = this.reservations.findIndex(x => x.id === updatedReservation.id);
    let index = this.reservations.findIndex(x => x.id === id);
    updatedReservation.id=id;
    this.reservations[index] = updatedReservation;

    //localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }*/

  updateReservation(id : string, updatedReservation : Reservation): Observable<void> { //updatedReservation will not have the "id", so pass id explicitly
    return this.http.put<void>(this.apiUrl + '/reservation/'+id, updatedReservation);
  }
  
}
