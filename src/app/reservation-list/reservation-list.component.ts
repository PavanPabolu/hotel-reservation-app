import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit{

  reservations : Reservation[] =[];
  
  //Angular will automatically inject the service
  constructor(private reservationService : ReservationService){
  }

  ngOnInit(): void {
    //this.reservations = this.reservationService.getReservations();
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  deleteReservation(id : string){
    this.reservationService.deleteReservation(id).subscribe( () => {
      console.log("Delete request got processed!");
    });
  }

}
