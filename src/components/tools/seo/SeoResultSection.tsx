
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface SeoResultSectionProps {
  icon: "success" | "warning" | "error";
  title: string;
  score?: number;
  children: React.ReactNode;
}

export const SeoResultSection = ({
  icon,
  title,
  score,
  children,
}: SeoResultSectionProps) => {
  const IconComponent = {
    success: CheckCircle2,
    warning: AlertCircle,
    error: XCircle,
  }[icon];

  const iconColor = {
    success: "text-green-500",
    warning: "text-orange-500",
    error: "text-red-500",
  }[icon];

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <IconComponent className={`${iconColor} h-5 w-5`} />
        <h3 className="text-lg font-semibold">{title}</h3>
        {score !== undefined && (
          <span className={`${score >= 0 ? "text-green-500" : "text-red-500"} text-sm ml-auto`}>
            {score >= 0 ? "+" : ""}{score}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};
