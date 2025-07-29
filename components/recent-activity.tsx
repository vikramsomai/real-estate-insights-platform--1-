import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "success",
    title: "Project Milestone Completed",
    description: "Riyadh Business District Phase 1 construction completed",
    time: "2 hours ago",
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "warning",
    title: "Delay Alert",
    description: "Jeddah Waterfront project delayed by 2 weeks due to permits",
    time: "4 hours ago",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "info",
    title: "New Team Member",
    description: "Sarah Ahmed joined the Dammam project team",
    time: "1 day ago",
    icon: Users,
  },
  {
    id: 4,
    type: "info",
    title: "Market Update",
    description: "Residential sector shows 12% growth this quarter",
    time: "2 days ago",
    icon: Activity,
  },
  {
    id: 5,
    type: "warning",
    title: "Budget Review",
    description: "Riyadh project approaching 80% budget utilization",
    time: "3 days ago",
    icon: Clock,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest updates and notifications across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-100 text-green-600"
                      : activity.type === "warning"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <Badge
                      variant={
                        activity.type === "success"
                          ? "default"
                          : activity.type === "warning"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{activity.description}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View all activities →</button>
        </div>
      </CardContent>
    </Card>
  )
}
