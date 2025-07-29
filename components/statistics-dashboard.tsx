import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Users,
  Target,
  Activity,
  MapPin,
  Calendar,
  BarChart3,
  PieChart,
  RefreshCw,
} from "lucide-react"
import { fetchAnalytics } from "./api-integration"

interface StatisticsData {
  kpis: {
    total_projects: number
    total_revenue: number
    total_units: number
    total_units_sold: number
    sales_rate: number
    avg_price_per_unit: number
    monthly_growth: number
    customer_satisfaction: number
  }
  regional_data: Array<{
    region: string
    projects: number
    revenue: number
    units_sold: number
    growth_rate: number
  }>
  monthly_trends: Array<{
    month: string
    revenue: number
    units_sold: number
    new_projects: number
  }>
  project_types: Array<{
    type: string
    count: number
    revenue: number
    percentage: number
  }>
}

export function StatisticsDashboard() {
  const [data, setData] = useState<StatisticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const loadStatistics = async () => {
    try {
      const response = await fetchAnalytics()
      if (response.success) {
        setData(response.data)
      }
    } catch (error) {
      console.error("Error loading statistics:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadStatistics()
  }

  useEffect(() => {
    loadStatistics()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const kpis = data?.kpis || {
    total_projects: 12,
    total_revenue: 2450.5,
    total_units: 1850,
    total_units_sold: 1247,
    sales_rate: 67.4,
    avg_price_per_unit: 1.96,
    monthly_growth: 12.5,
    customer_satisfaction: 4.2,
  }

  const regionalData = data?.regional_data || [
    { region: "Riyadh", projects: 5, revenue: 1200.5, units_sold: 650, growth_rate: 15.2 },
    { region: "Jeddah", projects: 4, revenue: 850.3, units_sold: 420, growth_rate: 8.7 },
    { region: "Dammam", projects: 2, revenue: 300.2, units_sold: 150, growth_rate: 22.1 },
    { region: "Mecca", projects: 1, revenue: 99.5, units_sold: 27, growth_rate: -5.3 },
  ]

  const projectTypes = data?.project_types || [
    { type: "Residential", count: 8, revenue: 1800.5, percentage: 73.5 },
    { type: "Commercial", count: 3, revenue: 500.2, percentage: 20.4 },
    { type: "Mixed-Use", count: 1, revenue: 149.8, percentage: 6.1 },
  ]

  const monthlyTrends = data?.monthly_trends || [
    { month: "Jan", revenue: 180.5, units_sold: 95, new_projects: 1 },
    { month: "Feb", revenue: 220.3, units_sold: 112, new_projects: 2 },
    { month: "Mar", revenue: 195.7, units_sold: 98, new_projects: 0 },
    { month: "Apr", revenue: 245.2, units_sold: 125, new_projects: 1 },
    { month: "May", revenue: 280.1, units_sold: 142, new_projects: 2 },
    { month: "Jun", revenue: 310.5, units_sold: 158, new_projects: 1 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Statistics Dashboard</h2>
          <p className="text-gray-600">Comprehensive analytics and performance metrics</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline" size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_revenue.toFixed(1)}M SAR</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{kpis.monthly_growth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.sales_rate}%</div>
            <div className="text-xs text-muted-foreground">
              {kpis.total_units_sold} of {kpis.total_units} units sold
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price/Unit</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.avg_price_per_unit}M SAR</div>
            <div className="text-xs text-muted-foreground">Average selling price</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.customer_satisfaction}/5.0</div>
            <div className="text-xs text-muted-foreground">Customer satisfaction</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="types">Project Types</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Monthly Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyTrends.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 text-sm font-medium">{month.month}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(month.revenue / 350) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{month.revenue}M</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Project Completion Rate</span>
                    <Badge variant="default">85%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-Time Delivery</span>
                    <Badge variant="default">92%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Budget Adherence</span>
                    <Badge variant="secondary">78%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality Score</span>
                    <Badge variant="default">4.2/5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Regional Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionalData.map((region) => (
                  <div key={region.region} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{region.region}</h3>
                        <p className="text-sm text-muted-foreground">{region.projects} active projects</p>
                      </div>
                      <Badge variant={region.growth_rate > 0 ? "default" : "destructive"}>
                        {region.growth_rate > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(region.growth_rate)}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Revenue</div>
                        <div className="font-medium">{region.revenue}M SAR</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Units Sold</div>
                        <div className="font-medium">{region.units_sold}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Growth</div>
                        <div className="font-medium">{region.growth_rate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Trends Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Revenue Progression</h4>
                  <div className="space-y-2">
                    {monthlyTrends.map((month, index) => (
                      <div key={month.month} className="flex items-center gap-4">
                        <div className="w-12 text-sm">{month.month}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                            style={{ width: `${(month.revenue / 350) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-20 text-sm font-medium text-right">{month.revenue}M</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Units Sold Trend</h4>
                  <div className="space-y-2">
                    {monthlyTrends.map((month) => (
                      <div key={month.month} className="flex items-center gap-4">
                        <div className="w-12 text-sm">{month.month}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                            style={{ width: `${(month.units_sold / 200) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-20 text-sm font-medium text-right">{month.units_sold} units</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Project Types Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectTypes.map((type) => (
                  <div key={type.type} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{type.type}</h3>
                      <Badge variant="outline">{type.percentage}%</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Projects</div>
                        <div className="font-medium">{type.count}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Revenue</div>
                        <div className="font-medium">{type.revenue}M SAR</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Share</div>
                        <div className="font-medium">{type.percentage}%</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${type.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
