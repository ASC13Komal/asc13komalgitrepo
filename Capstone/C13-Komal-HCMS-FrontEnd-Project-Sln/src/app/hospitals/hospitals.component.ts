// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-hospitals',
//   // standalone: true,
//   // imports: [],
//   templateUrl: './hospitals.component.html',
//   styleUrl: './hospitals.component.css'
// })

// export class HospitalsComponent {
//   hospitals = [
//     { id: 'H0001', name: 'Apollo Hospital', location: 'Chennai', contact: '9876543210' },
//     { id: 'H0002', name: 'Fortis Hospital', location: 'Mumbai', contact: '9876543211' },
//   ];

//   showAddForm = false;
//   editMode = false;  // Track whether it's in edit mode
//   searchQuery = '';
//   newHospital = { id: '', name: '', location: '', contact: '' };

//   // Toggle the form visibility
//   toggleAddForm() {
//     this.showAddForm = !this.showAddForm;
//     if (!this.showAddForm) {
//       this.resetForm();
//     }
//   }

//   // Add a new hospital
//   addHospital() {
//     const idPrefix = 'H';
//     const newId = idPrefix + (this.hospitals.length + 1).toString().padStart(4, '0');
//     this.newHospital.id = newId;

//     // Add the new hospital to the list
//     this.hospitals.push({ ...this.newHospital });

//     // Clear the form and reset
//     this.resetForm();
//     this.showAddForm = false;
//   }

//   // Update an existing hospital
//   updateHospital() {
//     const index = this.hospitals.findIndex(hospital => hospital.id === this.newHospital.id);
//     if (index !== -1) {
//       this.hospitals[index] = { ...this.newHospital };  // Replace the existing hospital data with updated data
//     }

//     // Reset form and close it
//     this.resetForm();
//     this.showAddForm = false;
//     this.editMode = false;
//   }

//   // Search for hospitals based on query
//   searchHospitals() {
//     this.hospitals = this.hospitals.filter(hospital =>
//       hospital.id.includes(this.searchQuery) || hospital.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//   }

//   // Delete a hospital
//   deleteHospital(id: string) {
//     this.hospitals = this.hospitals.filter(hospital => hospital.id !== id);
//   }

//   // Set the form data to the selected hospital when editing
//   editHospital(hospital: any) {
//     this.newHospital = { ...hospital };  // Populate the form with selected hospital data
//     this.showAddForm = true;  // Show the form
//     this.editMode = true;  // Set edit mode to true
//   }

//   // Reset the form fields
//   resetForm() {
//     this.newHospital = { id: '', name: '', location: '', contact: '' };
//   }
// }

import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { Hospital } from '../model/hcms.model';
import { HospitalService } from '../service/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent {
  constructor(private hospitalservice: HospitalService) {}

  hospitals: Hospital[] = [
    { id: 1, name: 'Apollo Hospital', address: 'Chennai', contact: '9876543210' },
    { id: 2, name: 'Fortis Hospital', address: 'Mumbai', contact: '9876543211' },
  ];

  showAddForm = false;
  editMode = false;
  searchQuery = '';
  newHospital: Hospital = { id: 0, name: '', address: '', contact: '' };

  // Toggle the form visibility
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  // Add a new hospital
  addHospital() {
    if (!this.newHospital.name || !this.newHospital.address || !this.newHospital.contact) {
      alert('Please fill in all the fields.');
      return;
    }

    // Generate a new unique ID
    const newId = this.hospitals.length ? Math.max(...this.hospitals.map(h => h.id)) + 1 : 1;
    this.newHospital.id = newId;

    // Call the service to add the new hospital
    this.hospitalservice.createHospital(this.newHospital).subscribe({
      next: (response) => {
        this.hospitals.push({ ...this.newHospital });
        alert('Hospital added successfully!');
        this.resetForm();
        this.showAddForm = false;
      },
      error: (err) => {
        console.error('Error adding hospital:', err);
        alert('Failed to add hospital. Please try again.');
      }
    });
  }

  // Update an existing hospital
  updateHospital() {
    const index = this.hospitals.findIndex(hospital => hospital.id === this.newHospital.id);
    if (index !== -1) {
      this.hospitals[index] = { ...this.newHospital }; // Replace the existing hospital data with updated data
    }

    // Reset form and close it
    this.resetForm();
    this.showAddForm = false;
    this.editMode = false;
  }

  // Search for hospitals based on query
  searchHospitals() {
    const query = this.searchQuery.toLowerCase();
    this.hospitals = this.hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(query) || hospital.address.toLowerCase().includes(query)
    );
  }

  // Delete a hospital
  deleteHospital(id: number) {
    this.hospitals = this.hospitals.filter(hospital => hospital.id !== id);
  }

  // Set the form data to the selected hospital when editing
  editHospital(hospital: Hospital) {
    this.newHospital = { ...hospital }; // Populate the form with selected hospital data
    this.showAddForm = true; // Show the form
    this.editMode = true; // Set edit mode to true
  }

  // Reset the form fields
  resetForm() {
    this.newHospital = { id: 0, name: '', address: '', contact: '' };
  }
}


