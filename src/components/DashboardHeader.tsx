
import React from "react";
import { Car, FileBarChart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardHeaderProps {
  totalCount: number;
  onFilterChange?: (filter: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ totalCount, onFilterChange }) => {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Car className="h-6 w-6 text-[#3CB72E]" /> Vehicle Stage Tracker
        </h1>
        <p className="text-muted-foreground">
          Tracking {totalCount} vehicle stage movements
        </p>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Select defaultValue="all" onValueChange={onFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px] border-[#3CB72E]/30">
            <Filter className="mr-2 h-4 w-4 text-[#3CB72E]" />
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Movements</SelectItem>
            <SelectItem value="today">Today Only</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          className="sm:w-[130px] border-[#3CB72E]/30 text-[#3CB72E] hover:bg-[#3CB72E]/10"
        >
          <FileBarChart className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
