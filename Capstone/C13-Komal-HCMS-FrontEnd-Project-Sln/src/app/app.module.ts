import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PatientsComponent } from "./patients/patients.component";
// import { AppointmentsComponent } from "./appointments/appointments.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
// import { ReviewsComponent } from "./reviews/reviews.component";
import { NewReviewComponent } from "./new-review/new-review.component";
import { NewAppointmentComponent } from "./new-appointment/new-appointment.component";
import { RouterModule } from "@angular/router";

@NgModule ({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DoctorsComponent,
        PatientsComponent,
        // AppointmentsComponent,
        HospitalsComponent,
        // ReviewsComponent,
        NewReviewComponent,
        NewAppointmentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgClass,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    bootstrap: [AppComponent],
})

export class AppModule{  } 


