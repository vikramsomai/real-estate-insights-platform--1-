"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, BarChart3, Users, Building2, TrendingUp, FileSpreadsheet, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReportConfig {
  format: string
  reportType: string
  dateRange: string
  includeCharts: boolean
  includeAnalytics: boolean
  includeCompetitors: boolean
  includeProjects: boolean
}

export function EnhancedExport() {
  const [config, setConfig] = useState<ReportConfig>({
    format: "pdf",
    reportType: "comprehensive",
    dateRange: "month",
    includeCharts: true,
    includeAnalytics: true,
    includeCompetitors: true,
    includeProjects: true,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [recentReports, setRecentReports] = useState<any[]>([])
  const { toast } = useToast()

  const handleExport = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("http://localhost:5000/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      const data = await response.json()

      if (data.success) {
        // Add to recent reports
        setRecentReports((prev) => [data.data, ...prev.slice(0, 4)])

        // Download the file
        const downloadUrl = `http://localhost:5000${data.data.download_url}`
        const link = document.createElement("a")
        link.href = downloadUrl
        link.download = data.data.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
          title: "Report Generated Successfully",
          description: `${data.data.filename} has been downloaded`,
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />
      case "csv":
        return <FileSpreadsheet className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "projects":
        return <Building2 className="h-4 w-4" />
      case "competitors":
        return <Users className="h-4 w-4" />
      case "analytics":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Advanced Report Generation
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Generate comprehensive business intelligence reports with customizable options
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="format">Report Format</Label>
              <Select value={config.format} onValueChange={(value) => setConfig({ ...config, format: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      PDF Report
                    </div>
                  </SelectItem>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Excel Workbook
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      CSV Data
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={config.reportType} onValueChange={(value) => setConfig({ ...config, reportType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Comprehensive
                    </div>
                  </SelectItem>
                  <SelectItem value="projects">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Projects Only
                    </div>
                  </SelectItem>
                  <SelectItem value="competitors">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Competitors Only
                    </div>
                  </SelectItem>
                  <SelectItem value="analytics">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Analytics Only
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={config.dateRange} onValueChange={(value) => setConfig({ ...config, dateRange: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleExport} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Report Options */}
          <div>
            <Label className="text-base font-semibold">Report Content</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeProjects"
                  checked={config.includeProjects}
                  onCheckedChange={(checked) => setConfig({ ...config, includeProjects: checked as boolean })}
                />
                <Label htmlFor="includeProjects" className="text-sm">
                  Project Data
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeCompetitors"
                  checked={config.includeCompetitors}
                  onCheckedChange={(checked) => setConfig({ ...config, includeCompetitors: checked as boolean })}
                />
                <Label htmlFor="includeCompetitors" className="text-sm">
                  Competitor Analysis
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeAnalytics"
                  checked={config.includeAnalytics}
                  onCheckedChange={(checked) => setConfig({ ...config, includeAnalytics: checked as boolean })}
                />
                <Label htmlFor="includeAnalytics" className="text-sm">
                  Analytics & KPIs
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeCharts"
                  checked={config.includeCharts}
                  onCheckedChange={(checked) => setConfig({ ...config, includeCharts: checked as boolean })}
                />
                <Label htmlFor="includeCharts" className="text-sm">
                  Charts & Graphs
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Report Preview */}
          <div>
            <Label className="text-base font-semibold">Report Preview</Label>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {getFormatIcon(config.format)}
                <span className="font-medium">
                  Al Fozan {config.reportType.charAt(0).toUpperCase() + config.reportType.slice(1)} Report
                </span>
                <Badge variant="outline">{config.format.toUpperCase()}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {config.dateRange.charAt(0).toUpperCase() + config.dateRange.slice(1)} data • Generated on{" "}
                {new Date().toLocaleDateString()} • Includes:{" "}
                {[
                  config.includeProjects && "Projects",
                  config.includeCompetitors && "Competitors",
                  config.includeAnalytics && "Analytics",
                  config.includeCharts && "Charts",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      {recentReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getFormatIcon(report.filename.split(".").pop())}
                    <div>
                      <div className="font-medium text-sm">{report.filename}</div>
                      <div className="text-xs text-muted-foreground">
                        Generated {new Date(report.generated_at).toLocaleString()} • {report.size}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = `http://localhost:5000${report.download_url}`
                      link.download = report.filename
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Templates</CardTitle>
          <p className="text-sm text-muted-foreground">Pre-configured reports for common business needs</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
              onClick={() => {
                setConfig({
                  format: "pdf",
                  reportType: "comprehensive",
                  dateRange: "month",
                  includeCharts: true,
                  includeAnalytics: true,
                  includeCompetitors: true,
                  includeProjects: true,
                })
                handleExport()
              }}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Executive Summary</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Comprehensive monthly report with all KPIs, charts, and analysis
              </p>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
              onClick={() => {
                setConfig({
                  format: "excel",
                  reportType: "projects",
                  dateRange: "quarter",
                  includeCharts: false,
                  includeAnalytics: true,
                  includeCompetitors: false,
                  includeProjects: true,
                })
                handleExport()
              }}
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Project Portfolio</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Detailed project data and performance metrics in Excel format
              </p>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
              onClick={() => {
                setConfig({
                  format: "pdf",
                  reportType: "competitors",
                  dateRange: "month",
                  includeCharts: true,
                  includeAnalytics: false,
                  includeCompetitors: true,
                  includeProjects: false,
                })
                handleExport()
              }}
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Market Analysis</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Competitor analysis and market positioning report
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
