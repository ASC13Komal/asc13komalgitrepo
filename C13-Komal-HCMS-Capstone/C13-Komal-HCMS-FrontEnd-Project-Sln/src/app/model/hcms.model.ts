// Administrator Model
export interface Administrator {
    id: number;                     // Unique ID for the admin
    email: string;                  // Admin's email for login
    password: string;               // Encrypted password
    failedAttempts: number;         // Number of failed login attempts
    isLocked: boolean;              // Whether the account is locked
    lockEndTime?: Date;             // Optional: Time when lock ends
  }
  
  // Doctor Model
  export interface Doctor {
    id: number;                     // Unique ID for the doctor
    name: string;                   // Full name of the doctor
    specialization: string;         // Field of specialization (e.g., Cardiologist)
    contact: string;                 // Doctor's phone number
  }
  
  // Patient Model
  export interface Patient {
    id: number;                     // Unique ID for the patient
    name: string;                   // Full name of the patient
    dob: Date;                      // Date of birth
    address: string;                // Home address
    phone: string;                  // Phone number
    email?: string;                 // Optional: Email of the patient
  }
  
  // Appointment Model
  export interface Appointment {
    doctorName: any;
    doctor: any;
    id: string;                     // Unique ID for the appointment
    patientName: string;
    appointmentDate: string;          // Date of the appointment
    appointmentTime: string;        // Time of the appointment
    status: string;                 // Status (e.g., Scheduled, Completed, Cancelled)
  }
  
  // Hospital Model
  export interface Hospital {
    id: number;                     // Unique ID for the hospital
    name: string;                   // Hospital name
    address: string;                // Address of the hospital
    contact: string;          // Contact number of the hospital
  }
  
  // Review Model
  export interface Review {
    id: string;                     // Unique ID for the review
    doctorId: number;               // Reference to the doctor's ID
    patientId: number;              // Reference to the patient's ID
    rating: number;                 // Rating (1 to 5)
    comments: string;               // Optional: Review comments
  }
  