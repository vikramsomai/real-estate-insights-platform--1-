"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle } from "lucide-react"

interface GanttTask {
  id: string
  name: string
  startDate: string
  endDate: string
  plannedEndDate: string
  progress: number
  status: "completed" | "in-progress" | "delayed" | "not-started"
  dependencies?: string[]
}

const ganttData: GanttTask[] = [
  {
    id: "task_001",
    name: "Site Preparation",
    startDate: "2024-01-01",
    endDate: "2024-02-15",
    plannedEndDate: "2024-02-10",
    progress: 100,
    status: "completed",
  },
  {
    id: "task_002",
    name: "Foundation Work",
    startDate: "2024-02-16",
    endDate: "2024-04-30",
    plannedEndDate: "2024-04-25",
    progress: 85,
    status: "in-progress",
  },
  {
    id: "task_003",
    name: "Structural Framework",
    startDate: "2024-05-01",
    endDate: "2024-08-15",
    plannedEndDate: "2024-08-10",
    progress: 45,
    status: "in-progress",
  },
  {
    id: "task_004",
    name: "MEP Installation",
    startDate: "2024-08-16",
    endDate: "2024-11-30",
    plannedEndDate: "2024-11-20",
    progress: 0,
    status: "not-started",
  },
  {
    id: "task_005",
    name: "Interior Finishing",
    startDate: "2024-12-01",
    endDate: "2025-03-15",
    plannedEndDate: "2025-03-10",
    progress: 0,
    status: "not-started",
  },
]

export function GanttChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStatusColor = (status: GanttTask["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "delayed":
        return "bg-red-500"
      case "not-started":
        return "bg-gray-300"
    }
  }

  const getStatusBadge = (status: GanttTask["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">In Progress</Badge>
      case "delayed":
        return (
          <Badge variant="destructive" className="text-xs">
            Delayed
          </Badge>
        )
      case "not-started":
        return (
          <Badge variant="outline" className="text-xs">
            Not Started
          </Badge>
        )
    }
  }

  const isDelayed = (task: GanttTask) => {
    const planned = new Date(task.plannedEndDate)
    const actual = new Date(task.endDate)
    return actual > planned
  }

  const formatDate = (dateString: string) => {
    if (!mounted) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  }

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Timeline - Riyadh Business District
          </CardTitle>
          <CardDescription>Loading timeline...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Project Timeline - Riyadh Business District
        </CardTitle>
        <CardDescription>Planned vs. actual project milestones and dependencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Mobile-friendly timeline */}
          <div className="block lg:hidden space-y-4">
            {ganttData.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{task.name}</h3>
                  {getStatusBadge(task.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Start: {formatDate(task.startDate)}</span>
                    <span>End: {formatDate(task.endDate)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Planned End: {formatDate(task.plannedEndDate)}</span>
                    {isDelayed(task) && <Clock className="h-3 w-3 text-red-500" />}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getStatusColor(task.status)}`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop timeline */}
          <div className="hidden lg:block">
            {/* Timeline Header */}
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-slate-600 border-b pb-2 mb-4">
              <div className="col-span-3">Task</div>
              <div className="col-span-2">Start Date</div>
              <div className="col-span-2">End Date</div>
              <div className="col-span-2">Planned End</div>
              <div className="col-span-1">Progress</div>
              <div className="col-span-2">Status</div>
            </div>

            {/* Timeline Rows */}
            {ganttData.map((task, index) => (
              <div key={task.id} className="space-y-3 mb-6">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3">
                    <div className="font-medium text-sm">{task.name}</div>
                    <div className="text-xs text-slate-500">ID: {task.id}</div>
                  </div>
                  <div className="col-span-2 text-sm">{formatDate(task.startDate)}</div>
                  <div className="col-span-2 text-sm">
                    {formatDate(task.endDate)}
                    {isDelayed(task) && <Clock className="inline h-3 w-3 text-red-500 ml-1" />}
                  </div>
                  <div className="col-span-2 text-sm text-slate-600">{formatDate(task.plannedEndDate)}</div>
                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatusColor(task.status)}`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium whitespace-nowrap">{task.progress}%</span>
                    </div>
                  </div>
                  <div className="col-span-2">{getStatusBadge(task.status)}</div>
                </div>

                {/* Visual Timeline Bar */}
                <div className="ml-4 relative">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span>Timeline:</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">Planned</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Actual</span>
                  </div>

                  <div className="relative h-8 bg-slate-100 rounded">
                    {/* Planned timeline */}
                    <div
                      className="absolute top-1 h-2 bg-blue-200 rounded"
                      style={{
                        left: `${index * 15}%`,
                        width: `${12}%`,
                      }}
                    ></div>

                    {/* Actual timeline */}
                    <div
                      className={`absolute top-4 h-2 rounded ${getStatusColor(task.status)}`}
                      style={{
                        left: `${index * 15}%`,
                        width: `${(task.progress / 100) * 12}%`,
                      }}
                    ></div>

                    {/* Progress indicator */}
                    {task.status === "completed" && (
                      <CheckCircle className="absolute right-2 top-1.5 h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-semibold mb-3">Project Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {ganttData.filter((t) => t.status === "completed").length}
              </div>
              <div className="text-sm text-slate-600">Completed Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {ganttData.filter((t) => t.status === "in-progress").length}
              </div>
              <div className="text-sm text-slate-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{ganttData.filter((t) => isDelayed(t)).length}</div>
              <div className="text-sm text-slate-600">Delayed Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600">
                {Math.round(ganttData.reduce((acc, task) => acc + task.progress, 0) / ganttData.length)}%
              </div>
              <div className="text-sm text-slate-600">Overall Progress</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
