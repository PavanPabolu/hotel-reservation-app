import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  //To handle the data-logic

  private reservations : Reservation[] = []; //this property should not be empty, if using storage.

  //The constructor the service will invoked before the ngOnInit lifecycle hook
  constructor(){
    //this.reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    let savedReservations = localStorage.getItem('reservations');
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }


  getReservations() : Reservation[] {
    return this.reservations;
  }

  getReservation(id : string) : Reservation | undefined {
    return this.reservations.find(x => x.id === id);
  }

  addReservation(reservation : Reservation):void {

    //id should not be created by the user which creates by the db server. but here the case is, we are using localstorage for demo purpose.
    reservation.id = Date.now().toString(); 

    this.reservations.push(reservation);
    console.log(this.reservations);

    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    // this.reservations = this.reservations.filter(x => x.id != id);
    let index = this.reservations.findIndex(x => x.id === id);
    this.reservations.splice(index, 1);

    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(id : string, updatedReservation : Reservation): void { //updatedReservation will not have the "id", so pass id explicitly
    // let index = this.reservations.findIndex(x => x.id === updatedReservation.id);
    let index = this.reservations.findIndex(x => x.id === id);
    updatedReservation.id=id;
    this.reservations[index] = updatedReservation;

    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  
}
