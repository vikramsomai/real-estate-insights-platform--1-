import { NextResponse } from "next/server"

// Mock analytics data
const analyticsData = {
  salesPerformance: [
    { month: "Jan", planned: 45, actual: 52 },
    { month: "Feb", planned: 38, actual: 41 },
    { month: "Mar", planned: 55, actual: 48 },
    { month: "Apr", planned: 42, actual: 58 },
    { month: "May", planned: 48, actual: 45 },
    { month: "Jun", planned: 52, actual: 61 },
  ],
  revenueData: [
    { month: "Jan", revenue: 125 },
    { month: "Feb", revenue: 142 },
    { month: "Mar", revenue: 138 },
    { month: "Apr", revenue: 165 },
    { month: "May", revenue: 158 },
    { month: "Jun", revenue: 187 },
  ],
  marketTrends: [
    { month: "Jan", residential: 120, commercial: 85, industrial: 45 },
    { month: "Feb", residential: 135, commercial: 92, industrial: 52 },
    { month: "Mar", residential: 128, commercial: 88, industrial: 48 },
    { month: "Apr", residential: 145, commercial: 105, industrial: 58 },
    { month: "May", residential: 152, commercial: 98, industrial: 55 },
    { month: "Jun", residential: 168, commercial: 115, industrial: 62 },
  ],
  kpis: {
    totalRevenue: 915000000, // 915M SAR
    totalUnits: 850,
    unitsSold: 505,
    averagePrice: 1812000, // Average price per unit
    marketShare: 17,
    digitalScore: 78,
  },
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 150))

    if (type) {
      // Return specific analytics type
      const data = analyticsData[type as keyof typeof analyticsData]
      if (!data) {
        return NextResponse.json({ success: false, error: "Invalid analytics type" }, { status: 400 })
      }

      return NextResponse.json({
        success: true,
        data,
        type,
      })
    }

    // Return all analytics data
    return NextResponse.json({
      success: true,
      data: analyticsData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
