import { NextResponse } from "next/server"

// Mock database - In real implementation, this would connect to your database
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
    startDate: "2023-01-15",
    endDate: "2024-12-31",
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
    startDate: "2024-03-01",
    endDate: "2025-06-30",
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
    startDate: "2022-06-01",
    endDate: "2024-03-31",
  },
]

export async function GET() {
  try {
    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "type", "budget", "timeline", "units"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new project
    const newProject = {
      id: projects.length + 1,
      ...body,
      status: "Planning",
      progress: 0,
      sold: 0,
      startDate: new Date().toISOString().split("T")[0],
    }

    projects.push(newProject)

    return NextResponse.json({
      success: true,
      data: newProject,
      message: "Project created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
