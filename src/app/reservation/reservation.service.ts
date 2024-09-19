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

  updateReservation(updatedReservation : Reservation): void {
    let index = this.reservations.findIndex(x => x.id === updatedReservation.id);
    this.reservations[index] = updatedReservation;

    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  
}
