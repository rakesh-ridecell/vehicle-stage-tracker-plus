
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
    supplier1: true,
    supplier2: true,
    supplier3: true,
    supplier4: true,
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
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap whitespace-nowrap bg-[#f0f9ef] border-[#3CB72E]/20">
          {hasSupplier1 && <TabsTrigger value="supplier1" className="data-[state=active]:bg-[#3CB72E] data-[state=active]:text-white">Supplier 1</TabsTrigger>}
          {hasSupplier2 && <TabsTrigger value="supplier2" className="data-[state=active]:bg-[#3CB72E] data-[state=active]:text-white">Supplier 2</TabsTrigger>}
          {hasSupplier3 && <TabsTrigger value="supplier3" className="data-[state=active]:bg-[#3CB72E] data-[state=active]:text-white">Supplier 3</TabsTrigger>}
          {hasSupplier4 && <TabsTrigger value="supplier4" className="data-[state=active]:bg-[#3CB72E] data-[state=active]:text-white">Supplier 4</TabsTrigger>}
        </TabsList>

        {hasSupplier1 && (
          <TabsContent value="supplier1" className="mt-4">
            <ScrollArea className="h-[350px] rounded-md border p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4 text-[#3CB72E]" /> Administrative Data
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection('supplier1')} className="text-[#3CB72E]">
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
                      <div key={key} className="border-b pb-1">
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Important Dates</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier1?.firstRegistrationDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">First Registration</p>
                        <p className="text-sm">{supplierData.supplier1.firstRegistrationDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.clientAvailableStartDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Client Available</p>
                        <p className="text-sm">{supplierData.supplier1.clientAvailableStartDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.inspectionDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Inspection Date</p>
                        <p className="text-sm">{supplierData.supplier1.inspectionDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.startDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Start Date</p>
                        <p className="text-sm">{supplierData.supplier1.startDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.endDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">End Date</p>
                        <p className="text-sm">{supplierData.supplier1.endDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.createdDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Created Date</p>
                        <p className="text-sm">{supplierData.supplier1.createdDate}</p>
                      </div>
                    )}
                    {supplierData.supplier1?.modifiedDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Modified Date</p>
                        <p className="text-sm">{supplierData.supplier1.modifiedDate}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {supplierData.supplier1?.parkingLocation && (
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Parking Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm">{supplierData.supplier1.parkingLocation}</p>
                      </div>
                      {supplierData.supplier1?.parkingPlace && (
                        <div className="border-b pb-1">
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
            <ScrollArea className="h-[350px] rounded-md border p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Car className="h-4 w-4 text-[#3CB72E]" /> Vehicle Information
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection('supplier2')} className="text-[#3CB72E]">
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
                      <div key={key} className="border-b pb-1">
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Vehicle Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier2?.make && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Make</p>
                        <p className="text-sm">{supplierData.supplier2.make}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.model && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Model</p>
                        <p className="text-sm">{supplierData.supplier2.model}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.color && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Color</p>
                        <p className="text-sm">{supplierData.supplier2.color}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.km && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Mileage (km)</p>
                        <p className="text-sm">{supplierData.supplier2.km}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.type && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-sm">{supplierData.supplier2.type}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.herkomst && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Herkomst</p>
                        <p className="text-sm">{supplierData.supplier2.herkomst}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Location Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier2?.location && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Current Location</p>
                        <p className="text-sm">{supplierData.supplier2.location}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.address && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="text-sm">{supplierData.supplier2.address}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Gate Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier2?.firstGateIn && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">First Gate In</p>
                        <p className="text-sm">{supplierData.supplier2.firstGateIn}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.gateIn && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Gate In</p>
                        <p className="text-sm">{supplierData.supplier2.gateIn}</p>
                      </div>
                    )}
                    {supplierData.supplier2?.gateOut && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Gate Out</p>
                        <p className="text-sm">{supplierData.supplier2.gateOut}</p>
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
            <ScrollArea className="h-[350px] rounded-md border p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#3CB72E]" /> Transport Information
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection('supplier3')} className="text-[#3CB72E]">
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
                      <div key={key} className="border-b pb-1">
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Transport Status</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier3?.status && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm">{supplierData.supplier3.status}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.type && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-sm">{supplierData.supplier3.type}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.statusDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Status Date</p>
                        <p className="text-sm">{supplierData.supplier3.statusDate}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.subType && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Sub Type</p>
                        <p className="text-sm">{supplierData.supplier3.subType}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.createdAt && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Created At</p>
                        <p className="text-sm">{supplierData.supplier3.createdAt}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.updatedAt && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Updated At</p>
                        <p className="text-sm">{supplierData.supplier3.updatedAt}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Timing Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier3?.loadingTime && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Loading Time</p>
                        <p className="text-sm">{supplierData.supplier3.loadingTime}</p>
                      </div>
                    )}
                    {supplierData.supplier3?.unloadingTime && (
                      <div className="border-b pb-1">
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
            <ScrollArea className="h-[350px] rounded-md border p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Clipboard className="h-4 w-4 text-[#3CB72E]" /> Inspection Details
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection('supplier4')} className="text-[#3CB72E]">
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
                      <div key={key} className="border-b pb-1">
                        <p className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Inspection Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier4?.inspectionStatus && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm">{supplierData.supplier4.inspectionStatus}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.inspectionDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-sm">{supplierData.supplier4.inspectionDate}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.inspectionMileage && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Mileage</p>
                        <p className="text-sm">{supplierData.supplier4.inspectionMileage} km</p>
                      </div>
                    )}
                    {supplierData.supplier4?.inspectionDossierId && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Dossier ID</p>
                        <p className="text-sm">{supplierData.supplier4.inspectionDossierId}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.logDate && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Log Date</p>
                        <p className="text-sm">{supplierData.supplier4.logDate}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.version && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Version</p>
                        <p className="text-sm">{supplierData.supplier4.version}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.progressDirection && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Progress Direction</p>
                        <p className="text-sm">{supplierData.supplier4.progressDirection}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.originalStatus && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Original Status</p>
                        <p className="text-sm">{supplierData.supplier4.originalStatus}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.progressStatus && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Progress Status</p>
                        <p className="text-sm">{supplierData.supplier4.progressStatus}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-[#3CB72E]">Location Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {supplierData.supplier4?.locationAddress && (
                      <div className="border-b pb-1">
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="text-sm">{supplierData.supplier4.locationAddress}</p>
                      </div>
                    )}
                    {supplierData.supplier4?.parkingSpace && (
                      <div className="border-b pb-1">
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
