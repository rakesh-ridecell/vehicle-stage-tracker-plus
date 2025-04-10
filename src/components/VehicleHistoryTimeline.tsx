
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components for the timeline
const TimelineRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const TimelineItemRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

const TimelineConnector = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 14,
  top: 20,
  height: '100%',
  width: 2,
  backgroundColor: theme.palette.divider,
}));

const TimelineHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const TimelineContent = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(5),
}));

const TimelineBody = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

// Timeline components
interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, className, ...props }, ref) => (
    <TimelineRoot ref={ref} className={className} {...props}>
      {children}
    </TimelineRoot>
  )
);
Timeline.displayName = "Timeline";

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ children, className, ...props }, ref) => (
    <TimelineItemRoot ref={ref} className={className} {...props}>
      {children}
    </TimelineItemRoot>
  )
);
TimelineItem.displayName = "TimelineItem";

interface TimelineConnectorProps {
  className?: string;
}

export const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, ...props }, ref) => (
    <TimelineConnector ref={ref} className={className} {...props} />
  )
);
TimelineConnector.displayName = "TimelineConnector";

interface TimelineHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <TimelineHeader ref={ref} className={className} {...props}>
      {children}
    </TimelineHeader>
  )
);
TimelineHeader.displayName = "TimelineHeader";

interface TimelineDotProps {
  className?: string;
}

export const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, ...props }, ref) => (
    <TimelineDot ref={ref} className={className} {...props} />
  )
);
TimelineDot.displayName = "TimelineDot";

interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ children, className, ...props }, ref) => (
    <TimelineContent ref={ref} className={className} {...props}>
      {children}
    </TimelineContent>
  )
);
TimelineContent.displayName = "TimelineContent";

interface TimelineBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ children, className, ...props }, ref) => (
    <TimelineBody elevation={0} ref={ref} className={className} {...props}>
      {children}
    </TimelineBody>
  )
);
TimelineBody.displayName = "TimelineBody";
