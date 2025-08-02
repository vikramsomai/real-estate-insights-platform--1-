"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3, Lock, User, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { url } from "inspector"

interface LoginFormProps {
  onLoginSuccess?: (user: any) => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.data.user.name}!`,
        })

        if (onLoginSuccess) {
          onLoginSuccess(data.data.user)
        }
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className=" wsdewd min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 bg-img" >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5zs7Bp7opJjpr6FiVvNyjKy7zzGuwwmHJejyJnCZ-g&s" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">Al Fozan Insights</h1>
              <p className="text-sm text-slate-500">Real Estate Analytics Platform</p>
            </div>
          </div>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Access your dashboard and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="analyst@alfozan.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Demo Credentials</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Analyst:</strong> analyst@alfozan.com / alfozan123
              </div>
              <div>
                <strong>Manager:</strong> manager@alfozan.com / manager123
              </div>
              <div>
                <strong>Admin:</strong> admin@alfozan.com / admin123
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
