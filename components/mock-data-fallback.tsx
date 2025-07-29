"use client"

import { createContext, useContext, type ReactNode } from "react"

// Mock data for projects
export const mockProjects = [
  {
    id: 1,
    name: "Al Fozan Tower",
    type: "Commercial",
    status: "In Progress",
    location: "Riyadh",
    budget: 150000000,
    progress: 75,
    units: 120,
    units_sold: 90,
    manager: "Ahmed Al-Rashid",
    start_date: "2023-01-15",
    end_date: "2024-12-31",
    sales_rate: 75.0,
  },
  {
    id: 2,
    name: "Fozan Residential Complex",
    type: "Residential",
    status: "Planning",
    location: "Jeddah",
    budget: 200000000,
    progress: 25,
    units: 200,
    units_sold: 50,
    manager: "Sara Al-Mahmoud",
    start_date: "2024-03-01",
    end_date: "2025-08-30",
    sales_rate: 25.0,
  },
  {
    id: 3,
    name: "Industrial Park Phase 1",
    type: "Industrial",
    status: "Completed",
    location: "Dammam",
    budget: 300000000,
    progress: 100,
    units: 50,
    units_sold: 50,
    manager: "Omar Al-Fahad",
    start_date: "2022-06-01",
    end_date: "2023-11-30",
    sales_rate: 100.0,
  },
  {
    id: 4,
    name: "Luxury Villas Project",
    type: "Residential",
    status: "In Progress",
    location: "Riyadh",
    budget: 180000000,
    progress: 60,
    units: 80,
    units_sold: 48,
    manager: "Fatima Al-Zahra",
    start_date: "2023-09-01",
    end_date: "2024-06-30",
    sales_rate: 60.0,
  },
]

// Mock data for competitors
export const mockCompetitors = [
  {
    id: 1,
    name: "Saudi Real Estate Co.",
    market_share: 25.5,
    digital_presence: 85,
    website: "https://saudirealestate.com",
    recent_activity: "Launched new residential project in Riyadh",
    trend: "up",
    change_percentage: "+12%",
  },
  {
    id: 2,
    name: "Kingdom Properties",
    market_share: 18.2,
    digital_presence: 78,
    website: "https://kingdomproperties.sa",
    recent_activity: "Acquired land for commercial development",
    trend: "up",
    change_percentage: "+8%",
  },
  {
    id: 3,
    name: "Gulf Development Group",
    market_share: 15.8,
    digital_presence: 72,
    website: "https://gulfdevelopment.com",
    recent_activity: "Completed luxury tower project",
    trend: "stable",
    change_percentage: "0%",
  },
  {
    id: 4,
    name: "Arabian Investments",
    market_share: 12.3,
    digital_presence: 65,
    website: "https://arabianinvestments.sa",
    recent_activity: "Announced partnership with international firm",
    trend: "down",
    change_percentage: "-3%",
  },
]

// Mock analytics data
export const mockAnalytics = {
  kpis: {
    total_projects: mockProjects.length,
    total_revenue: mockProjects.reduce((sum, p) => sum + p.budget, 0) / 1000000, // Convert to millions
    total_units: mockProjects.reduce((sum, p) => sum + p.units, 0),
    total_units_sold: mockProjects.reduce((sum, p) => sum + p.units_sold, 0),
    sales_rate: mockProjects.reduce((sum, p) => sum + p.sales_rate, 0) / mockProjects.length,
  },
  sales_data: [
    { id: 1, metric_type: "units_sold", metric_value: 45, period: "2024-Jan", category: "monthly" },
    { id: 2, metric_type: "units_sold", metric_value: 52, period: "2024-Feb", category: "monthly" },
    { id: 3, metric_type: "units_sold", metric_value: 38, period: "2024-Mar", category: "monthly" },
    { id: 4, metric_type: "units_sold", metric_value: 61, period: "2024-Apr", category: "monthly" },
    { id: 5, metric_type: "units_sold", metric_value: 55, period: "2024-May", category: "monthly" },
    { id: 6, metric_type: "units_sold", metric_value: 48, period: "2024-Jun", category: "monthly" },
  ],
  revenue_data: [
    { id: 1, metric_type: "revenue", metric_value: 25.5, period: "2024-Jan", category: "monthly" },
    { id: 2, metric_type: "revenue", metric_value: 28.2, period: "2024-Feb", category: "monthly" },
    { id: 3, metric_type: "revenue", metric_value: 22.8, period: "2024-Mar", category: "monthly" },
    { id: 4, metric_type: "revenue", metric_value: 31.5, period: "2024-Apr", category: "monthly" },
    { id: 5, metric_type: "revenue", metric_value: 29.8, period: "2024-May", category: "monthly" },
    { id: 6, metric_type: "revenue", metric_value: 26.4, period: "2024-Jun", category: "monthly" },
  ],
}

// Mock user data
export const mockUser = {
  id: 1,
  email: "demo@alfozan.com",
  name: "Demo User",
  role: "analyst",
  department: "IT Department",
  created_at: "2024-01-01T00:00:00Z",
}

// Context for mock data
const MockDataContext = createContext({
  projects: mockProjects,
  competitors: mockCompetitors,
  analytics: mockAnalytics,
  user: mockUser,
})

export function MockDataProvider({ children }: { children: ReactNode }) {
  return (
    <MockDataContext.Provider
      value={{
        projects: mockProjects,
        competitors: mockCompetitors,
        analytics: mockAnalytics,
        user: mockUser,
      }}
    >
      {children}
    </MockDataContext.Provider>
  )
}

export function useMockData() {
  return useContext(MockDataContext)
}
