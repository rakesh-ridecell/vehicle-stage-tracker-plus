
// Vehicle movement tracking types
export interface VehicleMovement {
  id: string;
  licensePlate: string;
  vin: string;
  contractNumber: string;
  sourceStage: string;
  targetStage: string;
  movementDate: string;
  action: 'Create' | 'Update' | 'Delete';
  comment: string;
  executionDate: string;
  executedBy: string;
  supplierData?: SupplierData;
}

// Combined supplier data
export interface SupplierData {
  supplier1?: Supplier1Data;
  supplier2?: Supplier2Data;
  supplier3?: Supplier3Data;
  supplier4?: Supplier4Data;
}

// Supplier 1 data structure
export interface Supplier1Data {
  firstRegistrationDate?: string;
  co2?: string;
  createdDate?: string;
  modifiedDate?: string;
  fileType?: string;
  subType?: string;
  clientAvailableStartDate?: string;
  transportDoor?: string;
  receptionDate?: string;
  planningDate?: string;
  dateCMR?: string;
  inspectionDate?: string;
  blockingType?: string;
  parkingLocation?: string;
  parkingPlace?: string;
  administrationStatus?: string;
  administrationStatusDate?: string;
  insuranceStatus?: string;
  insuranceStatusDate?: string;
  remarkLOG?: string;
  contractFileNumber?: string;
  startDate?: string;
  endDate?: string;
  origin?: string;
  client?: string;
  logisticStatus?: string;
  logisticStatusDate?: string;
  pickUpDate?: string;
  completedDate?: string;
  readyForSaleDate?: string;
  oldOpdrachtId?: string;
  dossierNumber?: string;
  remarketingStatus?: string;
  remarketingStatusDate?: string;
  remarketingDate?: string;
  releaseDate?: string;
  dateOfAvailable?: string;
  dateOfDeletion?: string;
  assignDate?: string;
  performedOnDate?: string;
  dateSent?: string;
}

// Supplier 2 data structure
export interface Supplier2Data {
  status?: string;
  km?: string;
  herkomst?: string;
  make?: string;
  type?: string;
  model?: string;
  color?: string;
  location?: string;
  address?: string;
  firstGateIn?: string;
  gateIn?: string;
  gateOut?: string;
}

// Supplier 3 data structure
export interface Supplier3Data {
  status?: string;
  type?: string;
  subType?: string;
  loadingTime?: string;
  unloadingTime?: string;
  statusDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Supplier 4 data structure
export interface Supplier4Data {
  inspectionDossierId?: string;
  inspectionStatus?: string;
  inspectionDate?: string;
  model?: string;
  logDate?: string;
  version?: string;
  progressDirection?: string;
  originalStatus?: string;
  progressStatus?: string;
  inspectionMileage?: string;
  locationAddress?: string;
  parkingSpace?: string;
}
