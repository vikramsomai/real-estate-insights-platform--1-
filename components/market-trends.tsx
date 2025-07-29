"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp, Home, Building, Factory } from "lucide-react"

const marketData = [
  { month: "Jan", residential: 120, commercial: 85, industrial: 45 },
  { month: "Feb", residential: 135, commercial: 92, industrial: 52 },
  { month: "Mar", residential: 128, commercial: 88, industrial: 48 },
  { month: "Apr", residential: 145, commercial: 105, industrial: 58 },
  { month: "May", residential: 152, commercial: 98, industrial: 55 },
  { month: "Jun", residential: 168, commercial: 115, industrial: 62 },
]

export function MarketTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Market Trends Analysis
        </CardTitle>
        <CardDescription>Sector performance and market movements (Million SAR)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            residential: {
              label: "Residential",
              color: "hsl(var(--chart-1))",
            },
            commercial: {
              label: "Commercial",
              color: "hsl(var(--chart-2))",
            },
            industrial: {
              label: "Industrial",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <AreaChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="residential"
              stackId="1"
              stroke="var(--color-residential)"
              fill="var(--color-residential)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="commercial"
              stackId="1"
              stroke="var(--color-commercial)"
              fill="var(--color-commercial)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="industrial"
              stackId="1"
              stroke="var(--color-industrial)"
              fill="var(--color-industrial)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ChartContainer>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <Home className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-lg font-semibold">168M</div>
            <div className="text-sm text-slate-600">Residential</div>
            <div className="text-xs text-green-600">+12% ↗</div>
          </div>

          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <Building className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-lg font-semibold">115M</div>
            <div className="text-sm text-slate-600">Commercial</div>
            <div className="text-xs text-green-600">+8% ↗</div>
          </div>

          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <Factory className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <div className="text-lg font-semibold">62M</div>
            <div className="text-sm text-slate-600">Industrial</div>
            <div className="text-xs text-green-600">+15% ↗</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
