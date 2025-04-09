
import React from "react";
import { VehicleMovement } from "@/types/vehicle";
import { Clipboard, MessageCircle } from "lucide-react";

interface VehicleDetailsProps {
  vehicleMovement: VehicleMovement;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicleMovement }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Vehicle Movement Details</h3>
        <span className="text-xs text-muted-foreground">ID: {vehicleMovement.id}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm font-medium">Source Stage</p>
          <p className="text-sm text-muted-foreground">{vehicleMovement.sourceStage}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Target Stage</p>
          <p className="text-sm text-muted-foreground">{vehicleMovement.targetStage}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Movement Date</p>
          <p className="text-sm text-muted-foreground">{vehicleMovement.movementDate}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Execution Date</p>
          <p className="text-sm text-muted-foreground">{vehicleMovement.executionDate}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Action</p>
          <p className="text-sm text-muted-foreground">{vehicleMovement.action}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Executed By</p>
          <p className="text-sm text-muted-foreground">{vehicleMovement.executedBy}</p>
        </div>
      </div>
      
      {vehicleMovement.comment && (
        <div className="border-t pt-3 mt-3">
          <div className="flex items-start gap-2">
            <MessageCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Comment</p>
              <p className="text-sm text-muted-foreground">{vehicleMovement.comment}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t pt-3 mt-3">
        <div className="flex items-start gap-2">
          <Clipboard className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Vehicle Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">License Plate</p>
                <p className="text-sm">{vehicleMovement.licensePlate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">VIN</p>
                <p className="text-sm">{vehicleMovement.vin}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contract Number</p>
                <p className="text-sm">{vehicleMovement.contractNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
