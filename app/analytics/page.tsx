"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp, DollarSign, Home, Building, Users, Target } from "lucide-react"

const performanceData = [
  { quarter: "Q1 2024", revenue: 245, units: 125, projects: 8 },
  { quarter: "Q2 2024", revenue: 312, units: 156, projects: 12 },
  { quarter: "Q3 2024", revenue: 289, units: 142, projects: 10 },
  { quarter: "Q4 2024", revenue: 356, units: 178, projects: 15 },
]

const sectorData = [
  { name: "Residential", value: 45, color: "#3b82f6" },
  { name: "Commercial", value: 30, color: "#10b981" },
  { name: "Industrial", value: 15, color: "#8b5cf6" },
  { name: "Mixed Use", value: 10, color: "#f59e0b" },
]

const regionData = [
  { region: "Riyadh", projects: 12, revenue: 450 },
  { region: "Jeddah", projects: 8, revenue: 320 },
  { region: "Dammam", projects: 6, revenue: 280 },
  { region: "Mecca", projects: 4, revenue: 180 },
  { region: "Medina", projects: 3, revenue: 150 },
]

export default function AnalyticsPage() {
  return (
    <div className=" wed min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 bg-img">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600 mt-2">Comprehensive insights and performance metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                  <p className="text-2xl font-bold">1.2B SAR</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +15% from last year
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Projects</p>
                  <p className="text-2xl font-bold">33</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Building className="h-3 w-3" />8 new this quarter
                  </p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Units Sold</p>
                  <p className="text-2xl font-bold">601</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Home className="h-3 w-3" />
                    85% of target
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Market Share</p>
                  <p className="text-2xl font-bold">17%</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    +2% this year
                  </p>
                </div>
                <Target className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Performance</CardTitle>
              <CardDescription>Revenue, units sold, and project count by quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue (M SAR)",
                    color: "hsl(var(--chart-1))",
                  },
                  units: {
                    label: "Units Sold",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                  <Bar dataKey="units" fill="var(--color-units)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Distribution by Sector</CardTitle>
              <CardDescription>Breakdown of projects by real estate sector</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  residential: {
                    label: "Residential",
                    color: "#3b82f6",
                  },
                  commercial: {
                    label: "Commercial",
                    color: "#10b981",
                  },
                  industrial: {
                    label: "Industrial",
                    color: "#8b5cf6",
                  },
                  mixed: {
                    label: "Mixed Use",
                    color: "#f59e0b",
                  },
                }}
                className="h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance Analysis</CardTitle>
            <CardDescription>Project count and revenue by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                projects: {
                  label: "Projects",
                  color: "hsl(var(--chart-3))",
                },
                revenue: {
                  label: "Revenue (M SAR)",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[400px]"
            >
              <BarChart data={regionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="projects" fill="var(--color-projects)" />
                <Bar dataKey="revenue" fill="var(--color-revenue)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
