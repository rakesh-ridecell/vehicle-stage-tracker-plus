import { VehicleMovement, VehicleStage } from "@/types/vehicle";

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

// Define vehicle lifecycle stages in order
const vehicleLifecycleStages: VehicleStage[] = [
  'Source In',
  'Fleet In',
  'Contract In',
  'Active Contract',
  'Contract Out',
  'First Contract with Driver',
  'Confirm Appointment with Driver',
  'Transport to Storage',
  'Storage In',
  'Inspection',
  'Expertise',
  'Damage Assessment',
  'Contract Settlement',
  'Listing for Sale',
  'Assigned',
  'Released',
  'Buyer Pick Up',
  'Defleeted',
  'Archived'
];

// Generate a sequence of stages that a vehicle might go through
const generateStageSequence = (): VehicleStage[] => {
  // Start with Source In
  const result: VehicleStage[] = ['Source In'];
  
  // Randomly select 3-8 stages from the lifecycle
  const numStages = 3 + Math.floor(Math.random() * 6);
  let currentIndex = 0;
  
  for (let i = 0; i < numStages; i++) {
    // Move forward between 1-3 stages at a time
    currentIndex += 1 + Math.floor(Math.random() * 3);
    
    // Don't go past the end
    if (currentIndex >= vehicleLifecycleStages.length) break;
    
    result.push(vehicleLifecycleStages[currentIndex]);
  }
  
  return result;
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

// Generate vehicle movements for a single vehicle through its lifecycle
const generateVehicleLifecycleMovements = (id: number): VehicleMovement[] => {
  const vin = generateVIN();
  const licensePlate = generateLicensePlate();
  const contractNumber = generateContractNumber();
  
  // Generate a sequence of stages for this vehicle
  const stages = generateStageSequence();
  
  // Base date (30-90 days ago)
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (30 + Math.floor(Math.random() * 60)));
  
  // Generate movements for each stage transition
  const movements: VehicleMovement[] = [];
  
  for (let i = 0; i < stages.length - 1; i++) {
    const sourceStage = stages[i];
    const targetStage = stages[i + 1];
    
    // Move forward in time by 1-7 days for each stage
    startDate.setDate(startDate.getDate() + (1 + Math.floor(Math.random() * 6)));
    const movementDate = startDate.toISOString().split('T')[0];
    
    // Execution date is usually on the same day or 1-2 days before
    const executionDate = new Date(startDate);
    executionDate.setDate(executionDate.getDate() - Math.floor(Math.random() * 3));
    
    movements.push({
      id: `MOV-${id}-${i + 1}`,
      licensePlate,
      vin,
      contractNumber,
      sourceStage,
      targetStage,
      movementDate,
      action: 'Update',
      comment: Math.random() > 0.7 ? `Movement from ${sourceStage} to ${targetStage}` : '',
      executionDate: executionDate.toISOString().split('T')[0],
      executedBy: generateEmail(),
      supplierData: generateSupplierData()
    });
  }
  
  return movements;
};

// Generate mock data with vehicle lifecycles
export const getMockVehicleMovements = (count = 15): VehicleMovement[] => {
  const result: VehicleMovement[] = [];
  
  // Generate movements for 'count' different vehicles
  for (let i = 0; i < count; i++) {
    const vehicleMovements = generateVehicleLifecycleMovements(i + 1);
    result.push(...vehicleMovements);
  }
  
  // Sort by most recent first for display
  return result.sort((a, b) => 
    new Date(b.movementDate).getTime() - new Date(a.movementDate).getTime()
  );
};
