
import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-6", className)}
      {...props}
    >
      {children}
    </div>
  )
);
Timeline.displayName = "Timeline";

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </div>
  )
);
TimelineItem.displayName = "TimelineItem";

interface TimelineConnectorProps {
  className?: string;
}

export const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-3.5 top-5 h-full w-0.5 bg-muted", className)}
      {...props}
    />
  )
);
TimelineConnector.displayName = "TimelineConnector";

interface TimelineHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 mb-2", className)}
      {...props}
    >
      {children}
    </div>
  )
);
TimelineHeader.displayName = "TimelineHeader";

interface TimelineDotProps {
  className?: string;
}

export const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative z-10 flex h-7 w-7 items-center justify-center rounded-full border bg-background", className)}
      {...props}
    />
  )
);
TimelineDot.displayName = "TimelineDot";

interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pl-10", className)}
      {...props}
    >
      {children}
    </div>
  )
);
TimelineContent.displayName = "TimelineContent";

interface TimelineBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-md border p-3 bg-background", className)}
      {...props}
    >
      {children}
    </div>
  )
);
TimelineBody.displayName = "TimelineBody";
