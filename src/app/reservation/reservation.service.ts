import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations : Reservation[] = [];

  getReservations() : Reservation[] {
    return this.reservations;
  }

  getReservation(id : string) : Reservation | undefined {
    return this.reservations.find(x => x.id === id);
  }

  addReservation(reservation : Reservation):void {
    this.reservations.push(reservation);
    console.log(this.reservations);
  }

  deleteReservation(id: string): void {
    // this.reservations = this.reservations.filter(x => x.id != id);
    let index = this.reservations.findIndex(x => x.id === id);
    this.reservations.splice(index, 1);
  }

  updateReservation(updatedReservation : Reservation): void {
    let index = this.reservations.findIndex(x => x.id === updatedReservation.id);
    this.reservations[index] = updatedReservation;
  }
  
}
