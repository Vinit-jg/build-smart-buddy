
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Target, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  PlusCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BudgetTracker = () => {
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    description: ""
  });

  const budgetCategories = [
    {
      name: "Labor",
      allocated: 180000,
      spent: 142000,
      remaining: 38000,
      percentage: 78.9,
      status: "on-track"
    },
    {
      name: "Materials",
      allocated: 200000,
      spent: 165000,
      remaining: 35000,
      percentage: 82.5,
      status: "warning"
    },
    {
      name: "Equipment",
      allocated: 75000,
      spent: 52000,
      remaining: 23000,
      percentage: 69.3,
      status: "on-track"
    },
    {
      name: "Permits & Fees",
      allocated: 25000,
      spent: 21000,
      remaining: 4000,
      percentage: 84.0,
      status: "warning"
    },
    {
      name: "Contingency",
      allocated: 50000,
      spent: 8000,
      remaining: 42000,
      percentage: 16.0,
      status: "good"
    }
  ];

  const recentTransactions = [
    { date: "2024-01-15", category: "Materials", description: "Concrete delivery", amount: -4500, type: "expense" },
    { date: "2024-01-14", category: "Labor", description: "Weekly payroll", amount: -12000, type: "expense" },
    { date: "2024-01-13", category: "Equipment", description: "Crane rental return", amount: 500, type: "refund" },
    { date: "2024-01-12", category: "Materials", description: "Steel rebar", amount: -8900, type: "expense" },
    { date: "2024-01-11", category: "Labor", description: "Overtime hours", amount: -2300, type: "expense" }
  ];

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage = (totalSpent / totalBudget) * 100;

  const addExpense = () => {
    if (!newExpense.category || !newExpense.amount || !newExpense.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add an expense.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Expense Added",
      description: `$${newExpense.amount} expense added to ${newExpense.category}`,
    });

    setNewExpense({ category: "", amount: "", description: "" });
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-blue-100">Project allocation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-orange-100">{overallPercentage.toFixed(1)}% of budget</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRemaining.toLocaleString()}</div>
            <p className="text-xs text-green-100">{(100 - overallPercentage).toFixed(1)}% available</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Burn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18.5K</div>
            <p className="text-xs text-purple-100">Per week average</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Budget Progress by Category
          </CardTitle>
          <CardDescription>
            Track spending across different project categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{category.name}</h4>
                    <Badge 
                      variant={
                        category.status === "good" ? "default" :
                        category.status === "warning" ? "secondary" : "outline"
                      }
                      className={
                        category.status === "good" ? "bg-green-600" :
                        category.status === "warning" ? "bg-orange-100 text-orange-800" : ""
                      }
                    >
                      {category.status === "good" ? "Under Budget" :
                       category.status === "warning" ? "Monitor" : "On Track"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${category.spent.toLocaleString()} / ${category.allocated.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">${category.remaining.toLocaleString()} remaining</p>
                  </div>
                </div>
                <Progress 
                  value={category.percentage} 
                  className={`h-2 ${
                    category.status === "warning" ? "bg-orange-100" : "bg-gray-200"
                  }`}
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>0%</span>
                  <span>{category.percentage.toFixed(1)}% used</span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Expense */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add New Expense
          </CardTitle>
          <CardDescription>
            Record new project expenses and track budget impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Materials"
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              />
            </div>
          </div>
          <Button onClick={addExpense} className="w-full md:w-auto">
            Add Expense
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
          <CardDescription>
            Latest project expenses and financial activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === "expense" ? "bg-red-100" : "bg-green-100"
                  }`}>
                    {transaction.type === "expense" ? 
                      <TrendingDown className="h-4 w-4 text-red-600" /> :
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.amount < 0 ? "text-red-600" : "text-green-600"
                }`}>
                  {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Budget Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              <strong>Materials budget at 82.5%</strong> - Consider reviewing upcoming material purchases to stay within budget.
            </AlertDescription>
          </Alert>
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <strong>Equipment costs under control</strong> - Currently 15% under projected spending for this phase.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTracker;
