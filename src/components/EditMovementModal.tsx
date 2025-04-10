
import React, { useState } from "react";
import { VehicleMovement, VehicleStage } from "@/types/vehicle";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, MenuItem, Grid, Box, Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface EditMovementModalProps {
  vehicleMovement: VehicleMovement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedMovement: VehicleMovement) => void;
}

// Helper function to get list of vehicle stages as string array
const getVehicleStages = (): string[] => {
  const stages: VehicleStage[] = [
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
    'Prep',
    'Ready',
    'Delivered',
    'Service',
    'Sold',
    'Archived'
  ];
  
  return stages;
};

const EditMovementModal: React.FC<EditMovementModalProps> = ({ 
  vehicleMovement, 
  open, 
  onOpenChange, 
  onSave 
}) => {
  const [movement, setMovement] = useState<VehicleMovement>({...vehicleMovement});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  const handleClose = () => {
    onOpenChange(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovement(prev => ({ ...prev, [name]: value }));
    setError(null);
  };
  
  const handleSave = () => {
    if (!movement.sourceStage || !movement.targetStage) {
      setError("Source and Target stages are required");
      return;
    }
    
    onSave(movement);
    setSuccess(true);
    
    // Close after a short delay to show success message
    setTimeout(() => {
      handleClose();
    }, 1500);
  };
  
  const vehicleStages = getVehicleStages();
  
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider',
        pb: 2
      }}>
        Edit Vehicle Movement
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>Vehicle movement updated successfully</Alert>
        )}
        
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} item>
              <TextField
                name="licensePlate"
                label="License Plate"
                fullWidth
                margin="normal"
                value={movement.licensePlate}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Grid>
            
            <Grid xs={12} sm={6} item>
              <TextField
                name="vin"
                label="VIN"
                fullWidth
                margin="normal"
                value={movement.vin}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Grid>
            
            <Grid xs={12} sm={6} item>
              <TextField
                name="contractNumber"
                label="Contract Number"
                fullWidth
                margin="normal"
                value={movement.contractNumber}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Grid>
            
            <Grid xs={12} sm={6} item>
              <TextField
                name="movementDate"
                label="Movement Date"
                type="date"
                fullWidth
                margin="normal"
                value={movement.movementDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid xs={12} sm={6} item>
              <TextField
                select
                name="sourceStage"
                label="Source Stage"
                fullWidth
                margin="normal"
                value={movement.sourceStage}
                onChange={handleChange}
                required
              >
                {vehicleStages.map((stage) => (
                  <MenuItem key={`source-${stage}`} value={stage}>
                    {stage}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid xs={12} sm={6} item>
              <TextField
                select
                name="targetStage"
                label="Target Stage"
                fullWidth
                margin="normal"
                value={movement.targetStage}
                onChange={handleChange}
                required
              >
                {vehicleStages.map((stage) => (
                  <MenuItem key={`target-${stage}`} value={stage}>
                    {stage}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid xs={12} item>
              <TextField
                name="comment"
                label="Comment"
                fullWidth
                margin="normal"
                value={movement.comment}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          disabled={success}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMovementModal;
