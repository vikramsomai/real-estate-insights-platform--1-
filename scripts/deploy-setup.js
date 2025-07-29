const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Deployment configuration
const deployConfig = {
  platform: "vercel",
  environment: "production",
  domain: "alfozan-insights.vercel.app",
  buildCommand: "npm run build",
  outputDirectory: ".next",
  nodeVersion: "18.x",
}

// Environment variables for production
const envVars = {
  NEXT_PUBLIC_APP_NAME: "Al Fozan Insights Platform",
  NEXT_PUBLIC_API_URL: "https://alfozan-insights.vercel.app/api",
  DATABASE_URL: "postgresql://user:password@localhost:5432/alfozan_insights",
  NEXTAUTH_SECRET: "your-secret-key-here",
  NEXTAUTH_URL: "https://alfozan-insights.vercel.app",
}

console.log("Starting Al Fozan Insights Platform Deployment Setup...\n")

// Step 1: Validate project structure
function validateProjectStructure() {
  console.log("Validating project structure...")

  const requiredFiles = ["package.json", "next.config.mjs", "tailwind.config.ts", "app/layout.tsx", "app/page.tsx"]

  const requiredDirs = ["app", "components", "lib", "public"]

  // Check files
  requiredFiles.forEach((file) => {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`)
    }
  })

  // Check directories
  requiredDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      throw new Error(`Required directory missing: ${dir}`)
    }
  })

  console.log("Project structure validated\n")
}

// Step 2: Install dependencies and run build
function buildProject() {
  console.log("Installing dependencies and building project...")

  try {
    // Install dependencies
    console.log("Installing npm packages...")
    execSync("npm install", { stdio: "inherit" })

    // Build project
    console.log("Building project...")
    execSync("npm run build", { stdio: "inherit" })

    console.log("Project built successfully\n")
  } catch (error) {
    throw new Error(`Build failed: ${error.message}`)
  }
}

// Step 3: Generate deployment configuration
function generateDeploymentConfig() {
  console.log("Generating deployment configuration...")

  // Create vercel.json
  const vercelConfig = {
    version: 2,
    name: "alfozan-insights-platform",
    builds: [
      {
        src: "package.json",
        use: "@vercel/next",
      },
    ],
    routes: [
      {
        src: "/api/(.*)",
        dest: "/api/$1",
      },
      {
        src: "/(.*)",
        dest: "/$1",
      },
    ],
    env: envVars,
    regions: ["iad1"],
  }

  fs.writeFileSync("vercel.json", JSON.stringify(vercelConfig, null, 2))

  // Create .env.production
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n")

  fs.writeFileSync(".env.production", envContent)

  console.log("Deployment configuration generated\n")
}

// Step 4: Setup CI/CD pipeline
function setupCICD() {
  console.log("Setting up CI/CD pipeline...")

  const githubWorkflow = `name: Deploy Al Fozan Insights Platform

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: \${{ secrets.ORG_ID }}
        vercel-project-id: \${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
`

  // Create .github/workflows directory
  const workflowDir = ".github/workflows"
  if (!fs.existsSync(workflowDir)) {
    fs.mkdirSync(workflowDir, { recursive: true })
  }

  fs.writeFileSync(path.join(workflowDir, "deploy.yml"), githubWorkflow)

  console.log("CI/CD pipeline configured\n")
}

// Step 5: Generate deployment report
function generateDeploymentReport() {
  console.log("Generating deployment report...")

  const report = `
# Al Fozan Insights Platform - Deployment Report

## Deployment Summary
- **Platform**: ${deployConfig.platform}
- **Environment**: ${deployConfig.environment}
- **Domain**: ${deployConfig.domain}
- **Node Version**: ${deployConfig.nodeVersion}
- **Build Command**: ${deployConfig.buildCommand}

## Project Statistics
- **Total Components**: ${countFiles("components", ".tsx")}
- **API Routes**: ${countFiles("app/api", ".ts")}
- **Pages**: ${countFiles("app", "page.tsx")}
- **Database Scripts**: ${countFiles("scripts", ".py")}

## Features Implemented
- Real Estate Project Dashboard
- Competitor Analysis System
- Performance Analytics
- Market Trends Visualization
- Responsive Design
- API Integration
- Database Seeding Scripts
- CI/CD Pipeline
- Security Headers
- Performance Optimization

## Security Measures
- HTTPS Enforcement
- XSS Protection
- Content Security Policy
- Frame Options
- HSTS Headers

## Performance Optimizations
- Image Optimization
- Code Splitting
- Compression Enabled
- Caching Strategy
- Bundle Analysis

## Important URLs
- **Production**: https://${deployConfig.domain}
- **API Docs**: https://${deployConfig.domain}/api
- **Analytics**: https://${deployConfig.domain}/analytics
- **Projects**: https://${deployConfig.domain}/projects

## Next Steps
1. Configure domain DNS settings
2. Set up monitoring and alerts
3. Configure backup strategies
4. Implement user authentication
5. Add comprehensive testing

---
Generated on: ${new Date().toISOString()}
Platform: Al Fozan Insights Platform v1.0
`

  fs.writeFileSync("DEPLOYMENT_REPORT.md", report)

  console.log("Deployment report generated\n")
}

// Helper function to count files
function countFiles(dir, extension) {
  if (!fs.existsSync(dir)) return 0

  const files = fs.readdirSync(dir, { recursive: true })
  return files.filter((file) => file.toString().endsWith(extension)).length
}

// Main deployment process
async function main() {
  try {
    validateProjectStructure()
    buildProject()
    generateDeploymentConfig()
    setupCICD()
    generateDeploymentReport()

    console.log("DEPLOYMENT SETUP COMPLETED SUCCESSFULLY!\n")
    console.log("Summary:")
    console.log("- Project structure validated")
    console.log("- Dependencies installed and built")
    console.log("- Deployment configuration generated")
    console.log("- CI/CD pipeline configured")
    console.log("- Deployment report generated\n")

    console.log("Ready for deployment to Vercel!")
    console.log("Run: vercel --prod")
  } catch (error) {
    console.error("Deployment setup failed:", error.message)
    process.exit(1)
  }
}

// Execute deployment setup
main()
