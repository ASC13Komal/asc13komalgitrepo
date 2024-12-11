import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PatientsComponent } from "./patients/patients.component";
// import { AppointmentsComponent } from "./appointments/appointments.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
// import { ReviewsComponent } from "./reviews/reviews.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./service/auth-guard.service";
import { NewReviewComponent } from "./new-review/new-review.component";
import { NewAppointmentComponent } from "./new-appointment/new-appointment.component";


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent},
    { path: 'doctors', component: DoctorsComponent},
    { path: 'patients', component: PatientsComponent},
    // { path: 'appointments', component: AppointmentsComponent},
    { path: 'hospitals', component: HospitalsComponent},
    // { path: 'reviews', component: ReviewsComponent},
    {path: 'newReview',component:NewReviewComponent},
    {path: 'newAppointment', component: NewAppointmentComponent}
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{ }
