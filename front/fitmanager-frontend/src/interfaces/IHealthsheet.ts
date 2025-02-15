export interface IHealthsheet {
    name: string;
    age: string;
    phone: string;
    emergencyContact: string;
    weight: string;
    height: string;
    preExistingDiseases: string;
    surgeries: string;
    allergies: string;
    currentMedications: string;
    chronicPain: string;
    additionalComments: string;
    [key: string]: string | string[];
  }
  