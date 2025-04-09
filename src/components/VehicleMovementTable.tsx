
import React, { useState } from "react";
import { VehicleMovement } from "@/types/vehicle";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SupplierDataDetails from "./SupplierDataDetails";
import VehicleDetails from "./VehicleDetails";

interface VehicleMovementTableProps {
  data: VehicleMovement[];
}

const VehicleMovementTable: React.FC<VehicleMovementTableProps> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.licensePlate.toLowerCase().includes(searchLower) ||
      item.vin.toLowerCase().includes(searchLower) ||
      item.contractNumber.toLowerCase().includes(searchLower) ||
      item.sourceStage.toLowerCase().includes(searchLower) ||
      item.targetStage.toLowerCase().includes(searchLower) ||
      item.executedBy.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Toggle row expansion
  const toggleRowExpansion = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "Create":
        return "bg-green-100 text-green-800";
      case "Update":
        return "bg-blue-100 text-blue-800";
      case "Delete":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by License Plate, VIN, Contract..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-9"></TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>VIN</TableHead>
              <TableHead>Contract #</TableHead>
              <TableHead>Source Stage</TableHead>
              <TableHead>Target Stage</TableHead>
              <TableHead>Movement Date</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Execution Date</TableHead>
              <TableHead>Executed By</TableHead>
              <TableHead className="w-9"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-6 text-muted-foreground">
                  No vehicle movements found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow 
                    className={expandedRow === item.id ? "bg-muted/40" : ""}
                    onClick={() => toggleRowExpansion(item.id)}
                  >
                    <TableCell className="p-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {expandedRow === item.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{item.licensePlate}</TableCell>
                    <TableCell>{item.vin}</TableCell>
                    <TableCell>{item.contractNumber}</TableCell>
                    <TableCell>{item.sourceStage}</TableCell>
                    <TableCell>{item.targetStage}</TableCell>
                    <TableCell>{item.movementDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(item.action)}`}>
                        {item.action}
                      </span>
                    </TableCell>
                    <TableCell>{item.executionDate}</TableCell>
                    <TableCell>{item.executedBy}</TableCell>
                    <TableCell className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Movement</DropdownMenuItem>
                          <DropdownMenuItem>Download Data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedRow === item.id && (
                    <TableRow>
                      <TableCell colSpan={11} className="p-0 bg-muted/20">
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardContent className="p-4">
                                <VehicleDetails vehicleMovement={item} />
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <SupplierDataDetails supplierData={item.supplierData} />
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleMovementTable;
