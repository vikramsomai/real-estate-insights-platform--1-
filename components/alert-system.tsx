"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, Calendar, Bell, X, CheckCircle } from "lucide-react"

interface Alert {
  id: string
  type: "delay" | "budget" | "deadline" | "milestone"
  severity: "high" | "medium" | "low"
  title: string
  description: string
  projectName: string
  timestamp: string
  acknowledged: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "alert_001",
    type: "delay",
    severity: "high",
    title: "Project Delay Alert",
    description: "Jeddah Waterfront project is 2 weeks behind schedule due to permit delays",
    projectName: "Jeddah Waterfront Residences",
    timestamp: "2024-01-15T10:30:00Z",
    acknowledged: false,
  },
  {
    id: "alert_002",
    type: "budget",
    severity: "high",
    title: "Budget Overrun Warning",
    description: "Riyadh Business District approaching 85% budget utilization",
    projectName: "Riyadh Business District",
    timestamp: "2024-01-15T09:15:00Z",
    acknowledged: false,
  },
  {
    id: "alert_003",
    type: "deadline",
    severity: "medium",
    title: "Upcoming Deadline",
    description: "Phase 2 construction milestone due in 5 days",
    projectName: "Dammam Industrial Complex",
    timestamp: "2024-01-15T08:45:00Z",
    acknowledged: true,
  },
  {
    id: "alert_004",
    type: "milestone",
    severity: "low",
    title: "Milestone Achieved",
    description: "Foundation work completed ahead of schedule",
    projectName: "Mecca Luxury Towers",
    timestamp: "2024-01-14T16:20:00Z",
    acknowledged: false,
  },
]

export function AlertSystem() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [filter, setFilter] = useState<"all" | "unacknowledged">("unacknowledged")
  const [mounted, setMounted] = useState(false)

  // Fix hydration error
  useEffect(() => {
    setMounted(true)
  }, [])

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "delay":
        return <Clock className="h-4 w-4 text-red-600" />
      case "budget":
        return <DollarSign className="h-4 w-4 text-orange-600" />
      case "deadline":
        return <Calendar className="h-4 w-4 text-yellow-600" />
      case "milestone":
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  const getAlertColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-50 border-red-200"
      case "medium":
        return "bg-yellow-50 border-yellow-200"
      case "low":
        return "bg-green-50 border-green-200"
    }
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const filteredAlerts = alerts.filter((alert) => filter === "all" || !alert.acknowledged)
  const unacknowledgedCount = alerts.filter((alert) => !alert.acknowledged).length

  // Format date consistently
  const formatDate = (dateString: string) => {
    if (!mounted) return ""
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Project Alerts</CardTitle>
          </div>
          <CardDescription>Loading alerts...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Project Alerts</CardTitle>
            {unacknowledgedCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unacknowledgedCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "unacknowledged" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unacknowledged")}
            >
              Unread
            </Button>
          </div>
        </div>
        <CardDescription>Real-time notifications for project delays and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No alerts to display</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all ${getAlertColor(alert.severity)} ${
                  alert.acknowledged ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getAlertIcon(alert.type)}
                    <h3 className="font-semibold text-sm">{alert.title}</h3>
                    <Badge
                      variant={
                        alert.severity === "high"
                          ? "destructive"
                          : alert.severity === "medium"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!alert.acknowledged && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="text-xs h-6 px-2"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Ack</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="text-xs h-6 px-2"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-2">{alert.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="bg-white px-2 py-1 rounded">{alert.projectName}</span>
                  <span>{formatDate(alert.timestamp)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Alert Summary */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">Alert Summary</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-600">
                {alerts.filter((a) => a.severity === "high" && !a.acknowledged).length}
              </div>
              <div className="text-xs text-slate-600">High Priority</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {alerts.filter((a) => a.severity === "medium" && !a.acknowledged).length}
              </div>
              <div className="text-xs text-slate-600">Medium Priority</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {alerts.filter((a) => a.type === "milestone").length}
              </div>
              <div className="text-xs text-slate-600">Milestones</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-600">{alerts.filter((a) => a.acknowledged).length}</div>
              <div className="text-xs text-slate-600">Resolved</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
