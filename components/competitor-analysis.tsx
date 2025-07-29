import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Eye, Globe } from "lucide-react"

const competitors = [
  {
    name: "Emaar Properties",
    marketShare: 28,
    digitalPresence: 85,
    recentActivity: "Launched new residential project in Riyadh",
    trend: "up",
    change: "+5%",
  },
  {
    name: "Dar Al Arkan",
    marketShare: 22,
    digitalPresence: 72,
    recentActivity: "Expanded into commercial real estate",
    trend: "up",
    change: "+3%",
  },
  {
    name: "Jabal Omar",
    marketShare: 18,
    digitalPresence: 68,
    recentActivity: "Completed luxury hotel project",
    trend: "down",
    change: "-2%",
  },
  {
    name: "Saudi Real Estate",
    marketShare: 15,
    digitalPresence: 61,
    recentActivity: "Partnership with international firm",
    trend: "up",
    change: "+7%",
  },
]

export function CompetitorAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Competitor Analysis
        </CardTitle>
        <CardDescription>Market positioning and digital presence tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {competitors.map((competitor, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{competitor.name}</h3>
                <div className="flex items-center gap-2">
                  {competitor.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm ${competitor.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {competitor.change}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Market Share</span>
                  <span>{competitor.marketShare}%</span>
                </div>
                <Progress value={competitor.marketShare} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Digital Presence
                  </span>
                  <span>{competitor.digitalPresence}%</span>
                </div>
                <Progress value={competitor.digitalPresence} className="h-2" />
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-slate-600">{competitor.recentActivity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Al Fozan Position</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-900">17%</div>
              <div className="text-sm text-blue-700">Market Share</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">78%</div>
              <div className="text-sm text-blue-700">Digital Score</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
