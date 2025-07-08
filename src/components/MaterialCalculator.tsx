
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Package, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MaterialCalculator = () => {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [calculations, setCalculations] = useState<any[]>([]);

  const materials = {
    concrete: {
      name: "Concrete (per cubic yard)",
      basePrice: 120,
      alternatives: [
        { name: "Standard Ready-Mix", price: 120, savings: 0, quality: "Standard" },
        { name: "Bulk Purchase Deal", price: 108, savings: 10, quality: "Standard" },
        { name: "Local Supplier", price: 115, savings: 4, quality: "Standard" },
        { name: "Self-Mix On-Site", price: 95, savings: 21, quality: "Variable" }
      ]
    },
    steel: {
      name: "Steel Rebar (per ton)",
      basePrice: 800,
      alternatives: [
        { name: "Grade 60 Standard", price: 800, savings: 0, quality: "High" },
        { name: "Recycled Steel", price: 720, savings: 10, quality: "Good" },
        { name: "Bulk Order Discount", price: 760, savings: 5, quality: "High" },
        { name: "Alternative Supplier", price: 785, savings: 2, quality: "High" }
      ]
    },
    lumber: {
      name: "Lumber (per board foot)",
      basePrice: 8.5,
      alternatives: [
        { name: "Premium Grade", price: 8.5, savings: 0, quality: "Premium" },
        { name: "Standard Grade", price: 7.2, savings: 15, quality: "Standard" },
        { name: "Engineered Wood", price: 6.8, savings: 20, quality: "Good" },
        { name: "Reclaimed Wood", price: 5.9, savings: 31, quality: "Variable" }
      ]
    }
  };

  const calculateCosts = () => {
    if (!selectedMaterial || !quantity) {
      toast({
        title: "Missing Information",
        description: "Please select a material and enter quantity.",
        variant: "destructive",
      });
      return;
    }

    const material = materials[selectedMaterial as keyof typeof materials];
    const qty = parseFloat(quantity);
    const baseTotal = material.basePrice * qty;

    const calculation = {
      id: Date.now(),
      material: material.name,
      quantity: qty,
      basePrice: material.basePrice,
      baseTotal: baseTotal,
      alternatives: material.alternatives.map(alt => ({
        ...alt,
        total: alt.price * qty,
        totalSavings: (material.basePrice - alt.price) * qty
      }))
    };

    setCalculations([calculation, ...calculations]);
    setQuantity("");
    
    toast({
      title: "Calculation Complete",
      description: `Cost analysis generated for ${material.name}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Material Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Material Cost Calculator
          </CardTitle>
          <CardDescription>
            Calculate costs and compare alternatives for your construction materials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="material">Material Type</Label>
              <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concrete">Concrete</SelectItem>
                  <SelectItem value="steel">Steel Rebar</SelectItem>
                  <SelectItem value="lumber">Lumber</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={calculateCosts} className="w-full">
                Calculate Costs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Market Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Market Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert className="border-orange-200 bg-orange-50">
            <TrendingUp className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              <strong>Steel prices increased 6%</strong> this month due to supply chain constraints. 
              Consider alternatives or bulk purchasing.
            </AlertDescription>
          </Alert>
          <Alert className="border-green-200 bg-green-50">
            <TrendingDown className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <strong>Lumber prices dropped 12%</strong> following seasonal trends. 
              Good time for bulk purchases.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Calculation Results */}
      {calculations.map((calc) => (
        <Card key={calc.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {calc.material} - Cost Analysis
            </CardTitle>
            <CardDescription>
              Quantity: {calc.quantity} units • Base Price: ${calc.basePrice}/unit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Base Cost Calculation</h4>
                <p className="text-2xl font-bold text-gray-900">
                  ${calc.baseTotal.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  {calc.quantity} × ${calc.basePrice} = ${calc.baseTotal.toLocaleString()}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Alternative Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {calc.alternatives.map((alt: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{alt.name}</h5>
                        <Badge 
                          variant={alt.savings > 15 ? "default" : alt.savings > 0 ? "secondary" : "outline"}
                          className={
                            alt.savings > 15 ? "bg-green-600" : 
                            alt.savings > 0 ? "bg-blue-100 text-blue-800" : ""
                          }
                        >
                          Quality: {alt.quality}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-semibold">${alt.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">${alt.price}/unit</p>
                        {alt.savings > 0 && (
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingDown className="h-3 w-3" />
                            <span className="text-sm font-medium">
                              Save ${alt.totalSavings.toLocaleString()} ({alt.savings}%)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Best Savings Opportunity</h4>
                {(() => {
                  const bestSaving = calc.alternatives.reduce((best: any, current: any) => 
                    current.totalSavings > best.totalSavings ? current : best
                  );
                  return (
                    <p className="text-green-700">
                      <strong>{bestSaving.name}</strong> could save you{" "}
                      <strong>${bestSaving.totalSavings.toLocaleString()}</strong> ({bestSaving.savings}%) 
                      compared to the base option.
                    </p>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {calculations.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Calculations Yet</h3>
            <p className="text-gray-600">
              Select a material and quantity above to start calculating costs and comparing alternatives.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaterialCalculator;
