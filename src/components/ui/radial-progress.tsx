import { cn } from "@/lib/utils";

interface RadialProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  color?: "primary" | "success" | "warning" | "danger";
}

export const RadialProgress = ({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  label,
  color = "primary"
}: RadialProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const colorClasses = {
    primary: "stroke-primary",
    success: "stroke-green-400",
    warning: "stroke-yellow-400",
    danger: "stroke-destructive"
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-1000 ease-out",
            colorClasses[color]
          )}
          style={{
            filter: "drop-shadow(0 0 8px currentColor)"
          }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn(
          "text-3xl font-bold",
          color === "success" && "text-green-400",
          color === "danger" && "text-destructive",
          color === "warning" && "text-yellow-400",
          color === "primary" && "text-primary"
        )}>
          {value}%
        </span>
        {label && (
          <span className="text-xs text-muted-foreground mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
