"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { destinations, Destination } from "@/data/destinations";

const steps = [
  "Destination",
  "Budget & Duration",
  "Travel Details",
  "Food & Stay",
  "Review"
];

export default function TripPlanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    days: "",
    travelType: "",
    flightClass: "",
    foodPreference: "",
    hotelRating: ""
  });
  const [result, setResult] = useState<any>(null);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "travelType" && value !== "flight" && { flightClass: "" })
    }));
  };

  const calculateCost = () => {
    const dest = destinations[formData.destination as Destination];
    if (!dest) return;

    const travelCost = formData.travelType === "flight" 
      ? dest.flight[formData.flightClass as "economy" | "business"]
      : dest[formData.travelType as "train" | "bus" | "cab"] || 0;

    const hotelCost = dest.hotel[formData.hotelRating as "3-star" | "4-star" | "5-star"] * parseInt(formData.days);
    const foodCost = (formData.foodPreference === "veg" ? 500 : 700) * parseInt(formData.days);
    const totalCost = travelCost + hotelCost + foodCost;

    setResult({
      travelCost,
      hotelCost,
      foodCost,
      totalCost,
      overBudget: totalCost > parseInt(formData.budget)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-6 bg-white shadow-xl rounded-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Smart Budget Trip Planner
          </h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <span
                  key={index}
                  className={`text-sm ${
                    index === currentStep ? "font-bold text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Steps */}
          <div className="mt-8">
            {currentStep === 0 && (
              <div className="space-y-4">
                <Label>Select Destination</Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) => handleChange("destination", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(destinations).map(([city, data]) => (
                      <SelectItem key={city} value={city}>
                        {city}, {data.state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.destination && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Popular Attractions:</h3>
                    <ul className="list-disc list-inside">
                      {destinations[formData.destination as Destination].attractions.map((attraction) => (
                        <li key={attraction}>{attraction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>Budget (in INR)</Label>
                  <Input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    placeholder="Enter your budget"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Duration (in days)</Label>
                  <Input
                    type="number"
                    value={formData.days}
                    onChange={(e) => handleChange("days", e.target.value)}
                    placeholder="Number of days"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>Travel Type</Label>
                  <RadioGroup
                    value={formData.travelType}
                    onValueChange={(value) => handleChange("travelType", value)}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    {["flight", "train", "bus", "cab"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className="capitalize">{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {formData.travelType === "flight" && (
                  <div>
                    <Label>Flight Class</Label>
                    <RadioGroup
                      value={formData.flightClass}
                      onValueChange={(value) => handleChange("flightClass", value)}
                      className="grid grid-cols-2 gap-4 mt-2"
                    >
                      {["economy", "business"].map((cls) => (
                        <div key={cls} className="flex items-center space-x-2">
                          <RadioGroupItem value={cls} id={cls} />
                          <Label htmlFor={cls} className="capitalize">{cls}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Food Preference</Label>
                  <RadioGroup
                    value={formData.foodPreference}
                    onValueChange={(value) => handleChange("foodPreference", value)}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    {["veg", "non-veg"].map((food) => (
                      <div key={food} className="flex items-center space-x-2">
                        <RadioGroupItem value={food} id={food} />
                        <Label htmlFor={food} className="capitalize">{food}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label>Hotel Rating</Label>
                  <RadioGroup
                    value={formData.hotelRating}
                    onValueChange={(value) => handleChange("hotelRating", value)}
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    {["3-star", "4-star", "5-star"].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating} id={rating} />
                        <Label htmlFor={rating}>{rating}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Review Your Trip</h2>
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <p><span className="font-semibold">Destination:</span> {formData.destination}</p>
                  <p><span className="font-semibold">Budget:</span> ₹{formData.budget}</p>
                  <p><span className="font-semibold">Duration:</span> {formData.days} days</p>
                  <p><span className="font-semibold">Travel:</span> {formData.travelType} {formData.flightClass && `(${formData.flightClass})`}</p>
                  <p><span className="font-semibold">Food:</span> {formData.foodPreference}</p>
                  <p><span className="font-semibold">Hotel:</span> {formData.hotelRating}</p>
                </div>
                <Button 
                  onClick={calculateCost}
                  className="w-full mt-6"
                >
                  Calculate Cost
                </Button>
              </div>
            )}
          </div>

          {/* Result Display */}
          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
              <div className="space-y-2">
                <p><span className="font-semibold">Travel Cost:</span> ₹{result.travelCost}</p>
                <p><span className="font-semibold">Hotel Cost:</span> ₹{result.hotelCost}</p>
                <p><span className="font-semibold">Food Cost:</span> ₹{result.foodCost}</p>
                <p className="text-lg mt-4">
                  <span className="font-semibold">Total Cost:</span> ₹{result.totalCost}
                </p>
                {result.overBudget && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                    Your total cost exceeds your budget by ₹{result.totalCost - parseInt(formData.budget)}.
                    Consider adjusting your travel preferences or increasing your budget.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button
                onClick={handlePrevious}
                variant="outline"
              >
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button
                onClick={handleNext}
                className={currentStep === 0 ? "w-full" : ""}
              >
                Next
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
