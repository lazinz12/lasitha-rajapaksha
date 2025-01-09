import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Scale } from "lucide-react"

type UnitType = "length" | "weight" | "temperature"

interface UnitOption {
  value: string
  label: string
  ratio?: number // Ratio to base unit (meters for length, grams for weight)
}

const UnitConverter = () => {
  const [unitType, setUnitType] = useState<UnitType>("length")
  const [fromValue, setFromValue] = useState<string>("")
  const [fromUnit, setFromUnit] = useState<string>("")
  const [toUnit, setToUnit] = useState<string>("")
  const [result, setResult] = useState<string>("")

  const unitOptions: Record<UnitType, UnitOption[]> = {
    length: [
      { value: "mm", label: "Millimeters", ratio: 0.001 },
      { value: "cm", label: "Centimeters", ratio: 0.01 },
      { value: "m", label: "Meters", ratio: 1 },
      { value: "km", label: "Kilometers", ratio: 1000 },
      { value: "in", label: "Inches", ratio: 0.0254 },
      { value: "ft", label: "Feet", ratio: 0.3048 },
      { value: "yd", label: "Yards", ratio: 0.9144 },
      { value: "mi", label: "Miles", ratio: 1609.34 },
    ],
    weight: [
      { value: "mg", label: "Milligrams", ratio: 0.001 },
      { value: "g", label: "Grams", ratio: 1 },
      { value: "kg", label: "Kilograms", ratio: 1000 },
      { value: "oz", label: "Ounces", ratio: 28.3495 },
      { value: "lb", label: "Pounds", ratio: 453.592 },
    ],
    temperature: [
      { value: "c", label: "Celsius" },
      { value: "f", label: "Fahrenheit" },
      { value: "k", label: "Kelvin" },
    ],
  }

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number

    // Convert to Celsius first
    switch (from) {
      case "f":
        celsius = (value - 32) * (5 / 9)
        break
      case "k":
        celsius = value - 273.15
        break
      default:
        celsius = value
    }

    // Convert from Celsius to target unit
    switch (to) {
      case "f":
        return celsius * (9 / 5) + 32
      case "k":
        return celsius + 273.15
      default:
        return celsius
    }
  }

  const convert = () => {
    if (!fromValue || !fromUnit || !toUnit) {
      setResult("")
      return
    }

    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setResult("Invalid input")
      return
    }

    let converted: number

    if (unitType === "temperature") {
      converted = convertTemperature(value, fromUnit, toUnit)
    } else {
      const fromRatio = unitOptions[unitType].find((u) => u.value === fromUnit)?.ratio || 0
      const toRatio = unitOptions[unitType].find((u) => u.value === toUnit)?.ratio || 0
      converted = (value * fromRatio) / toRatio
    }

    setResult(converted.toFixed(4))
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-6 w-6" />
            Unit Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label>Unit Type</Label>
              <Select
                value={unitType}
                onValueChange={(value: UnitType) => {
                  setUnitType(value)
                  setFromUnit("")
                  setToUnit("")
                  setResult("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="length">Length</SelectItem>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>From</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={fromValue}
                    onChange={(e) => {
                      setFromValue(e.target.value)
                      convert()
                    }}
                    placeholder="Enter value"
                  />
                  <Select value={fromUnit} onValueChange={(value) => {
                    setFromUnit(value)
                    convert()
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions[unitType].map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-end justify-center">
                <Calculator className="h-6 w-6 text-muted-foreground" />
              </div>

              <div>
                <Label>To</Label>
                <div className="flex gap-2">
                  <Input value={result} readOnly placeholder="Result" />
                  <Select value={toUnit} onValueChange={(value) => {
                    setToUnit(value)
                    convert()
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions[unitType].map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UnitConverter