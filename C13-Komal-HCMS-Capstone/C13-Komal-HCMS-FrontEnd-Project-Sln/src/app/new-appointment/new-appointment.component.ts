import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../model/hcms.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  searchQuery: string = '';
  appointmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    // Initialize the form with form controls and validation rules
    this.appointmentForm = this.fb.group({
      id: [''], // ID field for tracking new or updated appointments
      patientName: ['', [Validators.required, Validators.minLength(3)]],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  goBack(): void {
    // Navigate to the dashboard route
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  // Fetch all appointments
  getAppointments() {
    this.appointmentService.getAppointment().subscribe({
      next: (data) => {
        this.appointments = data;
        this.filteredAppointments = data; // Initialize filteredAppointments
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      },
    });
  }

  // Filter appointments dynamically
  filterAppointments() {
    const query = this.searchQuery.toLowerCase();
    this.filteredAppointments = this.appointments.filter((appointment) => {
      return (
        appointment.id.toLowerCase().includes(query) ||
        appointment.patientName.toLowerCase().includes(query) ||
        (appointment.doctorName && appointment.doctorName.toLowerCase().includes(query))
      );
    });
  }

  // Handle form submission (create or update)
  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;

      if (formData.id) {
        // Update existing appointment
        this.appointmentService.updateAppointment(formData.id, formData).subscribe({
          next: () => {
            this.getAppointments(); // Refresh the list
            this.appointmentForm.reset(); // Clear the form
          },
          error: (error) => {
            console.error('Error updating appointment:', error);
          },
        });
      } else {
        // Create new appointment
        const newAppointmentData = {
          ...formData,
          id: this.generateUniqueId(),
        };

        this.appointmentService.createAppointment(newAppointmentData).subscribe({
          next: () => {
            this.getAppointments(); // Refresh the list
            this.appointmentForm.reset(); // Clear the form
          },
          error: (error) => {
            console.error('Error creating appointment:', error);
          },
        });
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Generate a unique ID for new appointments
  generateUniqueId(): string {
    const lastCounter = Number(localStorage.getItem('currentMatchIdCounter')) || 1;
    const uniqueNumber = lastCounter.toString().padStart(4, '0');
    const id = `A${uniqueNumber}`;
    localStorage.setItem('currentMatchIdCounter', (lastCounter + 1).toString());
    return id;
  }

  // Load appointment data into the form for editing
  updateAppointment(appId: string) {
    this.appointmentService.getAppointmentById(appId).subscribe({
      next: (data) => {
        this.appointmentForm.patchValue(data);
      },
      error: (error) => {
        console.error('Error loading appointment for update:', error);
      },
    });
  }

  // Delete an appointment
  deleteAppointment(appId: string) {
    this.appointmentService.deleteAppointment(appId).subscribe({
      next: () => {
        this.getAppointments(); // Refresh the list
      },
      error: (error) => {
        console.error('Error deleting appointment:', error);
      },
    });
  }
}
