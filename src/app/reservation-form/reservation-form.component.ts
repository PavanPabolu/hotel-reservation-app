import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{
 
  reservationForm : FormGroup = new FormGroup({});

  //for dependancy injection for formbuilder object when an instance created for  this componenet class.
  constructor(
    private formBuilder : FormBuilder,
    private reservationService : ReservationService ){ //Angular DI is injecting the Reservationservice

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
        checkInDate : ['', Validators.required],
        checkOutDate : ['', Validators.required],
        guestName : ['', Validators.required],
        guestEmail : ['', [Validators.required, Validators.email]],
        roomNumber : ['', Validators.required]
    });
  }


  onSubmit() : void {
    console.log(1);
    if(this.reservationForm.valid){
      console.log("valid.!");

      let reservation : Reservation = this.reservationForm.value; //taking directly from the reservationform property
      this.reservationService.addReservation(reservation);
    }

  }
}
