
import React, { useState } from "react";
import { SupplierData } from "@/types/vehicle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Package,
  Truck,
  Clipboard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface SupplierDataDetailsProps {
  supplierData?: SupplierData;
}

const SupplierDataDetails: React.FC<SupplierDataDetailsProps> = ({
  supplierData,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    supplier1: false,
    supplier2: false,
    supplier3: false,
    supplier4: false,
  });
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!supplierData) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No supplier data available
      </div>
    );
  }

  const hasSupplier1 = !!supplierData.supplier1;
  const hasSupplier2 = !!supplierData.supplier2;
  const hasSupplier3 = !!supplierData.supplier3;
  const hasSupplier4 = !!supplierData.supplier4;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Supplier Data</h3>

      <Tabs defaultValue={
        hasSupplier1 ? "supplier1" : 
        hasSupplier2 ? "supplier2" : 
        hasSupplier3 ? "supplier3" : 
        hasSupplier4 ? "supplier4" : "supplier1"
      }>
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap whitespace-nowrap">
          {hasSupplier1 && <TabsTrigger value="supplier1">Supplier 1</TabsTrigger>}
          {hasSupplier2 && <TabsTrigger value="supplier2">Supplier 2</TabsTrigger>}
          {hasSupplier3 && <TabsTrigger value="supplier3">Supplier 3</TabsTrigger>}
          {hasSupplier4 && <TabsTrigger value="supplier4">Supplier 4</TabsTrigger>}
        </TabsList>

        {hasSupplier1 && (
          <TabsContent value="supplier1" className="mt-4">
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4" /> Administrative Data
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection('supplier1')}>
                    {expandedSections.supplier1 ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {expandedSections.supplier1 && (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(supplierData.supplier1 || {}).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Important Dates</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier1?.firstRegistrationDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">First Registration</p>
                        <p className="text-sm">{supplierData.supplier1.firstRegistrationDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.clientAvailableStartDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Client Available</p>
                        <p className="text-sm">{supplierData.supplier1.clientAvailableStartDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.inspectionDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Inspection Date</p>
                        <p className="text-sm">{supplierData.supplier1.inspectionDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.startDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Start Date</p>
                        <p className="text-sm">{supplierData.supplier1.startDate}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {supplierData.supplier1?.parkingLocation && (
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Parking Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm">{supplierData.supplier1.parkingLocation}</p>
                      </div>
                      {supplierData.supplier1?.parkingPlace && (
                        <div>
                          <p className="text-xs text-muted-foreground">Parking Place</p>
                          <p className="text-sm">{supplierData.supplier1.parkingPlace}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        )}

        {hasSupplier2 && (
          <TabsContent value="supplier2" className="mt-4">
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Car className="h-4 w-4" /> Vehicle Information
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection('supplier2')}>
                    {expandedSections.supplier2 ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {expandedSections.supplier2 && (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(supplierData.supplier2 || {}).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Vehicle Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier2?.make && (
                      <div>
                        <p className="text-xs text-muted-foreground">Make</p>
                        <p className="text-sm">{supplierData.supplier2.make}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.model && (
                      <div>
                        <p className="text-xs text-muted-foreground">Model</p>
                        <p className="text-sm">{supplierData.supplier2.model}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.color && (
                      <div>
                        <p className="text-xs text-muted-foreground">Color</p>
                        <p className="text-sm">{supplierData.supplier2.color}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.km && (
                      <div>
                        <p className="text-xs text-muted-foreground">Mileage (km)</p>
                        <p className="text-sm">{supplierData.supplier2.km}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Location Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier2?.location && (
                      <div>
                        <p className="text-xs text-muted-foreground">Current Location</p>
                        <p className="text-sm">{supplierData.supplier2.location}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.address && (
                      <div>
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="text-sm">{supplierData.supplier2.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        )}

        {hasSupplier3 && (
          <TabsContent value="supplier3" className="mt-4">
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4" /> Transport Information
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection('supplier3')}>
                    {expandedSections.supplier3 ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {expandedSections.supplier3 && (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(supplierData.supplier3 || {}).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Transport Status</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier3?.status && (
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm">{supplierData.supplier3.status}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.type && (
                      <div>
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-sm">{supplierData.supplier3.type}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.statusDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Status Date</p>
                        <p className="text-sm">{supplierData.supplier3.statusDate}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.subType && (
                      <div>
                        <p className="text-xs text-muted-foreground">Sub Type</p>
                        <p className="text-sm">{supplierData.supplier3.subType}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Timing Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier3?.loadingTime && (
                      <div>
                        <p className="text-xs text-muted-foreground">Loading Time</p>
                        <p className="text-sm">{supplierData.supplier3.loadingTime}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.unloadingTime && (
                      <div>
                        <p className="text-xs text-muted-foreground">Unloading Time</p>
                        <p className="text-sm">{supplierData.supplier3.unloadingTime}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        )}

        {hasSupplier4 && (
          <TabsContent value="supplier4" className="mt-4">
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Clipboard className="h-4 w-4" /> Inspection Details
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection('supplier4')}>
                    {expandedSections.supplier4 ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {expandedSections.supplier4 && (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(supplierData.supplier4 || {}).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Inspection Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier4?.inspectionStatus && (
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm">{supplierData.supplier4.inspectionStatus}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.inspectionDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-sm">{supplierData.supplier4.inspectionDate}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.inspectionMileage && (
                      <div>
                        <p className="text-xs text-muted-foreground">Mileage</p>
                        <p className="text-sm">{supplierData.supplier4.inspectionMileage} km</p>
                      </div>
                    )}
                    {supplierData.supplier4?.inspectionDossierId && (
                      <div>
                        <p className="text-xs text-muted-foreground">Dossier ID</p>
                        <p className="text-sm">{supplierData.supplier4.inspectionDossierId}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Location Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier4?.locationAddress && (
                      <div>
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="text-sm">{supplierData.supplier4.locationAddress}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.parkingSpace && (
                      <div>
                        <p className="text-xs text-muted-foreground">Parking Space</p>
                        <p className="text-sm">{supplierData.supplier4.parkingSpace}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default SupplierDataDetails;
