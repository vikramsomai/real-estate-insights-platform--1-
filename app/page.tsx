"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  DollarSign,
  Building2,
  Target,
  Activity,
  RefreshCw,
  Users,
  BarChart3,
  FileText,
  Calendar,
  Shield,
  Settings,
  Layers,
  Zap,
} from "lucide-react"

import { ProjectOverview } from "@/components/project-overview"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { CompetitorAnalysis } from "@/components/competitor-analysis"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EnhancedExport } from "@/components/enhanced-export"
import { AlertSystem } from "@/components/alert-system"
import { GanttChart } from "@/components/gantt-chart"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProjectCRUD, CompetitorCRUD } from "@/components/crud-operations"
import { StatisticsDashboard } from "@/components/statistics-dashboard"
import { AuthProvider, useAuth, ProtectedRoute, UserProfile } from "@/components/role-based-auth"
import { fetchAnalytics, useBackendStatus } from "@/components/api-integration"
import { UMLDiagrams } from "@/components/uml-diagrams"
import { Wireframes } from "@/components/wireframes"
import { EnhancedCharts } from "@/components/enhanced-charts"

function DashboardContent() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const backendStatus = useBackendStatus()
  const { user } = useAuth()

  const loadAnalytics = async () => {
    try {
      const response = await fetchAnalytics()
      if (response.success) {
        setAnalytics(response.data)
      }
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadAnalytics()
  }

  useEffect(() => {
    loadAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const kpis = analytics?.kpis || {
    total_projects: 0,
    total_revenue: 0,
    total_units: 0,
    total_units_sold: 0,
    sales_rate: 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-4 lg:py-8 space-y-6 lg:space-y-8">

        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Al Fozan Insights Platform
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Real Estate Business Intelligence & Analytics Dashboard</p>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant={backendStatus.connected ? "default" : "secondary"} className="text-sm">
                {backendStatus.connected ? "🟢 Live Data" : "🟡 Demo Mode"}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Last Updated: {new Date().toLocaleTimeString()}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <UserProfile />
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              size="sm"
              className="shadow-sm bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Alert System */}
        <AlertSystem />

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Projects</CardTitle>
              <Building2 className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{kpis.total_projects}</div>
              <p className="text-xs text-blue-600 mt-1">Active developments</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">{kpis.total_revenue.toFixed(1)}M</div>
              <p className="text-xs text-green-600 mt-1">SAR (millions)</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Total Units</CardTitle>
              <Target className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{kpis.total_units}</div>
              <p className="text-xs text-purple-600 mt-1">Available units</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Units Sold</CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">{kpis.total_units_sold}</div>
              <p className="text-xs text-orange-600 mt-1">Completed sales</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Sales Rate</CardTitle>
              <Activity className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900">{kpis.sales_rate.toFixed(1)}%</div>
              <p className="text-xs text-red-600 mt-1">Conversion rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="overflow-x-auto p-4 border-b">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 min-w-max lg:min-w-0 bg-gray-100">
                <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Statistics</span>
                </TabsTrigger>
                <TabsTrigger value="charts" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Zap className="h-4 w-4" />
                  <span className="hidden sm:inline">Charts</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="competitors" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Competitors</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Reports</span>
                </TabsTrigger>

              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ProjectOverview />
                  <div className="space-y-6">
                    <PerformanceMetrics />
                    <CompetitorAnalysis />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="statistics" className="space-y-6 mt-0">
                <StatisticsDashboard />
              </TabsContent>

              <TabsContent value="charts" className="space-y-6 mt-0">
                <EnhancedCharts />
              </TabsContent>

              <TabsContent value="projects" className="space-y-6 mt-0">
                <ProtectedRoute requiredPermission="read">
                  <ProjectCRUD />
                </ProtectedRoute>
              </TabsContent>

              <TabsContent value="competitors" className="space-y-6 mt-0">
                <ProtectedRoute requiredPermission="read">
                  <CompetitorCRUD />
                </ProtectedRoute>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6 mt-0">
                <GanttChart />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6 mt-0">
                <ProtectedRoute requiredPermission="export">
                  <EnhancedExport />
                </ProtectedRoute>
              </TabsContent>

              <TabsContent value="uml" className="space-y-6 mt-0">
                <UMLDiagrams />
              </TabsContent>

              <TabsContent value="wireframes" className="space-y-6 mt-0">
                <Wireframes />
              </TabsContent>

              {user?.role === "admin" && (
                <TabsContent value="admin" className="space-y-6 mt-0">
                  <Card className="border-2 border-dashed border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        System Administration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6 text-center">
                            <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                            <h3 className="font-semibold text-lg mb-2">User Management</h3>
                            <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
                            <Button className="mt-4 bg-transparent" variant="outline" size="sm">
                              Configure
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6 text-center">
                            <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
                            <h3 className="font-semibold text-lg mb-2">Security Settings</h3>
                            <p className="text-sm text-muted-foreground">Configure security policies</p>
                            <Button className="mt-4 bg-transparent" variant="outline" size="sm">
                              Configure
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6 text-center">
                            <Settings className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                            <h3 className="font-semibold text-lg mb-2">System Configuration</h3>
                            <p className="text-sm text-muted-foreground">Manage system settings</p>
                            <Button className="mt-4 bg-transparent" variant="outline" size="sm">
                              Configure
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    </AuthProvider>
  )
}
