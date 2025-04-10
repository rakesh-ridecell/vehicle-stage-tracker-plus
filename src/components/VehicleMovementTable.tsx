
import React, { useState } from "react";
import { VehicleMovement } from "@/types/vehicle";
import SupplierDataDetails from "./SupplierDataDetails";
import VehicleDetails from "./VehicleDetails";
import EditMovementModal from "./EditMovementModal";
import VehicleHistoryModal from "./VehicleHistoryModal";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  IconButton, TextField, Box, Chip, Collapse, Grid, Pagination, Card,
  Menu, MenuItem, ListItemIcon, ListItemText, InputAdornment
} from "@mui/material";
import { 
  Search, KeyboardArrowDown, KeyboardArrowRight, MoreHoriz,
  FileDownload, Edit, Visibility, History as HistoryIcon
} from "@mui/icons-material";

interface VehicleMovementTableProps {
  data: VehicleMovement[];
}

const VehicleMovementTable: React.FC<VehicleMovementTableProps> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicleMovements, setVehicleMovements] = useState<VehicleMovement[]>(data);
  const [editingMovement, setEditingMovement] = useState<VehicleMovement | null>(null);
  const [viewingHistory, setViewingHistory] = useState<{vin: string; licensePlate: string} | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMovement, setSelectedMovement] = useState<VehicleMovement | null>(null);
  const rowsPerPage = 10;

  // Filter data based on search query
  const filteredData = vehicleMovements.filter((item) => {
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
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Handle context menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, movement: VehicleMovement) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedMovement(movement);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handle editing movement
  const handleEditMovement = () => {
    if (selectedMovement) {
      setEditingMovement(selectedMovement);
      handleMenuClose();
    }
  };

  // Handle viewing history
  const handleViewHistory = () => {
    if (selectedMovement) {
      setViewingHistory({
        vin: selectedMovement.vin,
        licensePlate: selectedMovement.licensePlate
      });
      handleMenuClose();
    }
  };

  // Get vehicle history data
  const getVehicleHistory = (vin: string): VehicleMovement[] => {
    return vehicleMovements.filter(movement => movement.vin === vin);
  };

  // Handle saving edited movement
  const handleSaveMovement = (updatedMovement: VehicleMovement) => {
    setVehicleMovements(prevMovements => 
      prevMovements.map(movement => 
        movement.id === updatedMovement.id ? updatedMovement : movement
      )
    );
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "Create":
        return { bgcolor: 'primary.light', color: 'primary.main' };
      case "Update":
        return { bgcolor: 'info.light', color: 'info.dark' };
      case "Delete":
        return { bgcolor: 'error.light', color: 'error.dark' };
      default:
        return { bgcolor: 'grey.100', color: 'grey.800' };
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ width: '100%' }}>
        <TextField
          placeholder="Search by License Plate, VIN, Contract..."
          variant="outlined"
          fullWidth
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" width={48}></TableCell>
              <TableCell>License Plate</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>Contract #</TableCell>
              <TableCell>Source Stage</TableCell>
              <TableCell>Target Stage</TableCell>
              <TableCell>Movement Date</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Execution Date</TableCell>
              <TableCell>Executed By</TableCell>
              <TableCell padding="checkbox" width={48}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  No vehicle movements found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow 
                    hover
                    onClick={() => toggleRowExpansion(item.id)}
                    sx={{ 
                      '&.MuiTableRow-root': {
                        bgcolor: expandedRow === item.id ? 'action.hover' : 'inherit'
                      },
                      cursor: 'pointer'
                    }}
                  >
                    <TableCell padding="checkbox">
                      <IconButton size="small">
                        {expandedRow === item.id ? (
                          <KeyboardArrowDown fontSize="small" />
                        ) : (
                          <KeyboardArrowRight fontSize="small" />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{item.licensePlate}</TableCell>
                    <TableCell>{item.vin}</TableCell>
                    <TableCell>{item.contractNumber}</TableCell>
                    <TableCell>{item.sourceStage}</TableCell>
                    <TableCell>{item.targetStage}</TableCell>
                    <TableCell>{item.movementDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={item.action}
                        size="small"
                        sx={{ 
                          ...getActionColor(item.action),
                          fontSize: '0.75rem',
                          fontWeight: 'medium'
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.executionDate}</TableCell>
                    <TableCell>{item.executedBy}</TableCell>
                    <TableCell padding="checkbox">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, item)}
                      >
                        <MoreHoriz fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={11}
                    >
                      <Collapse in={expandedRow === item.id} timeout="auto" unmountOnExit>
                        <Box sx={{ py: 2, px: 3, bgcolor: 'action.hover' }}>
                          <Grid container spacing={2}>
                            <Grid xs={12} md={6} item>
                              <Card variant="outlined" sx={{ p: 2 }}>
                                <VehicleDetails vehicleMovement={item} />
                              </Card>
                            </Grid>
                            <Grid xs={12} md={6} item>
                              <Card variant="outlined" sx={{ p: 2 }}>
                                <SupplierDataDetails supplierData={item.supplierData} />
                              </Card>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 2 
        }}>
          <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </Box>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => { toggleRowExpansion(selectedMovement?.id || ''); handleMenuClose(); }}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleViewHistory}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View History</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditMovement}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Movement</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <FileDownload fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download Data</ListItemText>
        </MenuItem>
      </Menu>

      {editingMovement && (
        <EditMovementModal 
          vehicleMovement={editingMovement}
          open={!!editingMovement}
          onOpenChange={(open) => !open && setEditingMovement(null)}
          onSave={handleSaveMovement}
        />
      )}

      {viewingHistory && (
        <VehicleHistoryModal
          open={!!viewingHistory}
          onOpenChange={(open) => !open && setViewingHistory(null)}
          vehicleData={viewingHistory}
          historyData={getVehicleHistory(viewingHistory.vin)}
        />
      )}
    </Box>
  );
};

export default VehicleMovementTable;
