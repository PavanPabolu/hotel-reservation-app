import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{
 
  reservationForm : FormGroup = new FormGroup({});

  //Angular DI will inject the instances for formbuilder object when an instance created for  this componenet class.
  constructor(
    private formBuilder : FormBuilder,
    private reservationService : ReservationService,
    private router : Router ){ //Angular DI is injecting the Reservationservice
  }

  //ngOnInit is a lifecycle hook in angular
  ngOnInit(): void {  
    //Form fields validation @typescript class
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

      //This component has only UI-related and no business logic, instead consuming the service for business logic.
      let reservation : Reservation = this.reservationForm.value; //taking directly from the reservationform property
      this.reservationService.addReservation(reservation);

      //navigate to list page, on operation success.
      this.router.navigate(['/list']);
    }

  }
}
