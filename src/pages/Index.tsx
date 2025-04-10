
import React, { useState, useEffect } from "react";
import { getMockVehicleMovements } from "@/services/mockDataService";
import { VehicleMovement } from "@/types/vehicle";
import VehicleMovementTable from "@/components/VehicleMovementTable";
import DashboardHeader from "@/components/DashboardHeader";
import { Container, Box, CircularProgress, Typography } from "@mui/material";

const Index = () => {
  const [vehicleMovements, setVehicleMovements] = useState<VehicleMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate loading data from an API
    const loadData = () => {
      setIsLoading(true);
      
      // Small timeout to simulate API call
      setTimeout(() => {
        const data = getMockVehicleMovements(15); // Generate fewer vehicles but with more movements each
        setVehicleMovements(data);
        setIsLoading(false);
      }, 800);
    };

    loadData();
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Apply filter to vehicle movements
  const getFilteredVehicleMovements = () => {
    if (filter === "all") return vehicleMovements;
    
    const now = new Date();
    
    return vehicleMovements.filter(movement => {
      const moveDate = new Date(movement.movementDate);
      const timeDiff = now.getTime() - moveDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      switch (filter) {
        case "today":
          return daysDiff === 0;
        case "week":
          return daysDiff <= 7;
        case "month":
          return daysDiff <= 30;
        default:
          return true;
      }
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <DashboardHeader 
          totalCount={vehicleMovements.length} 
          onFilterChange={handleFilterChange}
        />
        
        {isLoading ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '60vh', 
            flexDirection: 'column', 
            gap: 2 
          }}>
            <CircularProgress color="primary" />
            <Typography color="text.secondary">Loading vehicle data...</Typography>
          </Box>
        ) : (
          <VehicleMovementTable data={getFilteredVehicleMovements()} />
        )}
      </Box>
    </Container>
  );
};

export default Index;
