
import { VehicleMovement } from "@/types/vehicle";

// Generate random date within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const daysBack = Math.floor(Math.random() * 30);
  const date = new Date(now.setDate(now.getDate() - daysBack));
  return date.toISOString().split('T')[0];
};

// Generate random action
const getRandomAction = () => {
  const actions = ['Create', 'Update', 'Delete'] as const;
  return actions[Math.floor(Math.random() * actions.length)];
};

// Generate random stage
const getRandomStage = () => {
  const stages = [
    'Ordered', 
    'In Transit', 
    'Received', 
    'Prep', 
    'Ready', 
    'Delivered', 
    'Service', 
    'Sold', 
    'Archived'
  ];
  return stages[Math.floor(Math.random() * stages.length)];
};

// Generate VIN that looks realistic
const generateVIN = () => {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
};

// Generate license plate for EU format
const generateLicensePlate = () => {
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  const numbers = '0123456789';
  
  let plate = '';
  
  // Format: XX-999-XX
  plate += letters.charAt(Math.floor(Math.random() * letters.length));
  plate += letters.charAt(Math.floor(Math.random() * letters.length));
  plate += '-';
  
  for (let i = 0; i < 3; i++) {
    plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  plate += '-';
  plate += letters.charAt(Math.floor(Math.random() * letters.length));
  plate += letters.charAt(Math.floor(Math.random() * letters.length));
  
  return plate;
};

// Generate a random contract number
const generateContractNumber = () => {
  return `CTR-${Math.floor(100000 + Math.random() * 900000)}`;
};

// Generate random email for executed by
const generateEmail = () => {
  const domains = ['company.com', 'autoservice.org', 'vehicletracker.net', 'carlogistics.eu'];
  const names = ['john', 'emma', 'michael', 'sophia', 'david', 'olivia', 'james', 'peter', 'maria'];
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}@${domain}`;
};

// Generate some supplier data
const generateSupplierData = () => {
  return {
    supplier1: Math.random() > 0.5 ? {
      firstRegistrationDate: getRandomDate(),
      co2: `${Math.floor(Math.random() * 150)}g/km`,
      createdDate: getRandomDate(),
      modifiedDate: getRandomDate(),
      fileType: ['Lease', 'Sale', 'Rent'][Math.floor(Math.random() * 3)],
      parkingLocation: ['Lot A', 'Lot B', 'Warehouse 3'][Math.floor(Math.random() * 3)],
      parkingPlace: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100)}`
    } : undefined,
    supplier2: Math.random() > 0.5 ? {
      status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
      km: `${Math.floor(Math.random() * 100000)}`,
      make: ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Toyota'][Math.floor(Math.random() * 5)],
      model: ['A4', 'X5', 'C-Class', 'Golf', 'Corolla'][Math.floor(Math.random() * 5)],
      color: ['Black', 'White', 'Silver', 'Blue', 'Red'][Math.floor(Math.random() * 5)],
      location: ['North Depot', 'South Depot', 'Central Garage'][Math.floor(Math.random() * 3)]
    } : undefined,
    supplier3: Math.random() > 0.5 ? {
      status: ['Processing', 'Completed', 'Delayed'][Math.floor(Math.random() * 3)],
      type: ['Standard', 'Express', 'Custom'][Math.floor(Math.random() * 3)],
      loadingTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      unloadingTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      statusDate: getRandomDate()
    } : undefined,
    supplier4: Math.random() > 0.5 ? {
      inspectionStatus: ['Passed', 'Failed', 'Pending'][Math.floor(Math.random() * 3)],
      inspectionDate: getRandomDate(),
      inspectionMileage: `${Math.floor(Math.random() * 100000)}`,
      locationAddress: ['123 Main St', '456 Park Ave', '789 Industrial Blvd'][Math.floor(Math.random() * 3)],
      parkingSpace: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100)}`
    } : undefined
  };
};

// Generate a single vehicle movement record
const generateVehicleMovement = (id: number): VehicleMovement => {
  const sourceStage = getRandomStage();
  let targetStage = getRandomStage();
  
  // Make sure target is different from source
  while (targetStage === sourceStage) {
    targetStage = getRandomStage();
  }
  
  const movementDate = getRandomDate();
  const executionDate = new Date(movementDate);
  
  // Execution is usually on same day or 1-2 days before
  executionDate.setDate(executionDate.getDate() - Math.floor(Math.random() * 3));
  
  return {
    id: `MOV-${id.toString().padStart(5, '0')}`,
    licensePlate: generateLicensePlate(),
    vin: generateVIN(),
    contractNumber: generateContractNumber(),
    sourceStage,
    targetStage,
    movementDate,
    action: getRandomAction(),
    comment: Math.random() > 0.7 ? `Movement from ${sourceStage} to ${targetStage}` : '',
    executionDate: executionDate.toISOString().split('T')[0],
    executedBy: generateEmail(),
    supplierData: generateSupplierData()
  };
};

// Generate mock data
export const getMockVehicleMovements = (count = 50): VehicleMovement[] => {
  return Array.from({ length: count }, (_, i) => generateVehicleMovement(i + 1));
};
