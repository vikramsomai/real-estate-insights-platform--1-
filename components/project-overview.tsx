import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, DollarSign, Users } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Riyadh Business District",
    status: "In Progress",
    progress: 75,
    budget: "2.5B SAR",
    timeline: "Q4 2024",
    units: 450,
    sold: 340,
    type: "Commercial",
  },
  {
    id: 2,
    name: "Jeddah Waterfront Residences",
    status: "Planning",
    progress: 25,
    budget: "1.8B SAR",
    timeline: "Q2 2025",
    units: 280,
    sold: 45,
    type: "Residential",
  },
  {
    id: 3,
    name: "Dammam Industrial Complex",
    status: "Completed",
    progress: 100,
    budget: "3.2B SAR",
    timeline: "Q1 2024",
    units: 120,
    sold: 120,
    type: "Industrial",
  },
]

export function ProjectOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Project Portfolio Overview
        </CardTitle>
        <CardDescription>Track progress, performance, and key metrics across all real estate projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "default"
                          : project.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                    <span className="text-sm text-slate-500">{project.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{project.progress}%</div>
                  <div className="text-sm text-slate-500">Complete</div>
                </div>
              </div>

              <Progress value={project.progress} className="h-2" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">{project.budget}</div>
                    <div className="text-xs text-slate-500">Budget</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium">{project.timeline}</div>
                    <div className="text-xs text-slate-500">Target</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium">{project.units}</div>
                    <div className="text-xs text-slate-500">Total Units</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-orange-600" />
                  <div>
                    <div className="text-sm font-medium">
                      {project.sold}/{project.units}
                    </div>
                    <div className="text-xs text-slate-500">Units Sold</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
