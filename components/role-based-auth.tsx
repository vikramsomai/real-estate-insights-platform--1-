"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Settings, Lock, User } from "lucide-react"

interface AuthUser {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "analyst"
  department: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  hasPermission: (permission: string) => boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const rolePermissions = {
  admin: ["create", "read", "update", "delete", "export", "manage_users", "system_settings"],
  manager: ["create", "read", "update", "delete", "export", "view_analytics"],
  analyst: ["read", "export", "view_analytics"],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("alfozan_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("alfozan_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: AuthUser) => {
    setUser(userData)
    localStorage.setItem("alfozan_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("alfozan_user")
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    return rolePermissions[user.role]?.includes(permission) || false
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function ProtectedRoute({
  children,
  requiredPermission,
}: {
  children: React.ReactNode
  requiredPermission?: string
}) {
  const { user, hasPermission, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthenticatedLoginForm />
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Lock className="h-5 w-5" />
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You don't have permission to access this resource. Contact your administrator if you believe this is an
            error.
          </p>
          <div className="mt-4">
            <Badge variant="outline">Your Role: {user.role}</Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}

function AuthenticatedLoginForm() {
  const { login } = useAuth()

  const handleLoginSuccess = (userData: any) => {
    // Map the API response to our AuthUser interface
    const authUser: AuthUser = {
      id: userData.id || userData.email,
      email: userData.email,
      name: userData.name,
      role: userData.role || "analyst",
      department: userData.department || "Real Estate",
    }
    login(authUser)
  }

  return <LoginFormComponent onLoginSuccess={handleLoginSuccess} />
}

function LoginFormComponent({ onLoginSuccess }: { onLoginSuccess: (user: any) => void }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        onLoginSuccess(data.data.user)
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch (error) {
      setError("Network error. Please try again.")
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

  const handleDemoLogin = (role: "admin" | "manager" | "analyst") => {
    const demoCredentials = {
      admin: { email: "admin@alfozan.com", password: "admin123" },
      manager: { email: "manager@alfozan.com", password: "manager123" },
      analyst: { email: "analyst@alfozan.com", password: "alfozan123" },
    }

    setFormData(demoCredentials[role])
  }

  return (
    <div className="ed min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 " style={{
      backgroundImage: "url('https://lh3.googleusercontent.com/gps-cs-s/AC9h4nofbSvqhV_PYtMbYd-L10F9kYEQGw1wnaD7RTXl8TFFnvCsfAZxkQp5HVOXIcg8Nuu1oXsqrg0JpoF-XVCnkXMT6S9nWs5-BdkKLtHYdAz0tdrcDWwbGZy7tYV9OZh_ocSkc-7dwA=s1360-w1360-h1020-rw')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4 flex-col">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5zs7Bp7opJjpr6FiVvNyjKy7zzGuwwmHJejyJnCZ-g&s" className="h-14" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">الفوزان القابضة</h1>
              <h1 className="text-xl font-bold text-slate-900">AL FOZEN HOLDING CO.</h1>
            </div>
          </div>
          <CardTitle>Sign In</CardTitle>
          <p className="text-sm text-muted-foreground">Access your dashboard and analytics</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="analyst@alfozan.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {/* {showPassword ? "🙈" : "👁️"} */}
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
            <h4 className="font-semibold text-blue-900 mb-3">Quick Demo Login</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={() => handleDemoLogin("admin")}
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin Access (Full Control)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={() => handleDemoLogin("manager")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Manager Access (Project Management)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={() => handleDemoLogin("analyst")}
              >
                <User className="h-4 w-4 mr-2" />
                Analyst Access (Read Only)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function RoleBasedComponent({
  children,
  requiredPermission,
  fallback,
}: {
  children: React.ReactNode
  requiredPermission: string
  fallback?: React.ReactNode
}) {
  const { hasPermission } = useAuth()

  if (!hasPermission(requiredPermission)) {
    return fallback || null
  }

  return <>{children}</>
}

export function UserProfile() {
  const { user, logout } = useAuth()

  if (!user) return null

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      case "analyst":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "manager":
        return <Settings className="h-4 w-4" />
      case "analyst":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <div className="text-sm font-medium">{user.name}</div>
        <div className="text-xs text-muted-foreground">{user.department}</div>
      </div>
      <Badge className={getRoleColor(user.role)}>
        {getRoleIcon(user.role)}
        <span className="ml-1 capitalize">{user.role}</span>
      </Badge>
      <Button variant="outline" size="sm" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}

export function PermissionGate({
  permission,
  children,
  fallback,
}: {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const { hasPermission } = useAuth()

  return hasPermission(permission) ? <>{children}</> : fallback || null
}
