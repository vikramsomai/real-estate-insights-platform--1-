"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp, DollarSign, Target } from "lucide-react"

const salesData = [
  { month: "Jan", planned: 45, actual: 52 },
  { month: "Feb", planned: 38, actual: 41 },
  { month: "Mar", planned: 55, actual: 48 },
  { month: "Apr", planned: 42, actual: 58 },
  { month: "May", planned: 48, actual: 45 },
  { month: "Jun", planned: 52, actual: 61 },
]

const revenueData = [
  { month: "Jan", revenue: 125 },
  { month: "Feb", revenue: 142 },
  { month: "Mar", revenue: 138 },
  { month: "Apr", revenue: 165 },
  { month: "May", revenue: 158 },
  { month: "Jun", revenue: 187 },
]

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Sales Performance
          </CardTitle>
          <CardDescription>Planned vs Actual Unit Sales</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              planned: {
                label: "Planned",
                color: "hsl(var(--chart-1))",
              },
              actual: {
                label: "Actual",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[200px]"
          >
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="planned" fill="var(--color-planned)" />
              <Bar dataKey="actual" fill="var(--color-actual)" />
            </BarChart>
          </ChartContainer>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">+12% vs target</span>
            </div>
            <div className="text-sm text-slate-500">305 units sold this period</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Revenue Trends
          </CardTitle>
          <CardDescription>Monthly Revenue (Million SAR)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[200px]"
          >
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={3}
                dot={{ fill: "var(--color-revenue)" }}
              />
            </LineChart>
          </ChartContainer>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">+18% growth</span>
            </div>
            <div className="text-sm text-slate-500">915M SAR total revenue</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
