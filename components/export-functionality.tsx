import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Table, Calendar, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportOptions {
  format: "pdf" | "excel" | "csv"
  reportType: "projects" | "analytics" | "competitors" | "full"
  dateRange: "week" | "month" | "quarter" | "year"
}

export function ExportFunctionality() {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "pdf",
    reportType: "full",
    dateRange: "month",
  })
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Simulate export processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real implementation, this would call your backend API
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exportOptions),
      })

      if (response.ok) {
        // Simulate file download
        const filename = `alfozan-${exportOptions.reportType}-${exportOptions.dateRange}.${exportOptions.format}`

        toast({
          title: "Export Successful",
          description: `${filename} has been downloaded successfully.`,
        })
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Reports
        </CardTitle>
        <CardDescription>Generate and download comprehensive business reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Report Type</label>
            <Select
              value={exportOptions.reportType}
              onValueChange={(value: ExportOptions["reportType"]) =>
                setExportOptions((prev) => ({ ...prev, reportType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Complete Report</SelectItem>
                <SelectItem value="projects">Projects Only</SelectItem>
                <SelectItem value="analytics">Analytics Only</SelectItem>
                <SelectItem value="competitors">Competitors Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Format</label>
            <Select
              value={exportOptions.format}
              onValueChange={(value: ExportOptions["format"]) =>
                setExportOptions((prev) => ({ ...prev, format: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Date Range</label>
            <Select
              value={exportOptions.dateRange}
              onValueChange={(value: ExportOptions["dateRange"]) =>
                setExportOptions((prev) => ({ ...prev, dateRange: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
          <Button onClick={handleExport} disabled={isExporting} className="flex items-center gap-2 flex-1 sm:flex-none">
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export Report
              </>
            )}
          </Button>

          <div className="text-sm text-slate-600 text-center sm:text-left">
            Format: {exportOptions.format.toUpperCase()} • Type: {exportOptions.reportType} • Range:{" "}
            {exportOptions.dateRange}
          </div>
        </div>

        {/* Quick Export Buttons */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Quick Exports</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent justify-start">
              <FileText className="h-3 w-3" />
              Project Summary
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent justify-start">
              <Table className="h-3 w-3" />
              Sales Data
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent justify-start">
              <Calendar className="h-3 w-3" />
              Timeline Report
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent justify-start">
              <TrendingUp className="h-3 w-3" />
              KPI Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
