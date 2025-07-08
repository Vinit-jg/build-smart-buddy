
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calculator, 
  TrendingDown, 
  Users, 
  Package, 
  AlertTriangle, 
  DollarSign,
  BarChart3,
  Lightbulb,
  Clock,
  Target
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import MaterialCalculator from "@/components/MaterialCalculator";
import LaborOptimizer from "@/components/LaborOptimizer";
import BudgetTracker from "@/components/BudgetTracker";
import CostTips from "@/components/CostTips";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Construction Cost Optimizer</h1>
                <p className="text-sm text-gray-500">Smart cost management for construction projects</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <TrendingDown className="h-3 w-3 mr-1" />
                15% Avg. Savings
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Materials</span>
            </TabsTrigger>
            <TabsTrigger value="labor" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Labor</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Tips</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="materials">
            <MaterialCalculator />
          </TabsContent>

          <TabsContent value="labor">
            <LaborOptimizer />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetTracker />
          </TabsContent>

          <TabsContent value="tips">
            <CostTips />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p className="text-sm">
              Construction Cost Optimizer - Helping you build smarter and save more
            </p>
            <div className="mt-2 flex justify-center items-center space-x-4 text-xs">
              <span className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                Cost Tracking
              </span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Real-time Analysis
              </span>
              <span className="flex items-center">
                <Target className="h-3 w-3 mr-1" />
                Smart Optimization
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
