import { SeoResultSection } from "./SeoResultSection";
import { Badge } from "@/components/ui/badge";

interface Recommendation {
  priority: "high" | "medium" | "low";
  category: string;
  recommendation: string;
  impact: string;
}

interface AiRecommendationsProps {
  recommendations: Recommendation[];
}

export const AiRecommendations = ({ recommendations }: AiRecommendationsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <SeoResultSection icon="success" title="AI Recommendations">
      <div className="space-y-4">
        {recommendations?.map((rec, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                {rec.priority} priority
              </Badge>
              <Badge variant="outline">{rec.category}</Badge>
            </div>
            <p className="text-gray-900 font-medium mb-1">{rec.recommendation}</p>
            <p className="text-sm text-gray-600">{rec.impact}</p>
          </div>
        ))}
      </div>
    </SeoResultSection>
  );
};