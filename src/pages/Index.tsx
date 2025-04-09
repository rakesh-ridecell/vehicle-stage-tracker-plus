
import React, { useState, useEffect } from "react";
import { getMockVehicleMovements } from "@/services/mockDataService";
import { VehicleMovement } from "@/types/vehicle";
import VehicleMovementTable from "@/components/VehicleMovementTable";
import DashboardHeader from "@/components/DashboardHeader";

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
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <DashboardHeader 
          totalCount={vehicleMovements.length} 
          onFilterChange={handleFilterChange}
        />
        
        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-full border-4 border-[#3CB72E] border-t-transparent animate-spin"></div>
              <p className="text-muted-foreground">Loading vehicle data...</p>
            </div>
          </div>
        ) : (
          <VehicleMovementTable data={getFilteredVehicleMovements()} />
        )}
      </div>
    </div>
  );
};

export default Index;
