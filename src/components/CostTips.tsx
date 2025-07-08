
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  TrendingDown, 
  Users, 
  Package, 
  Clock, 
  Shield,
  Recycle,
  Calculator,
  Target,
  Zap
} from "lucide-react";

const CostTips = () => {
  const tipCategories = [
    {
      title: "Material Optimization",
      icon: Package,
      color: "blue",
      tips: [
        {
          title: "Bulk Purchasing Power",
          description: "Order materials in bulk to secure better pricing. Coordinate with other contractors for shared deliveries.",
          savings: "8-15%",
          difficulty: "Easy",
          timeframe: "Immediate"
        },
        {
          title: "Alternative Material Analysis",
          description: "Research equivalent materials that meet specifications but cost less. Consider recycled or reclaimed options.",
          savings: "12-25%",
          difficulty: "Medium",
          timeframe: "Planning Phase"
        },
        {
          title: "Seasonal Procurement",
          description: "Time material purchases with seasonal pricing cycles. Buy lumber in winter, concrete in off-peak seasons.",
          savings: "5-12%",
          difficulty: "Easy",
          timeframe: "Strategic"
        }
      ]
    },
    {
      title: "Labor Efficiency",
      icon: Users,
      color: "green",
      tips: [
        {
          title: "Skills-Based Team Assembly",
          description: "Match worker skills precisely to tasks. Reduce learning curves and increase productivity.",
          savings: "15-20%",
          difficulty: "Medium",
          timeframe: "Ongoing"
        },
        {
          title: "Optimize Work Schedules",
          description: "Schedule tasks during optimal conditions. Avoid overtime by improving daily productivity.",
          savings: "10-18%",
          difficulty: "Easy",
          timeframe: "Weekly"
        },
        {
          title: "Cross-Training Investment",
          description: "Train workers in multiple skills to reduce downtime and increase flexibility.",
          savings: "8-15%",
          difficulty: "Hard",
          timeframe: "Long-term"
        }
      ]
    },
    {
      title: "Equipment & Tools",
      icon: Zap,
      color: "orange",
      tips: [
        {
          title: "Rental vs. Purchase Analysis",
          description: "Calculate break-even points for equipment. Rent for short-term, buy for frequent use.",
          savings: "20-30%",
          difficulty: "Medium",
          timeframe: "Project Start"
        },
        {
          title: "Maintenance Scheduling",
          description: "Preventive maintenance reduces breakdowns and extends equipment life.",
          savings: "12-20%",
          difficulty: "Easy",
          timeframe: "Ongoing"
        },
        {
          title: "Shared Equipment Programs",
          description: "Coordinate with other contractors to share large equipment costs.",
          savings: "25-40%",
          difficulty: "Hard",
          timeframe: "Strategic"
        }
      ]
    },
    {
      title: "Project Management",
      icon: Target,
      color: "purple",
      tips: [
        {
          title: "Detailed Planning & Scheduling",
          description: "Invest time in detailed planning to avoid costly changes and delays.",
          savings: "15-25%",
          difficulty: "Medium",
          timeframe: "Pre-construction"
        },
        {
          title: "Risk Management",
          description: "Identify potential risks early and develop mitigation strategies.",
          savings: "10-20%",
          difficulty: "Hard",
          timeframe: "Ongoing"
        },
        {
          title: "Value Engineering",
          description: "Regularly review design for cost optimization without compromising quality.",
          savings: "5-15%",
          difficulty: "Hard",
          timeframe: "Design Phase"
        }
      ]
    }
  ];

  const quickWins = [
    {
      title: "Negotiate Payment Terms",
      description: "Request extended payment terms from suppliers to improve cash flow",
      impact: "Cash Flow",
      effort: "Low"
    },
    {
      title: "Energy-Efficient Equipment",
      description: "Use energy-efficient tools and equipment to reduce operating costs",
      impact: "5-10% Cost Reduction",
      effort: "Medium"
    },
    {
      title: "Waste Reduction Program",
      description: "Implement waste tracking and reduction measures on-site",
      impact: "3-8% Savings",
      effort: "Low"
    },
    {
      title: "Local Supplier Network",
      description: "Build relationships with local suppliers to reduce transportation costs",
      impact: "Transportation Savings",
      effort: "Medium"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            Construction Cost Optimization Tips
          </CardTitle>
          <CardDescription className="text-base">
            Proven strategies and actionable insights to reduce project costs and improve efficiency
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Wins Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            Quick Wins - Implement Today
          </CardTitle>
          <CardDescription>
            Low-effort, high-impact strategies you can start immediately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickWins.map((win, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{win.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {win.effort} Effort
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{win.description}</p>
                <Badge className="bg-green-100 text-green-800">
                  {win.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tips by Category */}
      {tipCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <category.icon className={`h-5 w-5 text-${category.color}-600`} />
              {category.title}
            </CardTitle>
            <CardDescription>
              Strategies to optimize {category.title.toLowerCase()} costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.tips.map((tip, tipIndex) => (
                <div key={tipIndex} className={`border rounded-lg p-4 ${getColorClasses(category.color)} border-opacity-50`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900">{tip.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {tip.difficulty}
                      </Badge>
                      <Badge className="bg-green-600 text-xs">
                        {tip.savings} Savings
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{tip.description}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">Implementation: {tip.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Industry Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Cost Control Fundamentals
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Track all expenses in real-time</li>
                <li>• Set weekly budget review meetings</li>
                <li>• Use standardized cost coding</li>
                <li>• Monitor variance from baseline</li>
                <li>• Document all change orders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Recycle className="h-4 w-4" />
                Sustainable Practices
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Implement material recycling programs</li>
                <li>• Use energy-efficient equipment</li>
                <li>• Optimize transportation routes</li>
                <li>• Consider sustainable material alternatives</li>
                <li>• Track and reduce waste generation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">Ready to Optimize Your Project Costs?</h3>
          <p className="text-gray-600 mb-4">
            Start implementing these strategies today and track your savings with our tools
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              Calculate Potential Savings
            </Button>
            <Button>
              Start Cost Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostTips;
