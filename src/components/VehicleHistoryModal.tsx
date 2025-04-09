
import React from "react";
import { X, Clock, CornerDownRight } from "lucide-react";
import { VehicleMovement } from "@/types/vehicle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineDot,
  TimelineContent,
  TimelineBody,
} from "@/components/VehicleHistoryTimeline";
import { Badge } from "@/components/ui/badge";

interface VehicleHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleData: {
    vin: string;
    licensePlate: string;
  };
  historyData: VehicleMovement[];
}

const VehicleHistoryModal: React.FC<VehicleHistoryModalProps> = ({
  open,
  onOpenChange,
  vehicleData,
  historyData,
}) => {
  // Group history data by source (supplier)
  const groupedBySupplier: Record<string, VehicleMovement[]> = {};
  
  historyData.forEach((item) => {
    const supplierKey = getSupplierKey(item);
    if (!groupedBySupplier[supplierKey]) {
      groupedBySupplier[supplierKey] = [];
    }
    groupedBySupplier[supplierKey].push(item);
  });

  // Sort history by date for the combined view
  const sortedHistory = [...historyData].sort((a, b) => {
    return new Date(b.movementDate).getTime() - new Date(a.movementDate).getTime();
  });

  // Helper function to determine supplier source
  function getSupplierKey(item: VehicleMovement): string {
    if (item.supplierData?.supplier1) return "supplier1";
    if (item.supplierData?.supplier2) return "supplier2";
    if (item.supplierData?.supplier3) return "supplier3";
    if (item.supplierData?.supplier4) return "supplier4";
    return "unknown";
  }

  // Helper function to get supplier name for display
  function getSupplierName(key: string): string {
    const supplierNames: Record<string, string> = {
      supplier1: "Supplier 1",
      supplier2: "Supplier 2",
      supplier3: "Supplier 3",
      supplier4: "Supplier 4",
      unknown: "Unknown Source"
    };
    return supplierNames[key] || key;
  }

  // Helper to get color based on action
  const getActionColor = (action: string) => {
    switch (action) {
      case "Create":
        return "bg-[#d6f3d2] text-[#3CB72E]";
      case "Update":
        return "bg-blue-100 text-blue-800";
      case "Delete":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#3CB72E]" />
            Vehicle History
          </DialogTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">License Plate: <span className="text-foreground">{vehicleData.licensePlate}</span></span>
            <span className="hidden sm:inline">•</span>
            <span className="font-medium">VIN: <span className="text-foreground">{vehicleData.vin}</span></span>
          </div>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 h-auto p-1">
            <TabsTrigger value="all" className="py-2">All History</TabsTrigger>
            {Object.keys(groupedBySupplier).map((supplier) => (
              <TabsTrigger key={supplier} value={supplier} className="py-2">
                {getSupplierName(supplier)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="pt-4">
            <Timeline>
              {sortedHistory.map((item, index) => (
                <TimelineItem key={`${item.id}-${index}`}>
                  {index !== sortedHistory.length - 1 && <TimelineConnector />}
                  <TimelineHeader>
                    <TimelineDot className="bg-[#3CB72E]" />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="font-medium">{item.movementDate}</span>
                      <span className="hidden sm:inline text-muted-foreground">•</span>
                      <span>
                        <Badge className={getActionColor(item.action)}>
                          {item.action}
                        </Badge>
                      </span>
                      <span className="hidden sm:inline text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">Source: {getSupplierName(getSupplierKey(item))}</span>
                    </div>
                  </TimelineHeader>
                  <TimelineContent>
                    <TimelineBody>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Source Stage</p>
                          <p className="font-medium">{item.sourceStage}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CornerDownRight className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Target Stage</p>
                            <p className="font-medium">{item.targetStage}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Executed By</p>
                          <p className="font-medium">{item.executedBy}</p>
                        </div>
                      </div>
                      {item.comment && (
                        <div className="mt-2 border-t pt-2">
                          <p className="text-sm text-muted-foreground">Comment</p>
                          <p>{item.comment}</p>
                        </div>
                      )}
                    </TimelineBody>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </TabsContent>

          {Object.entries(groupedBySupplier).map(([supplier, items]) => (
            <TabsContent key={supplier} value={supplier} className="pt-4">
              <Timeline>
                {items
                  .sort((a, b) => new Date(b.movementDate).getTime() - new Date(a.movementDate).getTime())
                  .map((item, index) => (
                    <TimelineItem key={`${supplier}-${item.id}-${index}`}>
                      {index !== items.length - 1 && <TimelineConnector />}
                      <TimelineHeader>
                        <TimelineDot className="bg-[#3CB72E]" />
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="font-medium">{item.movementDate}</span>
                          <span className="hidden sm:inline text-muted-foreground">•</span>
                          <span>
                            <Badge className={getActionColor(item.action)}>
                              {item.action}
                            </Badge>
                          </span>
                        </div>
                      </TimelineHeader>
                      <TimelineContent>
                        <TimelineBody>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Source Stage</p>
                              <p className="font-medium">{item.sourceStage}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <CornerDownRight className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Target Stage</p>
                                <p className="font-medium">{item.targetStage}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Executed By</p>
                              <p className="font-medium">{item.executedBy}</p>
                            </div>
                          </div>
                          {item.comment && (
                            <div className="mt-2 border-t pt-2">
                              <p className="text-sm text-muted-foreground">Comment</p>
                              <p>{item.comment}</p>
                            </div>
                          )}
                        </TimelineBody>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
              </Timeline>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleHistoryModal;
