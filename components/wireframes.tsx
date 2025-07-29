"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Wireframes() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">System Wireframes</h2>
        <p className="text-gray-600">User interface design and layout specifications</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Wireframe - Desktop Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <svg viewBox="0 0 1200 800" className="w-full h-auto border border-gray-300">
                  {/* Header */}
                  <rect x="0" y="0" width="1200" height="80" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                  <text x="20" y="30" className="text-lg font-bold">
                    Al Fozan Insights Platform
                  </text>
                  <rect x="1000" y="20" width="80" height="40" fill="#007bff" stroke="#0056b3" strokeWidth="1" />
                  <text x="1040" y="45" textAnchor="middle" className="text-sm fill-white">
                    Profile
                  </text>
                  <rect x="1100" y="20" width="80" height="40" fill="#28a745" stroke="#1e7e34" strokeWidth="1" />
                  <text x="1140" y="45" textAnchor="middle" className="text-sm fill-white">
                    Logout
                  </text>

                  {/* Navigation */}
                  <rect x="0" y="80" width="1200" height="60" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
                  <rect x="20" y="100" width="100" height="20" fill="#007bff" stroke="#0056b3" strokeWidth="1" />
                  <text x="70" y="115" textAnchor="middle" className="text-sm fill-white">
                    Overview
                  </text>
                  <rect x="140" y="100" width="100" height="20" fill="#6c757d" stroke="#495057" strokeWidth="1" />
                  <text x="190" y="115" textAnchor="middle" className="text-sm fill-white">
                    Projects
                  </text>
                  <rect x="260" y="100" width="100" height="20" fill="#6c757d" stroke="#495057" strokeWidth="1" />
                  <text x="310" y="115" textAnchor="middle" className="text-sm fill-white">
                    Analytics
                  </text>
                  <rect x="380" y="100" width="100" height="20" fill="#6c757d" stroke="#495057" strokeWidth="1" />
                  <text x="430" y="115" textAnchor="middle" className="text-sm fill-white">
                    Reports
                  </text>

                  {/* KPI Cards */}
                  <g>
                    <rect x="20" y="160" width="280" height="120" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="30" y="180" className="text-sm font-bold">
                      Total Projects
                    </text>
                    <text x="30" y="220" className="text-3xl font-bold">
                      12
                    </text>
                    <text x="30" y="250" className="text-sm text-gray-600">
                      Active developments
                    </text>

                    <rect x="320" y="160" width="280" height="120" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="330" y="180" className="text-sm font-bold">
                      Total Revenue
                    </text>
                    <text x="330" y="220" className="text-3xl font-bold">
                      1.2B SAR
                    </text>
                    <text x="330" y="250" className="text-sm text-gray-600">
                      Current portfolio
                    </text>

                    <rect x="620" y="160" width="280" height="120" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="630" y="180" className="text-sm font-bold">
                      Units Sold
                    </text>
                    <text x="630" y="220" className="text-3xl font-bold">
                      850
                    </text>
                    <text x="630" y="250" className="text-sm text-gray-600">
                      This quarter
                    </text>

                    <rect x="920" y="160" width="260" height="120" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="930" y="180" className="text-sm font-bold">
                      Sales Rate
                    </text>
                    <text x="930" y="220" className="text-3xl font-bold">
                      78%
                    </text>
                    <text x="930" y="250" className="text-sm text-gray-600">
                      Conversion rate
                    </text>
                  </g>

                  {/* Main Content Area */}
                  <g>
                    {/* Left Panel - Project Overview */}
                    <rect x="20" y="300" width="580" height="480" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="30" y="325" className="text-lg font-bold">
                      Project Overview
                    </text>

                    {/* Chart placeholder */}
                    <rect
                      x="40"
                      y="340"
                      width="540"
                      height="200"
                      fill="#f8f9fa"
                      stroke="#dee2e6"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text x="310" y="450" textAnchor="middle" className="text-sm text-gray-600">
                      Revenue Trends Chart
                    </text>

                    {/* Project list */}
                    <rect x="40" y="560" width="540" height="40" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
                    <text x="50" y="585" className="text-sm font-bold">
                      Al Fozan Tower - Riyadh
                    </text>
                    <rect x="40" y="600" width="540" height="40" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                    <text x="50" y="625" className="text-sm">
                      Residential Complex A - Jeddah
                    </text>
                    <rect x="40" y="640" width="540" height="40" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
                    <text x="50" y="665" className="text-sm">
                      Mixed Use Development - Dammam
                    </text>
                  </g>

                  {/* Right Panel - Analytics */}
                  <g>
                    <rect x="620" y="300" width="560" height="240" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="630" y="325" className="text-lg font-bold">
                      Performance Metrics
                    </text>

                    {/* Metrics chart */}
                    <rect
                      x="640"
                      y="340"
                      width="520"
                      height="180"
                      fill="#f8f9fa"
                      stroke="#dee2e6"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text x="900" y="440" textAnchor="middle" className="text-sm text-gray-600">
                      Performance Dashboard
                    </text>

                    {/* Competitor Analysis */}
                    <rect x="620" y="560" width="560" height="220" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="630" y="585" className="text-lg font-bold">
                      Competitor Analysis
                    </text>

                    <rect
                      x="640"
                      y="600"
                      width="520"
                      height="160"
                      fill="#f8f9fa"
                      stroke="#dee2e6"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text x="900" y="690" textAnchor="middle" className="text-sm text-gray-600">
                      Market Share Analysis
                    </text>
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects Management Wireframe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <svg viewBox="0 0 1200 800" className="w-full h-auto border border-gray-300">
                  {/* Header */}
                  <rect x="0" y="0" width="1200" height="80" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                  <text x="20" y="50" className="text-xl font-bold">
                    Project Management
                  </text>

                  {/* Action Bar */}
                  <rect x="0" y="80" width="1200" height="60" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
                  <rect x="20" y="100" width="120" height="20" fill="#28a745" stroke="#1e7e34" strokeWidth="1" />
                  <text x="80" y="115" textAnchor="middle" className="text-sm fill-white">
                    Add Project
                  </text>
                  <rect x="160" y="100" width="100" height="20" fill="#17a2b8" stroke="#117a8b" strokeWidth="1" />
                  <text x="210" y="115" textAnchor="middle" className="text-sm fill-white">
                    Export
                  </text>
                  <rect x="280" y="100" width="100" height="20" fill="#6c757d" stroke="#495057" strokeWidth="1" />
                  <text x="330" y="115" textAnchor="middle" className="text-sm fill-white">
                    Filter
                  </text>

                  {/* Search Bar */}
                  <rect x="900" y="100" width="280" height="20" fill="#fff" stroke="#ced4da" strokeWidth="1" />
                  <text x="910" y="115" className="text-sm text-gray-600">
                    Search projects...
                  </text>

                  {/* Table Header */}
                  <rect x="20" y="160" width="1160" height="40" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
                  <text x="40" y="185" className="text-sm font-bold">
                    Project Name
                  </text>
                  <text x="250" y="185" className="text-sm font-bold">
                    Location
                  </text>
                  <text x="400" y="185" className="text-sm font-bold">
                    Type
                  </text>
                  <text x="550" y="185" className="text-sm font-bold">
                    Status
                  </text>
                  <text x="700" y="185" className="text-sm font-bold">
                    Units
                  </text>
                  <text x="850" y="185" className="text-sm font-bold">
                    Revenue
                  </text>
                  <text x="1000" y="185" className="text-sm font-bold">
                    Actions
                  </text>

                  {/* Table Rows */}
                  <g>
                    <rect x="20" y="200" width="1160" height="50" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="40" y="230" className="text-sm">
                      Al Fozan Tower
                    </text>
                    <text x="250" y="230" className="text-sm">
                      Riyadh
                    </text>
                    <text x="400" y="230" className="text-sm">
                      Commercial
                    </text>
                    <rect x="540" y="215" width="60" height="20" fill="#28a745" stroke="#1e7e34" strokeWidth="1" />
                    <text x="570" y="230" textAnchor="middle" className="text-xs fill-white">
                      Active
                    </text>
                    <text x="700" y="230" className="text-sm">
                      120
                    </text>
                    <text x="850" y="230" className="text-sm">
                      450.5M
                    </text>
                    <rect x="1000" y="215" width="40" height="20" fill="#007bff" stroke="#0056b3" strokeWidth="1" />
                    <text x="1020" y="230" textAnchor="middle" className="text-xs fill-white">
                      Edit
                    </text>
                    <rect x="1050" y="215" width="40" height="20" fill="#dc3545" stroke="#bd2130" strokeWidth="1" />
                    <text x="1070" y="230" textAnchor="middle" className="text-xs fill-white">
                      Del
                    </text>

                    <rect x="20" y="250" width="1160" height="50" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                    <text x="40" y="280" className="text-sm">
                      Residential Complex A
                    </text>
                    <text x="250" y="280" className="text-sm">
                      Jeddah
                    </text>
                    <text x="400" y="280" className="text-sm">
                      Residential
                    </text>
                    <rect x="540" y="265" width="60" height="20" fill="#ffc107" stroke="#d39e00" strokeWidth="1" />
                    <text x="570" y="280" textAnchor="middle" className="text-xs">
                      Planning
                    </text>
                    <text x="700" y="280" className="text-sm">
                      200
                    </text>
                    <text x="850" y="280" className="text-sm">
                      320.8M
                    </text>
                    <rect x="1000" y="265" width="40" height="20" fill="#007bff" stroke="#0056b3" strokeWidth="1" />
                    <text x="1020" y="280" textAnchor="middle" className="text-xs fill-white">
                      Edit
                    </text>
                    <rect x="1050" y="265" width="40" height="20" fill="#dc3545" stroke="#bd2130" strokeWidth="1" />
                    <text x="1070" y="280" textAnchor="middle" className="text-xs fill-white">
                      Del
                    </text>

                    <rect x="20" y="300" width="1160" height="50" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="40" y="330" className="text-sm">
                      Mixed Use Development
                    </text>
                    <text x="250" y="330" className="text-sm">
                      Dammam
                    </text>
                    <text x="400" y="330" className="text-sm">
                      Mixed
                    </text>
                    <rect x="540" y="315" width="60" height="20" fill="#28a745" stroke="#1e7e34" strokeWidth="1" />
                    <text x="570" y="330" textAnchor="middle" className="text-xs fill-white">
                      Active
                    </text>
                    <text x="700" y="330" className="text-sm">
                      150
                    </text>
                    <text x="850" y="330" className="text-sm">
                      680.2M
                    </text>
                    <rect x="1000" y="315" width="40" height="20" fill="#007bff" stroke="#0056b3" strokeWidth="1" />
                    <text x="1020" y="330" textAnchor="middle" className="text-xs fill-white">
                      Edit
                    </text>
                    <rect x="1050" y="315" width="40" height="20" fill="#dc3545" stroke="#bd2130" strokeWidth="1" />
                    <text x="1070" y="330" textAnchor="middle" className="text-xs fill-white">
                      Del
                    </text>
                  </g>

                  {/* Project Details Panel */}
                  <rect x="20" y="400" width="1160" height="380" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                  <text x="30" y="425" className="text-lg font-bold">
                    Project Details
                  </text>

                  {/* Form Fields */}
                  <g>
                    <text x="40" y="460" className="text-sm font-bold">
                      Project Name:
                    </text>
                    <rect x="40" y="470" width="300" height="30" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />

                    <text x="360" y="460" className="text-sm font-bold">
                      Location:
                    </text>
                    <rect x="360" y="470" width="200" height="30" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />

                    <text x="580" y="460" className="text-sm font-bold">
                      Type:
                    </text>
                    <rect x="580" y="470" width="150" height="30" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />

                    <text x="40" y="530" className="text-sm font-bold">
                      Status:
                    </text>
                    <rect x="40" y="540" width="150" height="30" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />

                    <text x="210" y="530" className="text-sm font-bold">
                      Units:
                    </text>
                    <rect x="210" y="540" width="100" height="30" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />

                    <text x="330" y="530" className="text-sm font-bold">
                      Revenue:
                    </text>
                    <rect x="330" y="540" width="150" height="30" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />

                    <text x="40" y="600" className="text-sm font-bold">
                      Description:
                    </text>
                    <rect x="40" y="610" width="600" height="80" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />
                  </g>

                  {/* Action Buttons */}
                  <rect x="40" y="720" width="100" height="40" fill="#28a745" stroke="#1e7e34" strokeWidth="1" />
                  <text x="90" y="745" textAnchor="middle" className="text-sm fill-white">
                    Save
                  </text>
                  <rect x="160" y="720" width="100" height="40" fill="#6c757d" stroke="#495057" strokeWidth="1" />
                  <text x="210" y="745" textAnchor="middle" className="text-sm fill-white">
                    Cancel
                  </text>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard Wireframe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <svg viewBox="0 0 1200 800" className="w-full h-auto border border-gray-300">
                  {/* Header */}
                  <rect x="0" y="0" width="1200" height="80" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                  <text x="20" y="50" className="text-xl font-bold">
                    Analytics Dashboard
                  </text>

                  {/* Filter Controls */}
                  <rect x="0" y="80" width="1200" height="60" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
                  <text x="20" y="105" className="text-sm font-bold">
                    Date Range:
                  </text>
                  <rect x="20" y="110" width="150" height="20" fill="#fff" stroke="#ced4da" strokeWidth="1" />
                  <text x="200" y="105" className="text-sm font-bold">
                    Region:
                  </text>
                  <rect x="200" y="110" width="120" height="20" fill="#fff" stroke="#ced4da" strokeWidth="1" />
                  <text x="350" y="105" className="text-sm font-bold">
                    Project Type:
                  </text>
                  <rect x="350" y="110" width="120" height="20" fill="#fff" stroke="#ced4da" strokeWidth="1" />

                  {/* KPI Summary */}
                  <g>
                    <rect x="20" y="160" width="280" height="100" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="30" y="185" className="text-sm font-bold">
                      Revenue Trends
                    </text>
                    <rect
                      x="40"
                      y="200"
                      width="240"
                      height="40"
                      fill="#f8f9fa"
                      stroke="#dee2e6"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <text x="160" y="225" textAnchor="middle" className="text-sm text-gray-600">
                      Line Chart
                    </text>

                    <rect x="320" y="160" width="280" height="100" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="330" y="185" className="text-sm font-bold">
                      Regional Performance
                    </text>
                    <rect
                      x="340"
                      y="200"
                      width="240"
                      height="40"
                      fill="#f8f9fa"
                      stroke="#dee2e6"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <text x="460" y="225" textAnchor="middle" className="text-sm text-gray-600">
                      Bar Chart
                    </text>

                    <rect x="620" y="160" width="280" height="100" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="630" y="185" className="text-sm font-bold">
                      Project Types
                    </text>
                    <rect
                      x="640"
                      y="200"
                      width="240"
                      height="40"
                      fill="#f8f9fa"
                      stroke="#dee2e6"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <text x="760" y="225" textAnchor="middle" className="text-sm text-gray-600">
                      Pie Chart
                    </text>

                    <rect x="920" y="160" width="260" height="100" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="930" y="185" className="text-sm font-bold">
                      Growth Rate
                    </text>
                    <rect
                      x="940"
                      y="200"
                      width="220"
                      height="40"
                      fill="#f8f9fa"
                      stroke="#dee2e6"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <text x="1050" y="225" textAnchor="middle" className="text-sm text-gray-600">
                      Gauge
                    </text>
                  </g>

                  {/* Main Analytics Charts */}
                  <g>
                    {/* Large Chart Area */}
                    <rect x="20" y="280" width="760" height="300" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="30" y="305" className="text-lg font-bold">
                      Monthly Revenue Analysis
                    </text>
                    <rect
                      x="40"
                      y="320"
                      width="720"
                      height="240"
                      fill="#f8f9fa"
                      stroke="#dee2e6"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text x="400" y="450" textAnchor="middle" className="text-sm text-gray-600">
                      Interactive Revenue Chart
                    </text>

                    {/* Side Panel */}
                    <rect x="800" y="280" width="380" height="300" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="810" y="305" className="text-lg font-bold">
                      Key Insights
                    </text>

                    <rect x="820" y="320" width="340" height="60" fill="#e3f2fd" stroke="#1976d2" strokeWidth="1" />
                    <text x="830" y="340" className="text-sm font-bold">
                      Top Performing Region
                    </text>
                    <text x="830" y="360" className="text-sm">
                      Riyadh - 45% growth
                    </text>

                    <rect x="820" y="390" width="340" height="60" fill="#e8f5e8" stroke="#388e3c" strokeWidth="1" />
                    <text x="830" y="410" className="text-sm font-bold">
                      Best Project Type
                    </text>
                    <text x="830" y="430" className="text-sm">
                      Commercial - 78% ROI
                    </text>

                    <rect x="820" y="460" width="340" height="60" fill="#fff3e0" stroke="#f57c00" strokeWidth="1" />
                    <text x="830" y="480" className="text-sm font-bold">
                      Market Opportunity
                    </text>
                    <text x="830" y="500" className="text-sm">
                      Mixed-use developments
                    </text>
                  </g>

                  {/* Bottom Statistics */}
                  <rect x="20" y="600" width="1160" height="180" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                  <text x="30" y="625" className="text-lg font-bold">
                    Detailed Statistics
                  </text>

                  {/* Statistics Grid */}
                  <g>
                    <rect x="40" y="640" width="180" height="60" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                    <text x="50" y="660" className="text-sm font-bold">
                      Total Investment
                    </text>
                    <text x="50" y="680" className="text-lg">
                      2.5B SAR
                    </text>

                    <rect x="240" y="640" width="180" height="60" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                    <text x="250" y="660" className="text-sm font-bold">
                      Active Projects
                    </text>
                    <text x="250" y="680" className="text-lg">
                      12
                    </text>

                    <rect x="440" y="640" width="180" height="60" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                    <text x="450" y="660" className="text-sm font-bold">
                      Completion Rate
                    </text>
                    <text x="450" y="680" className="text-lg">
                      85%
                    </text>

                    <rect x="640" y="640" width="180" height="60" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                    <text x="650" y="660" className="text-sm font-bold">
                      Market Share
                    </text>
                    <text x="650" y="680" className="text-lg">
                      23%
                    </text>

                    <rect x="840" y="640" width="180" height="60" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                    <text x="850" y="660" className="text-sm font-bold">
                      Customer Satisfaction
                    </text>
                    <text x="850" y="680" className="text-lg">
                      4.8/5
                    </text>

                    <rect x="1040" y="640" width="120" height="60" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                    <text x="1050" y="660" className="text-sm font-bold">
                      Growth
                    </text>
                    <text x="1050" y="680" className="text-lg">
                      +15%
                    </text>
                  </g>

                  {/* Export Options */}
                  <rect x="40" y="720" width="100" height="40" fill="#17a2b8" stroke="#117a8b" strokeWidth="1" />
                  <text x="90" y="745" textAnchor="middle" className="text-sm fill-white">
                    Export PDF
                  </text>
                  <rect x="160" y="720" width="100" height="40" fill="#28a745" stroke="#1e7e34" strokeWidth="1" />
                  <text x="210" y="745" textAnchor="middle" className="text-sm fill-white">
                    Export Excel
                  </text>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Responsive Wireframe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg flex justify-center">
                <svg viewBox="0 0 375 812" className="w-full max-w-sm h-auto border border-gray-300">
                  {/* Mobile Header */}
                  <rect x="0" y="0" width="375" height="60" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                  <text x="20" y="35" className="text-sm font-bold">
                    Al Fozan Insights
                  </text>
                  <rect x="300" y="15" width="60" height="30" fill="#007bff" stroke="#0056b3" strokeWidth="1" />
                  <text x="330" y="35" textAnchor="middle" className="text-xs fill-white">
                    Menu
                  </text>

                  {/* Mobile Navigation */}
                  <rect x="0" y="60" width="375" height="50" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
                  <rect x="10" y="75" width="70" height="20" fill="#007bff" stroke="#0056b3" strokeWidth="1" />
                  <text x="45" y="90" textAnchor="middle" className="text-xs fill-white">
                    Overview
                  </text>
                  <rect x="90" y="75" width="70" height="20" fill="#6c757d" stroke="#495057" strokeWidth="1" />
                  <text x="125" y="90" textAnchor="middle" className="text-xs fill-white">
                    Projects
                  </text>
                  <rect x="170" y="75" width="70" height="20" fill="#6c757d" stroke="#495057" strokeWidth="1" />
                  <text x="205" y="90" textAnchor="middle" className="text-xs fill-white">
                    Analytics
                  </text>

                  {/* Mobile KPI Cards - Stacked */}
                  <g>
                    <rect x="10" y="130" width="355" height="80" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="20" y="150" className="text-sm font-bold">
                      Total Projects
                    </text>
                    <text x="20" y="180" className="text-2xl font-bold">
                      12
                    </text>
                    <text x="20" y="200" className="text-xs text-gray-600">
                      Active developments
                    </text>

                    <rect x="10" y="220" width="355" height="80" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="20" y="240" className="text-sm font-bold">
                      Total Revenue
                    </text>
                    <text x="20" y="270" className="text-2xl font-bold">
                      1.2B SAR
                    </text>
                    <text x="20" y="290" className="text-xs text-gray-600">
                      Current portfolio
                    </text>

                    <rect x="10" y="310" width="355" height="80" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                    <text x="20" y="330" className="text-sm font-bold">
                      Units Sold
                    </text>
                    <text x="20" y="360" className="text-2xl font-bold">
                      850
                    </text>
                    <text x="20" y="380" className="text-xs text-gray-600">
                      This quarter
                    </text>
                  </g>

                  {/* Mobile Chart */}
                  <rect x="10" y="410" width="355" height="200" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                  <text x="20" y="435" className="text-sm font-bold">
                    Revenue Trends
                  </text>
                  <rect
                    x="20"
                    y="450"
                    width="335"
                    height="140"
                    fill="#f8f9fa"
                    stroke="#dee2e6"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <text x="187" y="530" textAnchor="middle" className="text-xs text-gray-600">
                    Mobile Chart View
                  </text>

                  {/* Mobile Project List */}
                  <rect x="10" y="630" width="355" height="160" fill="#fff" stroke="#dee2e6" strokeWidth="1" />
                  <text x="20" y="655" className="text-sm font-bold">
                    Recent Projects
                  </text>

                  <rect x="20" y="670" width="335" height="40" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
                  <text x="30" y="690" className="text-sm">
                    Al Fozan Tower
                  </text>
                  <text x="30" y="705" className="text-xs text-gray-600">
                    Riyadh • Active
                  </text>

                  <rect x="20" y="720" width="335" height="40" fill="#e9ecef" stroke="#dee2e6" strokeWidth="1" />
                  <text x="30" y="740" className="text-sm">
                    Residential Complex A
                  </text>
                  <text x="30" y="755" className="text-xs text-gray-600">
                    Jeddah • Planning
                  </text>

                  {/* Mobile Bottom Navigation */}
                  <rect x="0" y="800" width="375" height="12" fill="#343a40" stroke="#495057" strokeWidth="1" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
