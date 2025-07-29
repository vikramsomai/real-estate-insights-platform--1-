"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 120, projects: 3, growth: 5.2 },
  { month: "Feb", revenue: 135, projects: 4, growth: 12.5 },
  { month: "Mar", revenue: 148, projects: 3, growth: 9.6 },
  { month: "Apr", revenue: 162, projects: 5, growth: 9.5 },
  { month: "May", revenue: 178, projects: 4, growth: 9.9 },
  { month: "Jun", revenue: 195, projects: 6, growth: 9.6 },
  { month: "Jul", revenue: 210, projects: 5, growth: 7.7 },
  { month: "Aug", revenue: 225, projects: 4, growth: 7.1 },
  { month: "Sep", revenue: 242, projects: 6, growth: 7.6 },
  { month: "Oct", revenue: 258, projects: 5, growth: 6.6 },
  { month: "Nov", revenue: 275, projects: 7, growth: 6.6 },
  { month: "Dec", revenue: 290, projects: 6, growth: 5.5 },
]

const regionalData = [
  { region: "Riyadh", projects: 8, revenue: 450.5, growth: 12.5, color: "#0088FE" },
  { region: "Jeddah", projects: 6, revenue: 320.8, growth: 8.2, color: "#00C49F" },
  { region: "Dammam", projects: 4, revenue: 280.2, growth: 15.1, color: "#FFBB28" },
  { region: "Mecca", projects: 3, revenue: 150.0, growth: 5.8, color: "#FF8042" },
  { region: "Medina", projects: 2, revenue: 120.5, growth: 7.3, color: "#8884D8" },
]

const projectTypeData = [
  { type: "Residential", count: 12, percentage: 45, value: 450, color: "#0088FE" },
  { type: "Commercial", count: 8, percentage: 35, value: 350, color: "#00C49F" },
  { type: "Mixed Use", count: 6, percentage: 20, value: 200, color: "#FFBB28" },
]

const competitorData = [
  { name: "Al Fozan", market_share: 23.5, digital_score: 92, projects: 15 },
  { name: "Saudi Real Estate Co.", market_share: 15.2, digital_score: 85, projects: 8 },
  { name: "Kingdom Properties", market_share: 12.8, digital_score: 78, projects: 6 },
  { name: "Eastern Development", market_share: 9.5, digital_score: 72, projects: 4 },
  { name: "Others", market_share: 39.0, digital_score: 65, projects: 25 },
]

export function EnhancedCharts() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Analytics Charts</h2>
        <p className="text-gray-600">Interactive data visualizations for comprehensive business insights</p>
      </div>

      {/* Revenue Trends Chart */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">📈 Monthly Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue (Million SAR)",
                color: "hsl(var(--chart-1))",
              },
              projects: {
                label: "New Projects",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0088FE" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0088FE"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Bar yAxisId="right" dataKey="projects" fill="#00C49F" opacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🌍 Regional Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue (Million SAR)",
                  color: "hsl(var(--chart-1))",
                },
                growth: {
                  label: "Growth Rate (%)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar yAxisId="left" dataKey="revenue" fill="#0088FE" />
                  <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#FF8042" strokeWidth={3} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Project Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🏗️ Project Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                residential: {
                  label: "Residential",
                  color: "#0088FE",
                },
                commercial: {
                  label: "Commercial",
                  color: "#00C49F",
                },
                mixed: {
                  label: "Mixed Use",
                  color: "#FFBB28",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percentage }) => `${type}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Share Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🏆 Market Share & Digital Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              market_share: {
                label: "Market Share (%)",
                color: "hsl(var(--chart-1))",
              },
              digital_score: {
                label: "Digital Score",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitorData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="market_share" fill="#0088FE" name="Market Share (%)" />
                <Bar dataKey="digital_score" fill="#00C49F" name="Digital Score" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Investment</p>
                <p className="text-3xl font-bold">2.5B SAR</p>
              </div>
              <div className="text-4xl opacity-80">💰</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Projects</p>
                <p className="text-3xl font-bold">15</p>
              </div>
              <div className="text-4xl opacity-80">🏗️</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Market Share</p>
                <p className="text-3xl font-bold">23.5%</p>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Growth Rate</p>
                <p className="text-3xl font-bold">+15.2%</p>
              </div>
              <div className="text-4xl opacity-80">📈</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
