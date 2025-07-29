import { type NextRequest, NextResponse } from "next/server"

// Demo users with different roles
const demoUsers = {
  "admin@alfozan.com": {
    id: "1",
    email: "admin@alfozan.com",
    name: "Ahmed Al-Fozan",
    role: "admin",
    department: "Executive Management",
    password: "admin123",
  },
  "manager@alfozan.com": {
    id: "2",
    email: "manager@alfozan.com",
    name: "Sarah Al-Rashid",
    role: "manager",
    department: "Project Management",
    password: "manager123",
  },
  "analyst@alfozan.com": {
    id: "3",
    email: "analyst@alfozan.com",
    name: "Omar Al-Mansouri",
    role: "analyst",
    department: "Business Intelligence",
    password: "alfozan123",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Check demo users
    const user = demoUsers[email as keyof typeof demoUsers]

    if (user && user.password === password) {
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({
        success: true,
        data: {
          user: userWithoutPassword,
          session_id: `session_${Date.now()}`,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
        message: "Login successful",
      })
    }

    // If not found in demo users, try backend API
    try {
      const backendResponse = await fetch("https://real-estate-insights-platform-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (backendResponse.ok) {
        const backendData = await backendResponse.json()
        return NextResponse.json(backendData)
      }
    } catch (backendError) {
      console.log("Backend not available, using demo authentication only")
    }

    // Invalid credentials
    return NextResponse.json(
      {
        success: false,
        error: "Invalid email or password",
      },
      { status: 401 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
