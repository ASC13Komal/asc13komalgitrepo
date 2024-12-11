import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointments',
  // standalone: true,
  // imports: [],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})

export class AppointmentsComponent {
  constructor(private appointmentService: AppointmentService) {}

  appointments = [
    { id: 'A0001', doctor: 'Dr. Smith', patient: 'John Doe', date: '2024-12-06', time: '10:00', status: 'Scheduled' },
    { id: 'A0002', doctor: 'Dr. Brown', patient: 'Jane Doe', date: '2024-12-07', time: '14:00', status: 'Completed' },
  ];

  showAddForm = false;
  searchQuery = '';
  editMode = false;  // Track if in edit mode
  newAppointment = { id: '', doctor: '', patient: '', date: '', time: '', status: '' };

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  // Add new appointment
  addAppointment() {
    // Autogenerate ID
    const idPrefix = 'A';
    const newId = idPrefix + (this.appointments.length + 1).toString().padStart(4, '0');
    this.newAppointment.id = newId;

    // Add to list
    this.appointments.push({ ...this.newAppointment });

    // Clear form
    this.resetForm();
    this.showAddForm = false;
  }

  // Update existing appointment
  updateAppointment() {
    const index = this.appointments.findIndex(appointment => appointment.id === this.newAppointment.id);
    if (index !== -1) {
      this.appointments[index] = { ...this.newAppointment };  // Replace the old appointment data with the new one
    }

    // Reset form and close the form
    this.resetForm();
    this.showAddForm = false;
    this.editMode = false;
  }

  // Search appointments
  searchAppointments() {
    this.appointments = this.appointments.filter(appointment =>
      appointment.id.includes(this.searchQuery) ||
      appointment.doctor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      appointment.patient.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Delete appointment
  deleteAppointment(id: string) {
    this.appointments = this.appointments.filter(appointment => appointment.id !== id);
  }

  // Set appointment data in the form for editing
  editAppointment(appointment: any) {
    this.newAppointment = { ...appointment };  // Populate the form with the appointment's data
    this.showAddForm = true;  // Show the form
    this.editMode = true;  // Set edit mode to true
  }

  // Reset the form
  resetForm() {
    this.newAppointment = { id: '', doctor: '', patient: '', date: '', time: '', status: '' };
  }
}
