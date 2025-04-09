
import React, { useState } from "react";
import { VehicleMovement } from "@/types/vehicle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface EditMovementModalProps {
  vehicleMovement: VehicleMovement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedMovement: VehicleMovement) => void;
}

const EditMovementModal: React.FC<EditMovementModalProps> = ({
  vehicleMovement,
  open,
  onOpenChange,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<VehicleMovement>>({
    ...vehicleMovement
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...vehicleMovement, ...formData });
    toast.success("Vehicle movement updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Edit Vehicle Movement
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sourceStage">Source Stage</Label>
              <Input
                id="sourceStage"
                name="sourceStage"
                value={formData.sourceStage}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetStage">Target Stage</Label>
              <Input
                id="targetStage"
                name="targetStage"
                value={formData.targetStage}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Select 
                value={formData.action} 
                onValueChange={(value) => handleSelectChange("action", value as "Create" | "Update" | "Delete")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Create">Create</SelectItem>
                  <SelectItem value="Update">Update</SelectItem>
                  <SelectItem value="Delete">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="movementDate">Movement Date</Label>
              <Input
                id="movementDate"
                name="movementDate"
                value={formData.movementDate}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="executionDate">Execution Date</Label>
              <Input
                id="executionDate"
                name="executionDate"
                value={formData.executionDate}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Input
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#3CB72E] hover:bg-[#2a9d1f] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMovementModal;
