"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Eye, Building2, Users, MapPin, TrendingUp, Globe, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: number
  name: string
  type: string
  status: string
  location: string
  budget: number
  progress: number
  units: number
  units_sold: number
  manager: string
  start_date: string
  end_date: string
  sales_rate: number
}

interface Competitor {
  id: number
  name: string
  market_share: number
  digital_presence: number
  website: string
  recent_activity: string
  trend: string
  change_percentage: string
}

export function ProjectCRUD() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "Planning",
    location: "",
    budget: "",
    progress: "0",
    units: "",
    units_sold: "0",
    manager: "",
    start_date: "",
    end_date: "",
  })

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects")
      const data = await response.json()
      if (data.success) {
        setProjects(data.data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast({
        title: "Error",
        description: "Failed to fetch projects. Using demo data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      status: "Planning",
      location: "",
      budget: "",
      progress: "0",
      units: "",
      units_sold: "0",
      manager: "",
      start_date: "",
      end_date: "",
    })
    setEditingProject(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingProject
        ? `http://localhost:5000/api/projects/${editingProject.id}`
        : "http://localhost:5000/api/projects"

      const method = editingProject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: editingProject ? "Project updated successfully" : "Project created successfully",
        })
        setIsDialogOpen(false)
        resetForm()
        fetchProjects()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingProject ? "update" : "create"} project`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      type: project.type,
      status: project.status,
      location: project.location,
      budget: project.budget.toString(),
      progress: project.progress.toString(),
      units: project.units.toString(),
      units_sold: project.units_sold.toString(),
      manager: project.manager,
      start_date: project.start_date,
      end_date: project.end_date,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (projectId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        })
        fetchProjects()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "On Hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Project Management
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Manage real estate projects with full CRUD operations</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Project Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget (SAR) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="progress">Progress (%)</Label>
                    <Input
                      id="progress"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="units">Total Units *</Label>
                    <Input
                      id="units"
                      type="number"
                      value={formData.units}
                      onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="units_sold">Units Sold</Label>
                    <Input
                      id="units_sold"
                      type="number"
                      value={formData.units_sold}
                      onChange={(e) => setFormData({ ...formData, units_sold: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="manager">Project Manager</Label>
                    <Input
                      id="manager"
                      value={formData.manager}
                      onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editingProject ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.manager}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(project.budget)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        {project.units_sold}/{project.units}
                      </div>
                      <div className="text-muted-foreground">{project.sales_rate}% sold</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setViewingProject(project)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Project Details</DialogTitle>
                          </DialogHeader>
                          {viewingProject && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Project Name</Label>
                                  <p className="font-medium">{viewingProject.name}</p>
                                </div>
                                <div>
                                  <Label>Type</Label>
                                  <p>{viewingProject.type}</p>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <Badge className={getStatusColor(viewingProject.status)}>
                                    {viewingProject.status}
                                  </Badge>
                                </div>
                                <div>
                                  <Label>Location</Label>
                                  <p>{viewingProject.location}</p>
                                </div>
                                <div>
                                  <Label>Budget</Label>
                                  <p>{formatCurrency(viewingProject.budget)}</p>
                                </div>
                                <div>
                                  <Label>Progress</Label>
                                  <p>{viewingProject.progress}%</p>
                                </div>
                                <div>
                                  <Label>Units</Label>
                                  <p>
                                    {viewingProject.units_sold}/{viewingProject.units} sold
                                  </p>
                                </div>
                                <div>
                                  <Label>Sales Rate</Label>
                                  <p>{viewingProject.sales_rate}%</p>
                                </div>
                                <div>
                                  <Label>Manager</Label>
                                  <p>{viewingProject.manager}</p>
                                </div>
                                <div>
                                  <Label>Timeline</Label>
                                  <p>
                                    {viewingProject.start_date} to {viewingProject.end_date}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{project.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(project.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export function CompetitorCRUD() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCompetitor, setEditingCompetitor] = useState<Competitor | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    market_share: "",
    digital_presence: "",
    website: "",
    recent_activity: "",
    trend: "stable",
    change_percentage: "0%",
  })

  const fetchCompetitors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/competitors")
      const data = await response.json()
      if (data.success) {
        setCompetitors(data.data)
      }
    } catch (error) {
      console.error("Error fetching competitors:", error)
      toast({
        title: "Error",
        description: "Failed to fetch competitors. Using demo data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompetitors()
  }, [])

  const resetForm = () => {
    setFormData({
      name: "",
      market_share: "",
      digital_presence: "",
      website: "",
      recent_activity: "",
      trend: "stable",
      change_percentage: "0%",
    })
    setEditingCompetitor(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingCompetitor
        ? `http://localhost:5000/api/competitors/${editingCompetitor.id}`
        : "http://localhost:5000/api/competitors"

      const method = editingCompetitor ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: editingCompetitor ? "Competitor updated successfully" : "Competitor added successfully",
        })
        setIsDialogOpen(false)
        resetForm()
        fetchCompetitors()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingCompetitor ? "update" : "add"} competitor`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (competitor: Competitor) => {
    setEditingCompetitor(competitor)
    setFormData({
      name: competitor.name,
      market_share: competitor.market_share.toString(),
      digital_presence: competitor.digital_presence.toString(),
      website: competitor.website,
      recent_activity: competitor.recent_activity,
      trend: competitor.trend,
      change_percentage: competitor.change_percentage,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (competitorId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/competitors/${competitorId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Competitor deleted successfully",
        })
        fetchCompetitors()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete competitor",
        variant: "destructive",
      })
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Competitor Analysis
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Track and analyze market competitors</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Competitor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingCompetitor ? "Edit Competitor" : "Add New Competitor"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="market_share">Market Share (%)</Label>
                    <Input
                      id="market_share"
                      type="number"
                      step="0.1"
                      value={formData.market_share}
                      onChange={(e) => setFormData({ ...formData, market_share: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="digital_presence">Digital Presence Score</Label>
                    <Input
                      id="digital_presence"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.digital_presence}
                      onChange={(e) => setFormData({ ...formData, digital_presence: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="trend">Market Trend</Label>
                    <Select
                      value={formData.trend}
                      onValueChange={(value) => setFormData({ ...formData, trend: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="up">Growing</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="down">Declining</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="change_percentage">Change Percentage</Label>
                    <Input
                      id="change_percentage"
                      value={formData.change_percentage}
                      onChange={(e) => setFormData({ ...formData, change_percentage: e.target.value })}
                      placeholder="e.g., +12%, -5%"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="recent_activity">Recent Activity</Label>
                  <Textarea
                    id="recent_activity"
                    value={formData.recent_activity}
                    onChange={(e) => setFormData({ ...formData, recent_activity: e.target.value })}
                    placeholder="Describe recent market activities..."
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editingCompetitor ? "Update" : "Add"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Market Share</TableHead>
                <TableHead>Digital Score</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Recent Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitors.map((competitor) => (
                <TableRow key={competitor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{competitor.name}</div>
                      {competitor.website && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          <a
                            href={competitor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${Math.min(competitor.market_share * 2, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{competitor.market_share}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${competitor.digital_presence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{competitor.digital_presence}/100</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${getTrendColor(competitor.trend)}`}>
                      {getTrendIcon(competitor.trend)}
                      <span className="text-sm">{competitor.change_percentage}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate text-sm">{competitor.recent_activity}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(competitor)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Competitor</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{competitor.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(competitor.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
