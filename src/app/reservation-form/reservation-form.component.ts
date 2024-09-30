import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

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
    private reservationService : ReservationService, //Angular DI is injecting the Reservationservice
    private router : Router,                    //for redirection, on add record.
    private activatedRoute : ActivatedRoute     //for url querystring parameters
      ){ 
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

    //to get the id from the url querystring
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      //let reservation = this.reservationService.getReservation(id);
      this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation)
          this.reservationForm.patchValue(reservation); //patch the values means read values from object fill into the form
      });

      /*if(reservation)
        this.reservationForm.patchValue(reservation); //patch the values means read values from object fill into the form
      */
    }
  }


  onSubmit() : void {

    if(this.reservationForm.valid){
      console.log("valid.!");

      //This component has only UI-related and no business logic, instead consuming the service for business logic.
      let reservation : Reservation = this.reservationForm.value; //taking directly from the reservationform property

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        //update
        // reservation.id = id; // as the property "id" is not available in the reservation form page. but it is less safe that exposing the id in the page
        // this.reservationService.updateReservation(reservation);
        
        /*this.reservationService.updateReservation(id, reservation);*/
        this.reservationService.updateReservation(id, reservation).subscribe(() => {
          console.log("Update request proecessed.");
        });
      }
      else {
        //new
        //this.reservationService.addReservation(reservation);
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log("Add request proecessed.");
        });
      }

      //navigate to list page, on operation success.
      this.router.navigate(['/list']);
    }

  }
}
