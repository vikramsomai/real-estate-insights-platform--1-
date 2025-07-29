import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Building2, Calendar, DollarSign, Users } from "lucide-react"

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
    location: "Riyadh",
    manager: "Ahmed Al-Rashid",
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
    location: "Jeddah",
    manager: "Fatima Al-Zahra",
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
    location: "Dammam",
    manager: "Omar Al-Mutairi",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Project Management</h1>
            <p className="text-slate-600 mt-2">Monitor and manage all real estate projects</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input placeholder="Search projects..." className="pl-10" />
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
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
                </div>
                <CardDescription>
                  {project.location} • {project.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-slate-600">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      <div className="text-sm font-medium">{project.sold}</div>
                      <div className="text-xs text-slate-500">Units Sold</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-xs text-slate-500 mb-2">Project Manager</div>
                  <div className="text-sm font-medium">{project.manager}</div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Edit Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
