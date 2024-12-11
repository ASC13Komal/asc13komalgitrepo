import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { Patient } from '../model/hcms.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = []; // List of patients
  showAddForm = false;
  searchQuery = '';
  editMode = false; // Track whether it's in edit mode
  newPatient: Patient = this.resetPatient(); // Use model instance

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.getPatients(); // Fetch patients when the component initializes
  }

  // Fetch all patients
  getPatients() {
    this.patientService.getPatients().subscribe(
      (data: Patient[]) => (this.patients = data),
      (error) => console.error('Error fetching patients:', error)
    );
  }

  // Add new patient
  addPatient() {
    if (this.newPatient.name.trim() === '' || this.newPatient.phone.trim() === '') {
      alert('Name and Phone are required.');
      return;
    }
    this.patientService.addPatient(this.newPatient).subscribe(
      (data: Patient) => {
        this.patients.push(data); // Add new patient to the list
        this.resetForm();
        this.showAddForm = false;
      },
      (error) => console.error('Error adding patient:', error)
    );
  }

  // Update existing patient
  updatePatient() {
    this.patientService.updatePatient(this.newPatient.id, this.newPatient).subscribe(
      (data: Patient) => {
        const index = this.patients.findIndex((p) => p.id === this.newPatient.id);
        if (index !== -1) {
          this.patients[index] = data; // Update the local patient data
        }
        this.resetForm();
        this.showAddForm = false;
        this.editMode = false;
      },
      (error) => console.error('Error updating patient:', error)
    );
  }

  // Delete patient
  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe(
        () => {
          this.patients = this.patients.filter((p) => p.id !== id); // Remove from local list
        },
        (error) => console.error('Error deleting patient:', error)
      );
    }
  }

  // Search patients
  searchPatients() {
    if (this.searchQuery.trim()) {
      this.patientService.searchPatients(this.searchQuery).subscribe(
        (data: Patient[]) => (this.patients = data),
        (error) => console.error('Error searching patients:', error)
      );
    } else {
      this.getPatients(); // Reset to all patients if search query is empty
    }
  }

  // Set patient data in the form for editing
  editPatient(patient: Patient) {
    this.newPatient = { ...patient }; // Copy patient data to the form
    this.showAddForm = true;
    this.editMode = true;
  }

  // Reset the form
  resetForm() {
    this.newPatient = this.resetPatient(); // Reset using model instance
  }

  // Toggle Add Form
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  // Create a new empty Patient object
  private resetPatient(): Patient {
    return { id: 0, name: '', dob: new Date(), address: '', phone: '', email: '' };
  }
}
