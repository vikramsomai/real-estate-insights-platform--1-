"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UMLDiagrams() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">System Architecture & UML Diagrams</h2>
        <p className="text-gray-600">Comprehensive system design and architecture documentation</p>
      </div>

      <Tabs defaultValue="use-case" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="use-case">Use Case</TabsTrigger>
          <TabsTrigger value="class">Class Diagram</TabsTrigger>
          <TabsTrigger value="sequence">Sequence</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
        </TabsList>

        <TabsContent value="use-case" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Use Case Diagram - Al Fozan Insights Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <svg viewBox="0 0 800 600" className="w-full h-auto">
                  {/* Actors */}
                  <g>
                    <ellipse cx="80" cy="150" rx="30" ry="50" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" />
                    <text x="80" y="155" textAnchor="middle" className="text-sm font-medium">
                      Admin
                    </text>

                    <ellipse cx="80" cy="300" rx="30" ry="50" fill="#e8f5e8" stroke="#388e3c" strokeWidth="2" />
                    <text x="80" y="305" textAnchor="middle" className="text-sm font-medium">
                      Manager
                    </text>

                    <ellipse cx="80" cy="450" rx="30" ry="50" fill="#fff3e0" stroke="#f57c00" strokeWidth="2" />
                    <text x="80" y="455" textAnchor="middle" className="text-sm font-medium">
                      Analyst
                    </text>
                  </g>

                  {/* System Boundary */}
                  <rect
                    x="200"
                    y="50"
                    width="500"
                    height="500"
                    fill="none"
                    stroke="#666"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text x="450" y="40" textAnchor="middle" className="text-lg font-bold">
                    Al Fozan Insights Platform
                  </text>

                  {/* Use Cases */}
                  <g>
                    <ellipse cx="350" cy="120" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="350" y="125" textAnchor="middle" className="text-xs">
                      Manage Users
                    </text>

                    <ellipse cx="550" cy="120" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="550" y="125" textAnchor="middle" className="text-xs">
                      System Config
                    </text>

                    <ellipse cx="350" cy="200" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="350" y="205" textAnchor="middle" className="text-xs">
                      Manage Projects
                    </text>

                    <ellipse cx="550" cy="200" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="550" y="205" textAnchor="middle" className="text-xs">
                      View Analytics
                    </text>

                    <ellipse cx="350" cy="280" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="350" y="285" textAnchor="middle" className="text-xs">
                      Generate Reports
                    </text>

                    <ellipse cx="550" cy="280" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="550" y="285" textAnchor="middle" className="text-xs">
                      Track Competitors
                    </text>

                    <ellipse cx="350" cy="360" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="350" y="365" textAnchor="middle" className="text-xs">
                      Export Data
                    </text>

                    <ellipse cx="550" cy="360" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="550" y="365" textAnchor="middle" className="text-xs">
                      View Dashboard
                    </text>

                    <ellipse cx="450" cy="440" rx="80" ry="30" fill="#fff" stroke="#333" strokeWidth="1" />
                    <text x="450" y="445" textAnchor="middle" className="text-xs">
                      Login/Logout
                    </text>
                  </g>

                  {/* Connections */}
                  <g stroke="#666" strokeWidth="1">
                    {/* Admin connections */}
                    <line x1="110" y1="150" x2="270" y2="120" />
                    <line x1="110" y1="150" x2="470" y2="120" />
                    <line x1="110" y1="150" x2="270" y2="200" />
                    <line x1="110" y1="150" x2="370" y2="440" />

                    {/* Manager connections */}
                    <line x1="110" y1="300" x2="270" y2="200" />
                    <line x1="110" y1="300" x2="470" y2="200" />
                    <line x1="110" y1="300" x2="270" y2="280" />
                    <line x1="110" y1="300" x2="470" y2="280" />
                    <line x1="110" y1="300" x2="270" y2="360" />
                    <line x1="110" y1="300" x2="370" y2="440" />

                    {/* Analyst connections */}
                    <line x1="110" y1="450" x2="470" y2="200" />
                    <line x1="110" y1="450" x2="470" y2="280" />
                    <line x1="110" y1="450" x2="470" y2="360" />
                    <line x1="110" y1="450" x2="370" y2="440" />
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="class" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Diagram - Core System Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <svg viewBox="0 0 900 700" className="w-full h-auto">
                  {/* User Class */}
                  <g>
                    <rect x="50" y="50" width="180" height="120" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" />
                    <text x="140" y="70" textAnchor="middle" className="text-sm font-bold">
                      User
                    </text>
                    <line x1="50" y1="80" x2="230" y2="80" stroke="#1976d2" strokeWidth="1" />
                    <text x="60" y="100" className="text-xs">
                      - id: string
                    </text>
                    <text x="60" y="115" className="text-xs">
                      - username: string
                    </text>
                    <text x="60" y="130" className="text-xs">
                      - role: string
                    </text>
                    <text x="60" y="145" className="text-xs">
                      - name: string
                    </text>
                    <line x1="50" y1="155" x2="230" y2="155" stroke="#1976d2" strokeWidth="1" />
                    <text x="60" y="170" className="text-xs">
                      + login()
                    </text>
                  </g>

                  {/* Project Class */}
                  <g>
                    <rect x="300" y="50" width="180" height="180" fill="#e8f5e8" stroke="#388e3c" strokeWidth="2" />
                    <text x="390" y="70" textAnchor="middle" className="text-sm font-bold">
                      Project
                    </text>
                    <line x1="300" y1="80" x2="480" y2="80" stroke="#388e3c" strokeWidth="1" />
                    <text x="310" y="100" className="text-xs">
                      - id: number
                    </text>
                    <text x="310" y="115" className="text-xs">
                      - name: string
                    </text>
                    <text x="310" y="130" className="text-xs">
                      - location: string
                    </text>
                    <text x="310" y="145" className="text-xs">
                      - type: string
                    </text>
                    <text x="310" y="160" className="text-xs">
                      - status: string
                    </text>
                    <text x="310" y="175" className="text-xs">
                      - units: number
                    </text>
                    <text x="310" y="190" className="text-xs">
                      - revenue: number
                    </text>
                    <line x1="300" y1="200" x2="480" y2="200" stroke="#388e3c" strokeWidth="1" />
                    <text x="310" y="215" className="text-xs">
                      + create()
                    </text>
                    <text x="310" y="230" className="text-xs">
                      + update()
                    </text>
                  </g>

                  {/* Competitor Class */}
                  <g>
                    <rect x="550" y="50" width="180" height="150" fill="#fff3e0" stroke="#f57c00" strokeWidth="2" />
                    <text x="640" y="70" textAnchor="middle" className="text-sm font-bold">
                      Competitor
                    </text>
                    <line x1="550" y1="80" x2="730" y2="80" stroke="#f57c00" strokeWidth="1" />
                    <text x="560" y="100" className="text-xs">
                      - id: number
                    </text>
                    <text x="560" y="115" className="text-xs">
                      - name: string
                    </text>
                    <text x="560" y="130" className="text-xs">
                      - market_share: number
                    </text>
                    <text x="560" y="145" className="text-xs">
                      - digital_score: number
                    </text>
                    <text x="560" y="160" className="text-xs">
                      - location: string
                    </text>
                    <line x1="550" y1="170" x2="730" y2="170" stroke="#f57c00" strokeWidth="1" />
                    <text x="560" y="185" className="text-xs">
                      + analyze()
                    </text>
                  </g>

                  {/* Analytics Class */}
                  <g>
                    <rect x="50" y="300" width="180" height="150" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2" />
                    <text x="140" y="320" textAnchor="middle" className="text-sm font-bold">
                      Analytics
                    </text>
                    <line x1="50" y1="330" x2="230" y2="330" stroke="#7b1fa2" strokeWidth="1" />
                    <text x="60" y="350" className="text-xs">
                      - kpis: object
                    </text>
                    <text x="60" y="365" className="text-xs">
                      - trends: array
                    </text>
                    <text x="60" y="380" className="text-xs">
                      - regional_data: array
                    </text>
                    <text x="60" y="395" className="text-xs">
                      - project_types: array
                    </text>
                    <line x1="50" y1="405" x2="230" y2="405" stroke="#7b1fa2" strokeWidth="1" />
                    <text x="60" y="420" className="text-xs">
                      + generateKPIs()
                    </text>
                    <text x="60" y="435" className="text-xs">
                      + getTrends()
                    </text>
                  </g>

                  {/* Dashboard Class */}
                  <g>
                    <rect x="300" y="300" width="180" height="120" fill="#e1f5fe" stroke="#0277bd" strokeWidth="2" />
                    <text x="390" y="320" textAnchor="middle" className="text-sm font-bold">
                      Dashboard
                    </text>
                    <line x1="300" y1="330" x2="480" y2="330" stroke="#0277bd" strokeWidth="1" />
                    <text x="310" y="350" className="text-xs">
                      - components: array
                    </text>
                    <text x="310" y="365" className="text-xs">
                      - layout: string
                    </text>
                    <text x="310" y="380" className="text-xs">
                      - user_role: string
                    </text>
                    <line x1="300" y1="390" x2="480" y2="390" stroke="#0277bd" strokeWidth="1" />
                    <text x="310" y="405" className="text-xs">
                      + render()
                    </text>
                  </g>

                  {/* Report Class */}
                  <g>
                    <rect x="550" y="300" width="180" height="120" fill="#fce4ec" stroke="#c2185b" strokeWidth="2" />
                    <text x="640" y="320" textAnchor="middle" className="text-sm font-bold">
                      Report
                    </text>
                    <line x1="550" y1="330" x2="730" y2="330" stroke="#c2185b" strokeWidth="1" />
                    <text x="560" y="350" className="text-xs">
                      - type: string
                    </text>
                    <text x="560" y="365" className="text-xs">
                      - data: object
                    </text>
                    <text x="560" y="380" className="text-xs">
                      - format: string
                    </text>
                    <line x1="550" y1="390" x2="730" y2="390" stroke="#c2185b" strokeWidth="1" />
                    <text x="560" y="405" className="text-xs">
                      + generate()
                    </text>
                  </g>

                  {/* Relationships */}
                  <g stroke="#666" strokeWidth="1" fill="none">
                    <line x1="230" y1="110" x2="300" y2="140" markerEnd="url(#arrowhead)" />
                    <line x1="140" y1="170" x2="140" y2="300" markerEnd="url(#arrowhead)" />
                    <line x1="390" y1="230" x2="390" y2="300" markerEnd="url(#arrowhead)" />
                    <line x1="230" y1="375" x2="300" y2="360" markerEnd="url(#arrowhead)" />
                    <line x1="480" y1="360" x2="550" y2="360" markerEnd="url(#arrowhead)" />
                  </g>

                  {/* Arrow marker */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sequence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sequence Diagram - User Authentication Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <svg viewBox="0 0 800 500" className="w-full h-auto">
                  {/* Actors */}
                  <g>
                    <rect x="50" y="30" width="80" height="40" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" />
                    <text x="90" y="55" textAnchor="middle" className="text-sm font-bold">
                      User
                    </text>

                    <rect x="200" y="30" width="80" height="40" fill="#e8f5e8" stroke="#388e3c" strokeWidth="2" />
                    <text x="240" y="55" textAnchor="middle" className="text-sm font-bold">
                      Frontend
                    </text>

                    <rect x="350" y="30" width="80" height="40" fill="#fff3e0" stroke="#f57c00" strokeWidth="2" />
                    <text x="390" y="55" textAnchor="middle" className="text-sm font-bold">
                      Backend
                    </text>

                    <rect x="500" y="30" width="80" height="40" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2" />
                    <text x="540" y="55" textAnchor="middle" className="text-sm font-bold">
                      Database
                    </text>
                  </g>

                  {/* Lifelines */}
                  <g stroke="#666" strokeWidth="1" strokeDasharray="3,3">
                    <line x1="90" y1="70" x2="90" y2="450" />
                    <line x1="240" y1="70" x2="240" y2="450" />
                    <line x1="390" y1="70" x2="390" y2="450" />
                    <line x1="540" y1="70" x2="540" y2="450" />
                  </g>

                  {/* Messages */}
                  <g>
                    {/* 1. Login Request */}
                    <line x1="90" y1="100" x2="240" y2="100" stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="165" y="95" textAnchor="middle" className="text-xs">
                      1. Login Request
                    </text>

                    {/* 2. Validate Credentials */}
                    <line
                      x1="240"
                      y1="130"
                      x2="390"
                      y2="130"
                      stroke="#388e3c"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                    <text x="315" y="125" textAnchor="middle" className="text-xs">
                      2. Validate Credentials
                    </text>

                    {/* 3. Check User */}
                    <line
                      x1="390"
                      y1="160"
                      x2="540"
                      y2="160"
                      stroke="#f57c00"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                    <text x="465" y="155" textAnchor="middle" className="text-xs">
                      3. Check User
                    </text>

                    {/* 4. User Data */}
                    <line
                      x1="540"
                      y1="190"
                      x2="390"
                      y2="190"
                      stroke="#7b1fa2"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                    <text x="465" y="185" textAnchor="middle" className="text-xs">
                      4. User Data
                    </text>

                    {/* 5. Generate Token */}
                    <rect x="370" y="210" width="40" height="20" fill="#fff" stroke="#666" strokeWidth="1" />
                    <text x="390" y="225" textAnchor="middle" className="text-xs">
                      Generate JWT
                    </text>

                    {/* 6. Auth Response */}
                    <line
                      x1="390"
                      y1="250"
                      x2="240"
                      y2="250"
                      stroke="#388e3c"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                    <text x="315" y="245" textAnchor="middle" className="text-xs">
                      6. Auth Response
                    </text>

                    {/* 7. Login Success */}
                    <line x1="240" y1="280" x2="90" y2="280" stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="165" y="275" textAnchor="middle" className="text-xs">
                      7. Login Success
                    </text>

                    {/* 8. Redirect to Dashboard */}
                    <rect x="70" y="300" width="40" height="20" fill="#fff" stroke="#666" strokeWidth="1" />
                    <text x="90" y="315" textAnchor="middle" className="text-xs">
                      Dashboard
                    </text>

                    {/* 9. Load Dashboard */}
                    <line x1="90" y1="340" x2="240" y2="340" stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="165" y="335" textAnchor="middle" className="text-xs">
                      9. Load Dashboard
                    </text>

                    {/* 10. Fetch Data */}
                    <line
                      x1="240"
                      y1="370"
                      x2="390"
                      y2="370"
                      stroke="#388e3c"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                    <text x="315" y="365" textAnchor="middle" className="text-xs">
                      10. Fetch Data
                    </text>

                    {/* 11. Dashboard Data */}
                    <line
                      x1="390"
                      y1="400"
                      x2="240"
                      y2="400"
                      stroke="#f57c00"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                    <text x="315" y="395" textAnchor="middle" className="text-xs">
                      11. Dashboard Data
                    </text>

                    {/* 12. Render Dashboard */}
                    <line x1="240" y1="430" x2="90" y2="430" stroke="#7b1fa2" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="165" y="425" textAnchor="middle" className="text-xs">
                      12. Render Dashboard
                    </text>
                  </g>

                  {/* Arrow marker */}
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="architecture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Architecture - Al Fozan Insights Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <svg viewBox="0 0 900 600" className="w-full h-auto">
                  {/* Client Layer */}
                  <g>
                    <rect x="50" y="50" width="800" height="100" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" />
                    <text x="450" y="75" textAnchor="middle" className="text-lg font-bold">
                      Client Layer
                    </text>

                    <rect x="80" y="90" width="120" height="40" fill="#fff" stroke="#1976d2" strokeWidth="1" />
                    <text x="140" y="115" textAnchor="middle" className="text-sm">
                      React/Next.js
                    </text>

                    <rect x="220" y="90" width="120" height="40" fill="#fff" stroke="#1976d2" strokeWidth="1" />
                    <text x="280" y="115" textAnchor="middle" className="text-sm">
                      Tailwind CSS
                    </text>

                    <rect x="360" y="90" width="120" height="40" fill="#fff" stroke="#1976d2" strokeWidth="1" />
                    <text x="420" y="115" textAnchor="middle" className="text-sm">
                      shadcn/ui
                    </text>

                    <rect x="500" y="90" width="120" height="40" fill="#fff" stroke="#1976d2" strokeWidth="1" />
                    <text x="560" y="115" textAnchor="middle" className="text-sm">
                      Recharts
                    </text>

                    <rect x="640" y="90" width="120" height="40" fill="#fff" stroke="#1976d2" strokeWidth="1" />
                    <text x="700" y="115" textAnchor="middle" className="text-sm">
                      TypeScript
                    </text>
                  </g>

                  {/* API Gateway */}
                  <g>
                    <rect x="50" y="200" width="800" height="80" fill="#e8f5e8" stroke="#388e3c" strokeWidth="2" />
                    <text x="450" y="225" textAnchor="middle" className="text-lg font-bold">
                      API Gateway / Communication Layer
                    </text>

                    <rect x="200" y="240" width="150" height="30" fill="#fff" stroke="#388e3c" strokeWidth="1" />
                    <text x="275" y="260" textAnchor="middle" className="text-sm">
                      RESTful APIs
                    </text>

                    <rect x="400" y="240" width="150" height="30" fill="#fff" stroke="#388e3c" strokeWidth="1" />
                    <text x="475" y="260" textAnchor="middle" className="text-sm">
                      JWT Authentication
                    </text>
                  </g>

                  {/* Business Logic Layer */}
                  <g>
                    <rect x="50" y="320" width="800" height="120" fill="#fff3e0" stroke="#f57c00" strokeWidth="2" />
                    <text x="450" y="345" textAnchor="middle" className="text-lg font-bold">
                      Business Logic Layer
                    </text>

                    <rect x="80" y="360" width="120" height="40" fill="#fff" stroke="#f57c00" strokeWidth="1" />
                    <text x="140" y="385" textAnchor="middle" className="text-sm">
                      Flask Backend
                    </text>

                    <rect x="220" y="360" width="120" height="40" fill="#fff" stroke="#f57c00" strokeWidth="1" />
                    <text x="280" y="385" textAnchor="middle" className="text-sm">
                      Project Manager
                    </text>

                    <rect x="360" y="360" width="120" height="40" fill="#fff" stroke="#f57c00" strokeWidth="1" />
                    <text x="420" y="385" textAnchor="middle" className="text-sm">
                      Analytics Engine
                    </text>

                    <rect x="500" y="360" width="120" height="40" fill="#fff" stroke="#f57c00" strokeWidth="1" />
                    <text x="560" y="385" textAnchor="middle" className="text-sm">
                      Report Generator
                    </text>

                    <rect x="640" y="360" width="120" height="40" fill="#fff" stroke="#f57c00" strokeWidth="1" />
                    <text x="700" y="385" textAnchor="middle" className="text-sm">
                      Auth Service
                    </text>
                  </g>

                  {/* Data Layer */}
                  <g>
                    <rect x="50" y="480" width="800" height="80" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2" />
                    <text x="450" y="505" textAnchor="middle" className="text-lg font-bold">
                      Data Layer
                    </text>

                    <rect x="150" y="520" width="120" height="30" fill="#fff" stroke="#7b1fa2" strokeWidth="1" />
                    <text x="210" y="540" textAnchor="middle" className="text-sm">
                      In-Memory Store
                    </text>

                    <rect x="300" y="520" width="120" height="30" fill="#fff" stroke="#7b1fa2" strokeWidth="1" />
                    <text x="360" y="540" textAnchor="middle" className="text-sm">
                      Mock Data
                    </text>

                    <rect x="450" y="520" width="120" height="30" fill="#fff" stroke="#7b1fa2" strokeWidth="1" />
                    <text x="510" y="540" textAnchor="middle" className="text-sm">
                      File System
                    </text>

                    <rect x="600" y="520" width="120" height="30" fill="#fff" stroke="#7b1fa2" strokeWidth="1" />
                    <text x="660" y="540" textAnchor="middle" className="text-sm">
                      Export Files
                    </text>
                  </g>

                  {/* Arrows */}
                  <g stroke="#666" strokeWidth="2" fill="none">
                    <line x1="450" y1="150" x2="450" y2="200" markerEnd="url(#arrowhead2)" />
                    <line x1="450" y1="280" x2="450" y2="320" markerEnd="url(#arrowhead2)" />
                    <line x1="450" y1="440" x2="450" y2="480" markerEnd="url(#arrowhead2)" />
                  </g>

                  {/* Arrow marker */}
                  <defs>
                    <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
