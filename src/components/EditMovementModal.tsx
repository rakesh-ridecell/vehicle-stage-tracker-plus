
import React, { useState } from "react";
import { VehicleMovement } from "@/types/vehicle";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, 
  Grid, MenuItem, Select, InputLabel, FormControl, Box, 
  IconButton, Typography
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Toast } from "@mui/material/Alert";

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
    // We would use a real toast here with Material UI
    console.log("Vehicle movement updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => onOpenChange(false)}
      maxWidth="md"
      PaperProps={{ 
        sx: { borderRadius: 1 }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2
      }}>
        <Typography variant="h6">Edit Vehicle Movement</Typography>
        <IconButton
          size="small"
          onClick={() => onOpenChange(false)}
          aria-label="close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="sourceStage"
                name="sourceStage"
                label="Source Stage"
                value={formData.sourceStage}
                onChange={handleInputChange}
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="targetStage"
                name="targetStage"
                label="Target Stage"
                value={formData.targetStage}
                onChange={handleInputChange}
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="licensePlate"
                name="licensePlate"
                label="License Plate"
                value={formData.licensePlate}
                onChange={handleInputChange}
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel id="action-label">Action</InputLabel>
                <Select
                  labelId="action-label"
                  id="action"
                  value={formData.action}
                  label="Action"
                  onChange={(e) => handleSelectChange("action", e.target.value as "Create" | "Update" | "Delete")}
                >
                  <MenuItem value="Create">Create</MenuItem>
                  <MenuItem value="Update">Update</MenuItem>
                  <MenuItem value="Delete">Delete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="movementDate"
                name="movementDate"
                label="Movement Date"
                value={formData.movementDate}
                onChange={handleInputChange}
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="executionDate"
                name="executionDate"
                label="Execution Date"
                value={formData.executionDate}
                onChange={handleInputChange}
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="comment"
                name="comment"
                label="Comment"
                value={formData.comment}
                onChange={handleInputChange}
                size="small"
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditMovementModal;
