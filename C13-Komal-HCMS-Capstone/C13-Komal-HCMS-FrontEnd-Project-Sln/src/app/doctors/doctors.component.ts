import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { Doctor } from '../model/hcms.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent {
  constructor(private doctorService: DoctorService, private router: Router) {}

  doctors: Doctor[] = [
    { id: 1, name: 'Dr. Sheetal', specialization: 'Cardiology', contact: '9876543210' },
    { id: 2, name: 'Dr. Rajath', specialization: 'Neurology', contact: '9876543211' },
  ];

  showAddForm = false;
  searchQuery = '';
  editMode = false;
  newDoctor: Doctor = { id: 0, name: '', specialization: '', contact: '' };

  // Toggle the form visibility
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  goBack(): void {
    // Navigate to the dashboard route
    this.router.navigate(['/dashboard']);
  }

  // Add new doctor
  addDoctor() {
    if (!this.newDoctor.name || !this.newDoctor.specialization || !this.newDoctor.contact) {
      alert('Please fill in all the fields.');
      return;
    }

    // Generate a new unique ID
    const newId = this.doctors.length ? Math.max(...this.doctors.map(d => d.id)) + 1 : 1;
    this.newDoctor.id = newId;

    // Call the service to add the new doctor
    this.doctorService.createDoctor(this.newDoctor).subscribe({
      next: () => {
        this.doctors.push({ ...this.newDoctor });
        // alert('Doctor added successfully!');
        this.resetForm();
        this.showAddForm = false;
      },
      error: (err) => {
        console.error('Error adding doctor:', err);
        alert('Failed to add doctor. Please try again.');
      }
    });
  }

  // Update existing doctor
  updateDoctor() {
    const index = this.doctors.findIndex(doctor => doctor.id === this.newDoctor.id);
    if (index !== -1) {
      this.doctors[index] = { ...this.newDoctor };
    }

    this.resetForm();
    this.showAddForm = false;
    this.editMode = false;
  }

  // Search doctors
  searchDoctors() {
    const query = this.searchQuery.toLowerCase();
    this.doctors = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialization.toLowerCase().includes(query)
    );
  }

  // Delete doctor
  deleteDoctor(id: number) {
    this.doctors = this.doctors.filter(doctor => doctor.id !== id);
  }

  // Set doctor data in the form for editing
  editDoctor(doctor: Doctor) {
    this.newDoctor = { ...doctor };
    this.showAddForm = true;
    this.editMode = true;
  }

  // Reset the form
  resetForm() {
    this.newDoctor = { id: 0, name: '', specialization: '', contact: '' };
  }
}
