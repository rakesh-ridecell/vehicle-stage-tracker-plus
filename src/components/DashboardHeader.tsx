
import React from "react";
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, Tooltip, Paper } from "@mui/material";
import { DirectionsCar, FileDownload, FilterList, History as HistoryIcon } from "@mui/icons-material";

interface DashboardHeaderProps {
  totalCount: number;
  onFilterChange?: (filter: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ totalCount, onFilterChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (onFilterChange) {
      onFilterChange(event.target.value as string);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      alignItems: { xs: 'flex-start', md: 'center' }, 
      justifyContent: 'space-between',
      gap: { xs: 2, md: 0 }
    }}>
      <Box>
        <Typography variant="h1" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          fontWeight: 'bold',
          mb: 0.5
        }}>
          <DirectionsCar sx={{ color: 'primary.main' }} /> 
          Vehicle Stage Tracker
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tracking {totalCount} vehicle stage movements
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        gap: 1 
      }}>
        <Tooltip title="View the complete movement history for each vehicle across its lifecycle">
          <Button 
            variant="outlined" 
            startIcon={<HistoryIcon />}
            sx={{ 
              minWidth: { sm: '130px' },
              color: 'primary.main',
              borderColor: 'primary.light',
              '&:hover': { 
                bgcolor: 'primary.light',
                borderColor: 'primary.light'
              }
            }}
          >
            History
          </Button>
        </Tooltip>
        
        <FormControl variant="outlined" size="small" sx={{ minWidth: { sm: '180px' } }}>
          <InputLabel id="filter-label">Filter by</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            defaultValue="all"
            label="Filter by"
            onChange={handleFilterChange as any}
            startAdornment={<FilterList fontSize="small" color="primary" sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Movements</MenuItem>
            <MenuItem value="today">Today Only</MenuItem>
            <MenuItem value="week">Last 7 Days</MenuItem>
            <MenuItem value="month">Last 30 Days</MenuItem>
          </Select>
        </FormControl>
        
        <Button 
          variant="outlined" 
          startIcon={<FileDownload />}
          sx={{ 
            minWidth: { sm: '130px' },
            color: 'primary.main',
            borderColor: 'primary.light',
            '&:hover': { 
              bgcolor: 'primary.light',
              borderColor: 'primary.light'
            }
          }}
        >
          Export Data
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
