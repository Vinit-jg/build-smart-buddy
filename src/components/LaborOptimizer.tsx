
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LaborOptimizer = () => {
  const [selectedTrade, setSelectedTrade] = useState("");
  const [workersCount, setWorkersCount] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [daysToComplete, setDaysToComplete] = useState("");

  const tradeData = {
    carpenter: { rate: 35, efficiency: 85, name: "Carpenter" },
    electrician: { rate: 45, efficiency: 90, name: "Electrician" },
    plumber: { rate: 42, efficiency: 88, name: "Plumber" },
    laborer: { rate: 18, efficiency: 75, name: "General Laborer" },
    mason: { rate: 38, efficiency: 82, name: "Mason" }
  };

  const optimizationTips = [
    {
      title: "Cross-Training Benefits",
      description: "Train workers in multiple skills to reduce idle time between tasks",
      impact: "15-20% efficiency gain",
      icon: Users
    },
    {
      title: "Peak Hours Scheduling",
      description: "Schedule heavy work during optimal weather and daylight hours",
      impact: "10-15% productivity boost",
      icon: Clock
    },
    {
      title: "Team Size Optimization",
      description: "Right-size teams to avoid overcrowding and maximize efficiency",
      impact: "8-12% cost reduction",
      icon: TrendingDown
    },
    {
      title: "Bulk Task Scheduling",
      description: "Group similar tasks to minimize setup and transition time",
      impact: "12-18% time savings",
      icon: TrendingUp
    }
  ];

  const calculateLabor = () => {
    if (!selectedTrade || !workersCount || !hoursPerDay || !daysToComplete) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate labor costs.",
        variant: "destructive",
      });
      return;
    }

    const trade = tradeData[selectedTrade as keyof typeof tradeData];
    const workers = parseInt(workersCount);
    const hours = parseInt(hoursPerDay);
    const days = parseInt(daysToComplete);

    const totalHours = workers * hours * days;
    const baseCost = totalHours * trade.rate;
    const efficiencyFactor = trade.efficiency / 100;
    const optimizedCost = baseCost * efficiencyFactor;
    const savings = baseCost - optimizedCost;

    toast({
      title: "Labor Calculation Complete",
      description: `Estimated cost: $${optimizedCost.toLocaleString()} with ${trade.efficiency}% efficiency`,
    });
  };

  const currentProjects = [
    {
      name: "Foundation Work",
      progress: 75,
      workers: 8,
      efficiency: 88,
      cost: 12500,
      status: "On Track"
    },
    {
      name: "Framing",
      progress: 45,
      workers: 12,
      efficiency: 92,
      cost: 18700,
      status: "Ahead"
    },
    {
      name: "Electrical Rough-in",
      progress: 30,
      workers: 4,
      efficiency: 78,
      cost: 8900,
      status: "Behind"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Labor Cost Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Labor Cost Calculator
          </CardTitle>
          <CardDescription>
            Calculate labor costs and optimize workforce efficiency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="trade">Trade/Skill</Label>
              <Select value={selectedTrade} onValueChange={setSelectedTrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carpenter">Carpenter ($35/hr)</SelectItem>
                  <SelectItem value="electrician">Electrician ($45/hr)</SelectItem>
                  <SelectItem value="plumber">Plumber ($42/hr)</SelectItem>
                  <SelectItem value="laborer">General Laborer ($18/hr)</SelectItem>
                  <SelectItem value="mason">Mason ($38/hr)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="workers">Number of Workers</Label>
              <Input
                id="workers"
                type="number"
                placeholder="e.g., 4"
                value={workersCount}
                onChange={(e) => setWorkersCount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="hours">Hours per Day</Label>
              <Input
                id="hours"
                type="number"
                placeholder="e.g., 8"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="days">Days to Complete</Label>
              <Input
                id="days"
                type="number"
                placeholder="e.g., 5"
                value={daysToComplete}
                onChange={(e) => setDaysToComplete(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={calculateLabor} className="w-full md:w-auto">
            Calculate Labor Costs
          </Button>
        </CardContent>
      </Card>

      {/* Current Projects Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Current Projects Status
          </CardTitle>
          <CardDescription>
            Monitor labor efficiency and progress across active projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentProjects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.workers} workers assigned</p>
                  </div>
                  <Badge 
                    variant={
                      project.status === "Ahead" ? "default" :
                      project.status === "On Track" ? "secondary" : "destructive"
                    }
                    className={
                      project.status === "Ahead" ? "bg-green-600" :
                      project.status === "On Track" ? "bg-blue-100 text-blue-800" : ""
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Efficiency</p>
                      <p className="font-semibold">{project.efficiency}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Labor Cost</p>
                      <p className="font-semibold">${project.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Workers</p>
                      <p className="font-semibold">{project.workers}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Labor Optimization Strategies
          </CardTitle>
          <CardDescription>
            Proven strategies to improve efficiency and reduce labor costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optimizationTips.map((tip, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <tip.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{tip.description}</p>
                    <Badge variant="outline" className="text-green-700 border-green-200">
                      {tip.impact}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule Optimizer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Weekly Cost Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">This Week</h4>
              <p className="text-2xl font-bold text-blue-900">$24,500</p>
              <p className="text-sm text-blue-700">Labor costs</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">Efficiency</h4>
              <p className="text-2xl font-bold text-green-900">87%</p>
              <p className="text-sm text-green-700">Average rate</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800">Overtime</h4>
              <p className="text-2xl font-bold text-orange-900">12hrs</p>
              <p className="text-sm text-orange-700">Total this week</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Savings</h4>
              <p className="text-2xl font-bold text-purple-900">$3,200</p>
              <p className="text-sm text-purple-700">vs. projected</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaborOptimizer;
