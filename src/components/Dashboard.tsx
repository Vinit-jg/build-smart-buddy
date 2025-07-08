
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Users, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const projectMetrics = {
    totalBudget: 500000,
    spent: 325000,
    projected: 475000,
    savings: 25000,
    laborCost: 180000,
    materialCost: 145000
  };

  const alerts = [
    {
      type: "warning",
      message: "Concrete costs have increased 8% this month. Consider alternative suppliers.",
      action: "View Alternatives"
    },
    {
      type: "success",
      message: "Labor scheduling optimization saved $3,200 this week.",
      action: "View Details"
    },
    {
      type: "info",
      message: "Weather forecast shows 3 rain days next week. Plan indoor activities.",
      action: "Adjust Schedule"
    }
  ];

  const budgetUtilization = (projectMetrics.spent / projectMetrics.totalBudget) * 100;
  const projectedUtilization = (projectMetrics.projected / projectMetrics.totalBudget) * 100;

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${projectMetrics.totalBudget.toLocaleString()}</div>
            <p className="text-xs text-blue-100">
              Project allocation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingDown className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${projectMetrics.savings.toLocaleString()}</div>
            <p className="text-xs text-green-100">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Labor Costs</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${projectMetrics.laborCost.toLocaleString()}</div>
            <p className="text-xs text-orange-100">
              36% of total budget
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Material Costs</CardTitle>
            <Package className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${projectMetrics.materialCost.toLocaleString()}</div>
            <p className="text-xs text-purple-100">
              29% of total budget
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget Utilization
          </CardTitle>
          <CardDescription>
            Current spending vs. projected completion costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Current Spent: ${projectMetrics.spent.toLocaleString()}</span>
              <span>{budgetUtilization.toFixed(1)}%</span>
            </div>
            <Progress value={budgetUtilization} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Projected Total: ${projectMetrics.projected.toLocaleString()}</span>
              <span>{projectedUtilization.toFixed(1)}%</span>
            </div>
            <Progress value={projectedUtilization} className="h-2 bg-gray-200" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingDown className="h-3 w-3 mr-1" />
              5% Under Budget
            </Badge>
            <span className="text-sm text-gray-600">
              Estimated completion: ${projectMetrics.projected.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alerts & Recommendations
          </CardTitle>
          <CardDescription>
            Smart insights to optimize your project costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert, index) => (
            <Alert key={index} className={`
              ${alert.type === 'warning' ? 'border-orange-200 bg-orange-50' : ''}
              ${alert.type === 'success' ? 'border-green-200 bg-green-50' : ''}
              ${alert.type === 'info' ? 'border-blue-200 bg-blue-50' : ''}
            `}>
              <div className="flex items-center gap-2">
                {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                {alert.type === 'info' && <Clock className="h-4 w-4 text-blue-600" />}
                <AlertDescription className="flex-1">
                  {alert.message}
                </AlertDescription>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                  {alert.action}
                </Badge>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Material Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Compare material costs and find better alternatives
            </p>
            <Badge className="bg-blue-100 text-blue-800">View Materials</Badge>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Labor Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Optimize workforce scheduling and productivity
            </p>
            <Badge className="bg-green-100 text-green-800">Optimize Labor</Badge>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              Cost Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Get personalized cost-saving recommendations
            </p>
            <Badge className="bg-orange-100 text-orange-800">View Tips</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
