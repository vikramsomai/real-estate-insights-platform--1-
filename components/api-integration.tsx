"use client"

import { useState, useEffect } from "react"
import { mockProjects, mockCompetitors, mockAnalytics, mockUser } from "./mock-data-fallback"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
const CONNECTION_TIMEOUT = 5000 // 5 seconds

interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
  message?: string
}

interface BackendStatus {
  connected: boolean
  usingMockData: boolean
  lastChecked: Date
}

// Check if backend is available
async function checkBackendConnection(): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), CONNECTION_TIMEOUT)

    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)
    return response.ok
  } catch (error) {
    console.log("Backend connection failed:", error)
    return false
  }
}

// Generic API call with fallback
async function apiCall<T>(endpoint: string, options: RequestInit = {}, fallbackData: T): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), CONNECTION_TIMEOUT)

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log(`API call failed for ${endpoint}, using mock data:`, error)
    return {
      success: true,
      data: fallbackData,
      message: "Using demo data (backend not connected)",
    }
  }
}

// Hook for backend status
export function useBackendStatus() {
  const [status, setStatus] = useState<BackendStatus>({
    connected: false,
    usingMockData: true,
    lastChecked: new Date(),
  })

  useEffect(() => {
    const checkStatus = async () => {
      const connected = await checkBackendConnection()
      setStatus({
        connected,
        usingMockData: !connected,
        lastChecked: new Date(),
      })
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return status
}

// Projects API
export async function fetchProjects(): Promise<ApiResponse<typeof mockProjects>> {
  return apiCall("/projects", {}, mockProjects)
}

export async function createProject(projectData: any): Promise<ApiResponse<any>> {
  return apiCall(
    "/projects",
    {
      method: "POST",
      body: JSON.stringify(projectData),
    },
    { ...projectData, id: Date.now() },
  )
}

export async function updateProject(id: number, projectData: any): Promise<ApiResponse<any>> {
  return apiCall(
    `/projects/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(projectData),
    },
    { ...projectData, id },
  )
}

export async function deleteProject(id: number): Promise<ApiResponse<any>> {
  return apiCall(
    `/projects/${id}`,
    {
      method: "DELETE",
    },
    { message: "Project deleted successfully" },
  )
}

// Competitors API
export async function fetchCompetitors(): Promise<ApiResponse<typeof mockCompetitors>> {
  return apiCall("/competitors", {}, mockCompetitors)
}

export async function createCompetitor(competitorData: any): Promise<ApiResponse<any>> {
  return apiCall(
    "/competitors",
    {
      method: "POST",
      body: JSON.stringify(competitorData),
    },
    { ...competitorData, id: Date.now() },
  )
}

export async function updateCompetitor(id: number, competitorData: any): Promise<ApiResponse<any>> {
  return apiCall(
    `/competitors/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(competitorData),
    },
    { ...competitorData, id },
  )
}

export async function deleteCompetitor(id: number): Promise<ApiResponse<any>> {
  return apiCall(
    `/competitors/${id}`,
    {
      method: "DELETE",
    },
    { message: "Competitor deleted successfully" },
  )
}

// Analytics API
export async function fetchAnalytics(): Promise<ApiResponse<typeof mockAnalytics>> {
  return apiCall("/analytics/dashboard", {}, mockAnalytics)
}

// Authentication API
export async function login(email: string, password: string): Promise<ApiResponse<any>> {
  return apiCall(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    {
      user: mockUser,
      session_id: "demo-session-" + Date.now(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
  )
}

export async function logout(): Promise<ApiResponse<any>> {
  return apiCall(
    "/auth/logout",
    {
      method: "POST",
    },
    { message: "Logged out successfully" },
  )
}

// Export/Report API
export async function exportReport(format: string, reportType: string, dateRange: string): Promise<ApiResponse<any>> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const filename = `alfozan_${reportType}_${dateRange}_${timestamp}.${format}`

  return apiCall(
    "/export",
    {
      method: "POST",
      body: JSON.stringify({ format, reportType, dateRange }),
    },
    {
      filename,
      download_url: `/api/download/${filename}`,
      generated_at: new Date().toISOString(),
      message: "Demo report generated (backend not connected)",
    },
  )
}

// Data processing API
export async function processData(): Promise<ApiResponse<any>> {
  return apiCall(
    "/data/process",
    {
      method: "POST",
    },
    {
      processed: {
        projects_updated: mockProjects.length,
        analytics_updated: true,
        timestamp: new Date().toISOString(),
      },
      message: "Demo data processing completed",
    },
  )
}
